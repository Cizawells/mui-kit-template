'use client';

import * as React from 'react';
import { Add } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import {
  DialogActions,
  DialogContent,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  Stack,
  useTheme,
} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { Province, saveProvince, updateProvince } from '@/lib/apis/province';
import ListSearchComponent from '@/components/ui-components/list-search-component';

export interface ProvinceDialogProps {
  open: boolean;
  selectedValue?: Province | null;
  onClose: () => void;
}

const validationSchema = Yup.object().shape({
  code: Yup.string().required('Code is required'),
  libelle: Yup.string().required('Designation is required'),
  nationalite: Yup.string(),
  continent: Yup.string(),
});

export function ProvinceDialog({ open, selectedValue, onClose }: ProvinceDialogProps) {
  const queryClient = useQueryClient();
  const theme = useTheme();
  console.log('themeeeeeeeeeeeeeeeeeee', theme);

  const handleClose = () => onClose();

  const postMutation = useMutation({
    mutationFn: (province: Province) => saveProvince(province),
  });
  const updateMutation = useMutation({
    mutationFn: (province: Province) => updateProvince(province),
    onSuccess: () => {
      console.log('success deleting');
      // setSelectedPays(null);
      // setOpenDeleteDialog(false);
    },
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
              onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['province'] });
                handleClose();
                resetForm();
              },
            });
          } else {
            postMutation.mutate(values, {
              onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['province'] });
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
                    {touched.code && errors.code && <div style={{ color: 'red', marginTop: '4px' }}>{errors.code}</div>}
                  </FormControl>

                  <FormControl variant="standard" fullWidth size="small">
                    <InputLabel htmlFor="libelle">Designation</InputLabel>
                    <Input
                      id="libelle"
                      name="libelle"
                      value={values.designation}
                      onChange={handleChange}
                      size="small"
                    />
                    {touched.designation && errors.designation && (
                      <div style={{ color: 'red', marginTop: '4px' }}>{errors.designation}</div>
                    )}
                  </FormControl>
                </Stack>

                <DialogActions sx={{ mr: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={() => resetForm()}
                    style={{ cursor: 'pointer', paddingInline: 30, textTransform: 'none', fontWeight: 'bold' }}
                  >
                    Reinitialiser
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleSubmit()} // triggers Formik submit + validation
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

export default function PayDialog() {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
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
            variant="outlined"
            style={{ cursor: 'pointer', paddingInline: 30, textTransform: 'none', fontWeight: 'bold' }}
            onClick={() => setOpen(true)}
            startIcon={<Add />}
          >
            Creer
          </Button>
        </Stack>
      </Stack>

      <ProvinceDialog open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
