'use client';

import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { DialogActions, DialogContent, IconButton, Stack, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

import ListSearchComponent from '@/components/ui-components/list-search-component';

const emails = ['username@gmail.com', 'user02@gmail.com'];

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

function SimpleDialog(props: SimpleDialogProps): React.JSX.Element {
  const theme = useTheme();
  const { onClose, selectedValue, open } = props;

  const handleClose = (): void => {
    onClose(selectedValue);
  };

 

  return (
    <Dialog onClose={handleClose} open={open} fullWidth>
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
        hello
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
          // onClick={handleClickOpen}
        >
          Creer
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function PayDialog(): React.JSX.Element {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (value: string): void => {
    setOpen(false);
    setSelectedValue(value);
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
