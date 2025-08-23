'use client';

import * as React from 'react';
import { Add } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  DialogActions,
  DialogContent,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  useTheme,
} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
  import type { Continent,Pays } from "@/lib/apis/pays"
import {  fetchContinents, savePays, updatePays } from '@/lib/apis/pays';
import ListSearchComponent from '@/components/ui-components/list-search-component';

export interface SimpleDialogProps {
  open: boolean;
  selectedValue?: Pays | null;
  onClose: () => void;
}

const validationSchema = Yup.object().shape({
  code: Yup.string().required('Code is required'),
  libelle: Yup.string().required('Designation is required'),
  nationalite: Yup.string(),
  continent: Yup.string(),
  exonereMouvementDesVehicules: Yup.boolean(),
});

export function PaysDialog({ open, selectedValue, onClose }: SimpleDialogProps): React.JSX.Element {
  const {
    data: continentsListe,
  } = useQuery<{
    enumerations: Continent[];
  }>({
    queryKey: ['continents'],
    queryFn: fetchContinents,
  });
  const queryClient = useQueryClient();
  const theme = useTheme();

  const handleClose = (): void => {
    onClose()
  };

  const postMutation = useMutation({
    mutationFn: (pays: Pays) => savePays(pays),
  });
  const updateMutation = useMutation({
    mutationFn: (pays: Pays) => updatePays(pays),
    onSuccess: () => {
      // setSelectedPays(null);
      // setOpenDeleteDialog(false);
    },
  });

  if (!continentsListe) {
    return <div>Failed to load continentes</div>;
  }

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
                libelle: selectedValue.libelle,
                nationalite: selectedValue.nationalite,
                continent: selectedValue.continent,
                id: selectedValue.id,
                exonereMouvementDesVehicules: selectedValue.exonereMouvementDesVehicules,
              }
            : {
                code: '',
                libelle: '',
                nationalite: '',
                continent: '',
                exonereMouvementDesVehicules: false,
              }
        }
        validationSchema={validationSchema}
        onSubmit={ (values, { resetForm }) => {
          if (values.id) {
            updateMutation.mutate(values, {
              onSuccess: async () => {
               await  queryClient.invalidateQueries({ queryKey: ['pays'] });
                handleClose();
                resetForm();
              },
            });
          } else {
            postMutation.mutate(values, {
              onSuccess: async () => {
                await queryClient.invalidateQueries({ queryKey: ['pays'] });
                handleClose();
                resetForm();
              },
            });
          }
        }}
      >
        {({ handleChange, setFieldValue, values, errors, touched, handleSubmit, resetForm }) => (
          <>
            <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={2} sx={{ mr: 2 }}>
              <DialogTitle>Pays</DialogTitle>
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
                    <InputLabel style={{ fontWeight: 'bold' }} htmlFor="code">
                      Code
                    </InputLabel>
                    <Input id="code" name="code" value={values.code} onChange={handleChange} size="small" />
                    {touched.code && errors.code ? <div style={{ color: 'red', marginTop: '4px' }}>{errors.code ?? ''}</div> : null}
                  </FormControl>

                  <FormControl variant="standard" fullWidth size="small">
                    <InputLabel style={{ fontWeight: 'bold' }} htmlFor="libelle">
                      Designation
                    </InputLabel>
                    <Input id="libelle" name="libelle" value={values.libelle} onChange={handleChange} size="small" />
                    {touched.libelle && errors.libelle ? <div style={{ color: 'red', marginTop: '4px' }}>{errors.libelle}</div> : null}
                  </FormControl>

                  <FormControl variant="standard" fullWidth size="small">
                    <InputLabel style={{ fontWeight: 'bold' }} htmlFor="nationalite">
                      Nationalité
                    </InputLabel>
                    <Input
                      id="nationalite"
                      name="nationalite"
                      value={values.nationalite}
                      onChange={handleChange}
                      size="small"
                    />
                  </FormControl>

                  <FormControl fullWidth variant="standard">
                    <InputLabel style={{ fontWeight: 'bold' }} id="continent">
                      Continent
                    </InputLabel>
                    <Select
                      name="continent"
                      id="continent"
                      value={values.continent}
                      label="Continent"
                      onChange={(e) => {
                        void setFieldValue('continent', e.target.value);
                      }}
                    >
                      {continentsListe.enumerations.map((continent) => (
                        <MenuItem key={continent.key} value={continent.key}>
                          {continent.value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {/* <FormControl fullWidth variant="standard">
                    <InputLabel style={{ fontWeight: 'bold' }} id="continent">
                      Mouvements des vehicules exoneré
                    </InputLabel>
                    <div>
                      <Checkbox
                        checked={values.exonereMouvementDesVehicules}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    </div>
                  </FormControl> */}
                </Stack>

                <DialogActions sx={{ mr: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={() => {resetForm()}}
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
  const theme = useTheme();
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

      <PaysDialog open={open} onClose={() => { setOpen(false); }} />
    </div>
  );
}
