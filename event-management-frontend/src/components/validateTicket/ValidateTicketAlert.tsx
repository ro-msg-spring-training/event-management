import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Button, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useValidateTicketStyles } from '../../styles/ValidateTicketStyle';
import { useStyles } from '../../styles/CommonStyles';
import '../../styles/Responsivity.css';

export type Severity = 'error' | 'success' | undefined;
export const initialSeverity: Severity = undefined;

type Props = {
  alertTitle: string;
  alertSeverity: Severity;
  alertDescription: string;
  customerName: string;
  customerEmail: string;

  validateNext: () => void;
  exitValidation: () => void;
};

export const ValidateTicketAlert = ({
  alertTitle,
  alertSeverity,
  alertDescription,
  customerName,
  customerEmail,
  validateNext,
  exitValidation,
}: Props) => {
  const { t } = useTranslation();
  const classes = useValidateTicketStyles();
  const classes2 = useStyles();

  return (
    <div className={`${classes.alertStyle} alertResponsive`}>
      <Alert severity={alertSeverity} className={`${classes.alertIconStyle} alertContentResponsive`}>
        <AlertTitle className={`${classes.titleStyle} titleResponsive`}>{alertTitle}</AlertTitle>
        <div className="alertMessage">{alertDescription}</div>
        {alertSeverity === 'success' ? (
          <>
            <p>
              {t('validateTicket.customerName')} {customerName}
            </p>
            <p>
              {t('validateTicket.customerEmail')}
              {customerEmail}
            </p>
          </>
        ) : (
          ''
        )}
        <div className={`${classes.alertButtons} buttonsResponsive`}>
          <Grid container>
            <Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
              <Button
                onClick={exitValidation}
                className={`${classes2.buttonStyle2} ${classes2.buttonStyle3} ${classes.exitButton}`}
                color="primary"
              >
                {t('validateTicket.exitValidation')}
              </Button>
            </Grid>{' '}
            <Grid item xl={7} lg={7} md={7} sm={6} xs={6}>
              <Button
                onClick={validateNext}
                className={`${classes2.buttonStyle2} ${classes2.buttonStyle3} ${classes.nextButton}`}
                autoFocus
              >
                {t('validateTicket.validateNext')}
              </Button>
            </Grid>
          </Grid>
        </div>
      </Alert>
    </div>
  );
};
