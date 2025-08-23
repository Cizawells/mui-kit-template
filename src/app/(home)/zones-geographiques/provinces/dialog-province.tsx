'use client';

import * as React from 'react';
import { Add } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  DialogActions,
  DialogContent,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputLabel,
  OutlinedInput,
  Stack,
  useTheme,
} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import type { Province} from '@/lib/apis/province';
import {  saveProvince, updateProvince } from '@/lib/apis/province';
import ListSearchComponent from '@/components/ui-components/list-search-component';

export interface ProvinceDialogProps {
  open: boolean;
  selectedValue?: Province | null;
  onClose: () => void;
}

const validationSchema = Yup.object().shape({
  code: Yup.string().required('Code is required'),
  designation: Yup.string().required('Designation is required'),
  nationalite: Yup.string(),
  continent: Yup.string(),
});

export function ProvinceDialog({ open, selectedValue, onClose }: ProvinceDialogProps): React.JSX.Element {
  const queryClient = useQueryClient();
  const theme = useTheme();

  const handleClose = (): void => { onClose(); };

  const postMutation = useMutation({
    mutationFn: (province: Province) => saveProvince(province),
  });
  const updateMutation = useMutation({
    mutationFn: (province: Province) => updateProvince(province),
   
  });

  return (
    <Dialog
      open={open}
      fullWidth
      onClose={(event, reason) => {
        if (reason === 'backdropClick') return;
        handleClose();
      }}
    >
      <Formik
        enableReinitialize
        initialValues={
          selectedValue
            ? {
                code: selectedValue.code,
                designation: selectedValue.designation,
                dateDebut: selectedValue.dateDebut,
                dateFin: selectedValue.dateFin,
                reference: selectedValue.reference,
                id: selectedValue.id,
              }
            : {
                code: '',
                designation: '',
                dateDebut: '',
                dateFin: '',
                reference: '',
              }
        }
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          if (values.id) {
            updateMutation.mutate(values, {
              onSuccess: async () => {
                await queryClient.invalidateQueries({ queryKey: ['province'] });
                handleClose();
                resetForm();
              },
            });
          } else {
            postMutation.mutate(values, {
              onSuccess: async() => {
                await queryClient.invalidateQueries({ queryKey: ['province'] });
                handleClose();
                resetForm();
              },
            });
          }
        }}
      >
        {({ handleChange, values, errors, touched, handleSubmit, resetForm }) => (
          <>
            <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={2} sx={{ mr: 2 }}>
              <DialogTitle>Province</DialogTitle>
              <IconButton
                onClick={handleClose}
                sx={{
                  ':hover': {
                    cursor: 'pointer',
                    backgroundColor: theme.palette.error.light,
                    color: theme.palette.primary.light,
                  },
                }}
              >
                <CloseIcon />
              </IconButton>
            </Stack>
            <DialogContent>
              <Form>
                <Stack spacing={2}>
                  <FormControl variant="standard" fullWidth size="small">
                    <InputLabel htmlFor="code">Code</InputLabel>
                    <Input id="code" name="code" value={values.code} onChange={handleChange} size="small" />
                    {touched.code && errors.code ? <div style={{ color: 'red', marginTop: '4px' }}>{errors.code}</div> : null}
                  </FormControl>

                  <FormControl variant="outlined" fullWidth size="small">
                    <InputLabel htmlFor="designation">Designation</InputLabel>
                    <OutlinedInput
                      id="designation"
                      name="designation"
                      label="Designation"
                      value={values.designation}
                      onChange={handleChange}
                      size="small"
                      error={ Boolean(errors.designation)}
                      
                    />
                    <FormHelperText error={Boolean(errors.designation && touched.designation)}>
                        {touched.designation && errors.designation ? errors.designation : null}
                    </FormHelperText>
                 
                  </FormControl>
                </Stack>

                <DialogActions sx={{ mt: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={() => { resetForm(); }}
                    style={{ cursor: 'pointer', paddingInline: 30, textTransform: 'none', fontWeight: 'bold' }}
                  >
                    Reinitialiser
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => { handleSubmit(); }} // triggers Formik submit + validation
                    style={{ cursor: 'pointer', paddingInline: 30, textTransform: 'none', fontWeight: 'bold' }}
                  >
                    {values.id ? 'Modidfier' : 'Creer'}
                  </Button>
                </DialogActions>
              </Form>
            </DialogContent>
          </>
        )}
      </Formik>
    </Dialog>
  );
}

export default function PayDialog(): React.JSX.Element {
  const theme = useTheme()
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.grey[50]} 0%, ${theme.palette.grey[100]} 100%)`,
          borderRadius: 2,
          p: 2,
          mb: 2,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          paddingY={{ xs: '0.3rem', sm: '0.9rem' }}
          justifyContent="space-between"
          gap="0.4rem"
        >
        <Stack direction={{ xs: 'column', sm: 'row' }} gap="0.4rem">
          <ListSearchComponent style={{ height: '100%' }} />
          <Button
            variant="outlined"
            style={{ cursor: 'pointer', paddingInline: 30, textTransform: 'none', fontWeight: 'bold' }}
          >
            Chercher
          </Button>
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} gap="0.4rem">
          <Button
            variant="contained"
            style={{ cursor: 'pointer', paddingInline: 30, textTransform: 'none', fontWeight: 'bold' }}
            onClick={() => { setOpen(true); }}
            startIcon={<Add />}
          >
            Creer
          </Button>
        </Stack>
      </Stack>
      </Box>

      <ProvinceDialog open={open} onClose={() => { setOpen(false); }} />
    </div>
  );
}
