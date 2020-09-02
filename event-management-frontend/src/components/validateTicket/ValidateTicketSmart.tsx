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
        console.log('ifben');
      }
    }
  };

  const handleError = () => {
    setAlertSeverity('error');
    setAlertTitle(t('validateTicket.errorMessage'));
    setAlertDescription(t('validateTicket.qrReaderError'));
    setAlertVisible(true);
  };

  const validateNext = () => {
    console.log('validate next');
    console.log('elotte: ', store.getState().events);
    setIsError(false);
    console.log('utana: ', store.getState()?.events);
    setAlertVisible(false);
    setAlertTitle('');
    setAlertDescription('');
    setAlertSeverity(undefined);
  };

  const exitValidation = () => {
    console.log('exitValidation');
    history.push('/admin/events');
    setAlertTitle('');
    setAlertDescription('');
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg">
        <CircularProgress />
      </Container>
    );
  }

  if (errorStatus && !alertDescription && isError) {
    setAlertSeverity('error');
    console.log('Errorstatus and no alert desc');
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
  }

  if (isError && !alertTitle) {
    console.log('isError and no alert title');
    setAlertTitle(t('validateTicket.errorMessage'));
    setAlertSeverity('error');
    setAlertVisible(true);
  }

  if (isValid && !alertTitle) {
    console.log('Valid, ticketData: ', store.getState().events);
    console.log('Valid and no alert title');
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
  console.log('Customer data: ', state.events.ticketCustomerName, state.events.ticketCustomerEmail);
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
