import React, { useState } from 'react';
import { Container, CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { validateTicket, setIsError, setIsValid } from '../../actions/EventsPageActions';
import { AppState } from '../../store/store';
import { ValidateTicketDumb } from './ValidateTicketDumb';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { ValidateTicketAlert, initialSeverity } from './ValidateTicketAlert';
import { useValidateTicketStyles } from '../../styles/ValidateTicketStyle';

type Props = {
  match: any;
  isAdmin: boolean;
  isError: boolean;
  errorStatus: number;
  customerName: string;
  customerEmail: string;
  isLoading: boolean;
  isValid: boolean;

  validateTicket: (ticketID: number, eventID: number) => void;
  setIsError: (error: boolean) => void;
  setIsValid: (isValid: boolean) => void;
};

const ValidateTicket = ({
  match,
  isError,
  isLoading,
  errorStatus,
  customerName,
  customerEmail,
  isValid,
  validateTicket,
  setIsError,
  setIsValid,
}: Props) => {
  const [ticketID, setTicketID] = useState(0);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertDescription, setAlertDescription] = useState('');
  const [alertSeverity, setAlertSeverity] = useState(initialSeverity);

  const eventID = match.params.id;

  const { t } = useTranslation();
  const history = useHistory();
  const classes = useValidateTicketStyles();

  const handleScan = (data: string | null) => {
    if (data) {
      setIsError(false);
      setAlertTitle('');
      setAlertDescription('');
      setTicketID(parseInt(data.split(' ')[1]));
      if (ticketID) {
        validateTicket(ticketID, eventID);
      }
    }
  };

  const handleError = () => {
    setAlertSeverity('error');
    setAlertTitle(t('validateTicket.errorMessage'));
    setAlertDescription(t('validateTicket.defaultError'));
    setAlertVisible(true);
  };

  const validateNext = () => {
    setIsError(false);
    setIsValid(false);
    setAlertVisible(false);
    setAlertTitle('');
    setAlertDescription('');
    setAlertSeverity(undefined);
  };

  const exitValidation = () => {
    history.push('/admin/events');
  };

  if (errorStatus && !alertDescription && isError) {
    setAlertSeverity('error');
    setAlertTitle(t('validateTicket.errorMessage'));
    switch (errorStatus) {
      case 404:
        setAlertDescription(t('validateTicket.notFoundError'));
        break;
      case 409:
        setAlertDescription(t('validateTicket.conflictError'));
        break;
      case 406:
        setAlertDescription(t('validateTicket.notAcceptableError'));
        break;
      default:
        setAlertDescription(t('validateTicket.defaultError'));
    }
    setAlertVisible(true);
  }

  if (isValid && !alertTitle) {
    setAlertSeverity('success');
    setAlertTitle(t('validateTicket.successfulValidation'));
    setAlertDescription(t('validateTicket.successfulMessage'));
    setAlertVisible(true);
  }

  if (isLoading) {
    return (
      <div className={classes.root}>
        <Container maxWidth="xl">
          <CircularProgress className={classes.loading} />
        </Container>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <ValidateTicketDumb handleScan={handleScan} handleError={handleError} />
        {alertVisible ? (
          <ValidateTicketAlert
            alertTitle={alertTitle}
            alertSeverity={alertSeverity}
            alertDescription={alertDescription}
            customerName={customerName}
            customerEmail={customerEmail}
            validateNext={validateNext}
            exitValidation={exitValidation}
          />
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    customerName: state.events.ticketCustomerName,
    customerEmail: state.events.ticketCustomerEmail,
    errorStatus: state.events.errorStatus,
    isError: state.events.isError,
    isLoading: state.events.isLoading,
    isValid: state.events.isValid,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setIsError: (isError: boolean) => dispatch(setIsError(isError)),
    setIsValid: (isValid: boolean) => dispatch(setIsValid(isValid)),
    validateTicket: (ticketID: number, eventID: number) => dispatch(validateTicket(ticketID, eventID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ValidateTicket);
