import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from 'react-router-dom';

interface AlertDialogProps{
  open: boolean,
  setOpen: any,
}

export default function AlertDialog({ open, setOpen }: AlertDialogProps) {
  const history = useHistory();
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleProceed = (): void => {
    setOpen(false);
    history.push('/');
  }

  const handleCancel = (): void => {
    setOpen(false);
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Cancel and go back to the main page?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            By choosing to cancel you will lose the progress
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleProceed} color="primary">
            Proceed
          </Button>
          <Button onClick={handleCancel} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
