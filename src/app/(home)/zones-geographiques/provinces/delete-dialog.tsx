import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface DeleteDialogProps {
  open: boolean;
  setOpen: (state: boolean) => void;
  handleDelete: () => void;
}

export default function DeleteDialog({ open, setOpen, handleDelete }: DeleteDialogProps): React.JSX.Element {
 
  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Voulez vous supprimer?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleDelete}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
  );
}
