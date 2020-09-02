import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Grid } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useValidateTicketStyles } from '../../styles/ValidateTicketStyle';
import QrReader from 'react-qr-reader';

type Props = {
  open: boolean;
  dialogTitle: string;
  dialogDescription: string;
  validateNext: () => void;
  exitValidation: () => void;
  handleScan: (data: string | null) => void;
  handleError: (error: string) => void;
};

const TicketDialog: React.FC<Props> = ({
  open,
  dialogTitle,
  dialogDescription,
  validateNext,
  exitValidation,
  handleScan,
  handleError,
}: Props) => {
  const { t } = useTranslation();
  const classes = useValidateTicketStyles();

  return (
    <div>
      <Grid container>
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <QrReader className={classes.readerStyle} delay={800} onError={handleError} onScan={handleScan} />
        </Grid>
        <Dialog
          open={open}
          onClose={exitValidation}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">{dialogDescription}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={validateNext} color="primary">
              {t('validateTicket.validateNext')}
            </Button>
            <Button onClick={exitValidation} color="primary" autoFocus>
              {t('validateTicket.exitValidation')}
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </div>
  );
};

export default TicketDialog;
