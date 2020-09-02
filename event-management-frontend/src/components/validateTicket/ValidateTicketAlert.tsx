import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

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
  return (
    <>
      <Alert severity={alertSeverity}>
        <AlertTitle>{alertTitle}</AlertTitle>
        {alertDescription}
        <Button onClick={validateNext} color="primary">
          {t('validateTicket.validateNext')}
        </Button>
        <Button onClick={exitValidation} color="primary" autoFocus>
          {t('validateTicket.exitValidation')}
        </Button>
      </Alert>
    </>
  );
};
