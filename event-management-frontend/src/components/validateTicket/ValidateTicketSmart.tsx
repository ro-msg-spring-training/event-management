import React, { useState } from 'react';
import { Container, CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { validateTicket, setIsError } from '../../actions/EventsPageActions';
import { AppState, store } from '../../store/store';
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
    setAlertVisible(false);
    setAlertTitle('');
    setAlertDescription('');
    setAlertSeverity(undefined);
  };

  const exitValidation = () => {
    history.push('/admin/events');
  };

  if (isLoading) {
    return (
      <div className={classes.root}>
        <Container maxWidth="lg">
          <CircularProgress />
        </Container>
      </div>
    );
  }

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
    setAlertDescription(t('validateTicket.customerData') + 'Name: ' + customerName + 'Email: ' + customerEmail);
    setAlertVisible(true);
  }

  return (
    <>
      {alertVisible ? (
        <div className={classes.root}>
          <ValidateTicketDumb handleScan={handleScan} handleError={handleError} />
          <ValidateTicketAlert
            alertTitle={alertTitle}
            alertSeverity={alertSeverity}
            alertDescription={alertDescription}
            validateNext={validateNext}
            exitValidation={exitValidation}
          />
        </div>
      ) : (
        <div className={classes.root}>
          <ValidateTicketDumb handleScan={handleScan} handleError={handleError} />
        </div>
      )}
    </>
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
    validateTicket: (ticketID: number, eventID: number) => dispatch(validateTicket(ticketID, eventID)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ValidateTicket);
