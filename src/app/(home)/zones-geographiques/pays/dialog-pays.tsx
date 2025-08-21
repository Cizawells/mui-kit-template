'use client';

import * as React from 'react';
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

import { Pays, savePays } from '@/lib/apis/pays';
import ListSearchComponent from '@/components/ui-components/list-search-component';

const emails = ['username@gmail.com', 'user02@gmail.com'];

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const queryClient = useQueryClient();

  const [values, setValues] = React.useState({
    code: '',
    libelle: '',
    nationalite: '',
    continent: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const theme = useTheme();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  const mutation = useMutation({
    mutationFn: (pays: Pays) => savePays(pays),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['pays'] });
      setValues({
        code: '',
        libelle: '',
        nationalite: '',
        continent: '',
      });
      handleClose();
    },
  });

  return (
    <Dialog
      open={open}
      fullWidth
      onClose={(event, reason) => {
        if (reason === 'backdropClick') return; // ignore clicks outside
        handleClose(); // allow escape key or programmatic close
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={2} sx={{ mr: 2 }}>
        <DialogTitle>Pays</DialogTitle>
        <IconButton
          onClick={() => {
            handleClose();
          }}
          sx={{
            ':hover': {
              cursor: 'pointer',
              backgroundColor: theme.palette.error.light,
              color: theme.palette.primary.light,
            },
          }}
          disabled={false}
        >
          <CloseIcon />
        </IconButton>
      </Stack>
      <DialogContent>
        <Stack spacing={2}>
          <FormControl variant="standard" fullWidth size="small">
            <InputLabel htmlFor="code">Code</InputLabel>
            <Input id="code" value={values.code} onChange={handleChange} name="code" size="small" />
          </FormControl>

          <FormControl variant="standard" fullWidth size="small">
            <InputLabel htmlFor="designation">Designation</InputLabel>
            <Input id="designation" value={values.libelle} onChange={handleChange} name="libelle" size="small" />
          </FormControl>
          <FormControl variant="standard" fullWidth size="small">
            <InputLabel htmlFor="standard-code">Nationalité</InputLabel>
            <Input
              id="standard-code"
              value={values.nationalite}
              onChange={handleChange}
              name="nationalite"
              size="small"
            />
          </FormControl>
          <FormControl variant="standard" fullWidth size="small">
            <InputLabel htmlFor="standard-code">Continent</InputLabel>
            <Input id="standard-code" value={values.continent} onChange={handleChange} name="continent" size="small" />
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ mr: 2 }}>
        <Button
          variant="outlined"
          disabled={false}
          style={{
            cursor: 'pointer',
            paddingInline: 30,
            textTransform: 'none',
            fontWeight: 'bold',
          }}
          // onClick={handleClickOpen}
        >
          Reinitialiser
        </Button>
        <Button
          variant="contained"
          disabled={false}
          style={{
            cursor: 'pointer',
            paddingInline: 30,
            textTransform: 'none',
            fontWeight: 'bold',
          }}
          onClick={() => {
            console.log('saving...');
            mutation.mutate({
              ...values,
            });
          }}
        >
          Creer
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function PayDialog() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        paddingY={{ xs: '0.3rem', sm: '0.9rem' }}
        justifyContent="space-between"
        gap="0.4rem"
      >
        <Stack direction={{ xs: 'column', sm: 'row' }} gap="0.4rem">
          <ListSearchComponent
            style={{ height: '100%' }}
            // handleChange={handleFilter}
            // filter={loadData}
            // filterValue={filterValue}
            // handleClear={handleClear}
          />

          <Button
            variant="outlined"
            name="button-component"
            disabled={false}
            style={{
              cursor: 'pointer',
              paddingInline: 30,
              textTransform: 'none',
              fontWeight: 'bold',
            }}
            // onClick={handleClickOpen}
          >
            Chercher
          </Button>
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} gap="0.4rem">
          <Button
            variant="outlined"
            name="button-component"
            disabled={false}
            style={{
              cursor: 'pointer',
              paddingInline: 30,
              textTransform: 'none',
              fontWeight: 'bold',
            }}
            onClick={handleClickOpen}
          >
            Creer
          </Button>
        </Stack>
      </Stack>
      <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
    </div>
  );
}
