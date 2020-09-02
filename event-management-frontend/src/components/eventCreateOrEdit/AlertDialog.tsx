import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Grid, Container, CircularProgress } from '@material-ui/core';
import { useStyles } from '../../styles/CommonStyles';

interface AlertDialogProps {
  open: boolean;
  setOpen: any;
  msgUndo: string;
  dialogTitle: string;
  dialogDescription: string;

  prevStep?: () => void;
  isLoading?: boolean;
  isError?: boolean;
  errorMsg?: string;
  isRequest: boolean;
  handleGoToEventsPage?: () => void
}

export default function AlertDialog({
  prevStep,
  open,
  setOpen,
  msgUndo,
  dialogTitle,
  dialogDescription,
  isLoading,
  isError,
  errorMsg,
  isRequest,
  handleGoToEventsPage
}: AlertDialogProps) {
  const buttonClass = useStyles();
  const history = useHistory();
  const { t } = useTranslation();

  const handleClose = () => {
    setOpen(false);
    prevStep !== undefined && prevStep();
  };

  const handleProceed = (): void => {
    setOpen(false);
    prevStep !== undefined && prevStep();
    history.push('/admin/events');
  };

  const handleCancel = (): void => {
    setOpen(false);
    prevStep !== undefined && prevStep();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {console.log("REQUEST", isRequest)}
        {isRequest ?
          isLoading ?
            <DialogContent>
              {console.log("loading")}
              <Grid container direction="row" justify="center" alignItems="center">
                <Container maxWidth="lg">
                  <CircularProgress />
                </Container>
                <DialogContentText id="alert-dialog-description">Loading</DialogContentText>
              </Grid>
            </DialogContent> :
            isError ?
              <>
                <DialogTitle id="alert-dialog-title">Error {errorMsg}</DialogTitle>
                <DialogContent>
                  {console.log("error", errorMsg)}
                  {/* <DialogContentText id="alert-dialog-description">Error {errorMsg}</DialogContentText> */}
                  <DialogActions>
                    <Button onClick={handleGoToEventsPage} color="primary" autoFocus className={`${buttonClass.buttonStyle2} ${buttonClass.buttonStyle3}`}>
                      OK
                  </Button>
                  </DialogActions>
                </DialogContent>
              </> :
              <>
                <DialogTitle id="alert-dialog-title">Success</DialogTitle>
                <DialogContent>
                  {console.log("Success")}
                  {/* <DialogContentText id="alert-dialog-description">Success</DialogContentText> */}
                  <DialogActions>
                    <Button onClick={handleGoToEventsPage} color="primary" autoFocus className={`${buttonClass.buttonStyle2} ${buttonClass.buttonStyle3}`}>
                      OK
                  </Button>
                  </DialogActions>
                </DialogContent>
              </> :
          <>
            <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">{dialogDescription}</DialogContentText>
            </DialogContent>
            <DialogActions>
              {msgUndo === t('welcome.popupMsgCancelUndo') ? (
                <Button onClick={handleProceed} color="primary">
                  {t('welcome.popupMsgContinueUndo')}
                </Button>
              ) : null}
              <Button onClick={handleCancel} color="primary" autoFocus>
                {msgUndo}
              </Button>
            </DialogActions>
          </>
        }
      </Dialog>
    </div>
  );
}
