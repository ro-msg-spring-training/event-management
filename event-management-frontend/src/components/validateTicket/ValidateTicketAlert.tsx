import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useValidateTicketStyles } from '../../styles/ValidateTicketStyle';
import { useStyles } from '../../styles/CommonStyles';

type Severity = 'error' | 'success' | undefined;
export const initialSeverity: Severity = undefined;

type Props = {
  alertTitle: string;
  alertSeverity: Severity;
  alertDescription: string;

  validateNext: () => void;
  exitValidation: () => void;
};

export const ValidateTicketAlert = ({
  alertTitle,
  alertSeverity,
  alertDescription,
  validateNext,
  exitValidation,
}: Props) => {
  const { t } = useTranslation();
  const classes = useValidateTicketStyles();
  const classes2 = useStyles();

  return (
    <>
      <Alert severity={alertSeverity}>
        <AlertTitle>{alertTitle}</AlertTitle>
        {alertDescription}
        <div className={classes.alertButton}>
          <Button
            onClick={exitValidation}
            className={`${classes2.buttonStyle2} ${classes2.buttonStyle3}`}
            color="primary"
          >
            {t('validateTicket.validateNext')}
          </Button>
          <Button onClick={validateNext} className={`${classes2.buttonStyle2} ${classes2.buttonStyle3}`} autoFocus>
            {t('validateTicket.exitValidation')}
          </Button>
        </div>
      </Alert>
    </>
  );
};
