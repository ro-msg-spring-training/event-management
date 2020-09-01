import React, { useState, useEffect } from 'react';
import Booking from '../../../../../model/Booking';
import Ticket from '../../../../../model/Ticket';
import { TicketNames } from '../../../../../model/UserReserveTicket';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { TicketsStepFormErrors, EmailStepFormErrors, NamesStepFormErrors } from '../../../../../model/BuyTicketsSecondPage';
import AlertDialog from '../../../../eventCreateOrEdit/AlertDialog';
import { useTranslation } from 'react-i18next';
import { verifyIfNoErrors, verifyIfNoNullFields, verifyIfNoErrorsInTicketsStep, verifyIfNoErrorsInEmailStep, verifyIfNoErrorsInNamesStep } from '../../../../../utils/ticketReservationUtils/TermsAndConditionsUtils';
import { Container, CircularProgress, Grid } from '@material-ui/core';
import BuyTicketsPopupSmart from './popup/BuyTicketsPopupSmart';

interface TermsAndConditionsStepSmartProps {
  prevStep: () => void,
  checked: boolean,
  booking: Booking,
  ticketNames: TicketNames[],
  addBookings: (booking: Booking) => void,
  updateBookings: (booking: Booking) => void,
  updateChecked: (checked: boolean) => void,

  ticketsStepFormErrors: TicketsStepFormErrors[],
  emailFormErrors: EmailStepFormErrors,
  namesStepFormErrors: NamesStepFormErrors[],

  isError: boolean,
  isLoading: boolean,
  errorMsg: string,

  open: boolean,
  setOpen: (open: boolean) => void,
}

function TermsAndConditionsStepSmart({ prevStep, checked, booking, updateBookings, ticketNames,
  updateChecked, addBookings, ticketsStepFormErrors, emailFormErrors, namesStepFormErrors, isError, isLoading, errorMsg,
  open, setOpen }: TermsAndConditionsStepSmartProps) {

  const { t } = useTranslation();

  const [openErrorPopup, setOpenErrorPopup] = useState(false);
  const [msgUndo, setMsgUndo] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogDescription, setDialogDescription] = useState("");
  const history = useHistory();

  useEffect(() => {
    updateChecked(false);
  }, [updateChecked]);

  useEffect(() => {
    let newBooking = { ...booking };
    let newArr: Ticket[] = [];

    ticketNames.forEach(category => {
      category.names.forEach(currName => { newArr.push({ ticketCategoryTitle: category.ticketTitle, name: currName }); });
    });

    newBooking.tickets = newArr;
    updateBookings(newBooking);
  }, []);

  const handleProceedToBuy = () => {
    let noErrors = verifyIfNoErrors(ticketsStepFormErrors, emailFormErrors, namesStepFormErrors, booking);

    if (!checked) {
      setOpen(false);

      setMsgUndo(t("welcome.popupErrMsgUnderstood"));
      setDialogTitle(t("welcome.popupMsgErrTitle"));
      setDialogDescription(t("buyTicketsSecondPage.termsAndConditionsErr"));
      setOpenErrorPopup(true);

    } else if (noErrors) {
      addBookings(booking);

      if (isLoading) {
        return (
          <Grid container direction="row" justify="center" alignItems="center">
            <Container maxWidth="lg">
              <CircularProgress />
            </Container>
            <h6>Loading</h6>
          </Grid>
        );
      }
      else if (isError) {
        alert("ERROR " + errorMsg);

      } else {
        return history.push('/user/events');
      }

    } else if (!verifyIfNoNullFields(booking)) {
      setOpen(false);

      setMsgUndo(t("welcome.popupErrMsgUnderstood"));
      setDialogTitle(t("welcome.popupMsgErrTitle"));
      setDialogDescription(t("welcome.popupErrMsgNotFilled"));
      setOpenErrorPopup(true);

    } else if (!verifyIfNoErrorsInTicketsStep(ticketsStepFormErrors)) {
      setOpen(false);

      setMsgUndo(t("welcome.popupErrMsgUnderstood"));
      setDialogTitle(t("welcome.popupMsgErrTitle"));
      setDialogDescription(t("buyTicketsSecondPage.noErrorsInTicketsStep"));
      setOpenErrorPopup(true);

    } else if (!verifyIfNoErrorsInEmailStep(emailFormErrors)) {
      setOpen(false);

      setMsgUndo(t("welcome.popupErrMsgUnderstood"));
      setDialogTitle(t("welcome.popupMsgErrTitle"));
      setDialogDescription(t("buyTicketsSecondPage.noErrorsInEmailStep"));
      setOpenErrorPopup(true);

    } else if (!verifyIfNoErrorsInNamesStep(namesStepFormErrors)) {
      setOpen(false);

      setMsgUndo(t("welcome.popupErrMsgUnderstood"));
      setDialogTitle(t("welcome.popupMsgErrTitle"));
      setDialogDescription(t("buyTicketsSecondPage.noErrorsInNamesStep"));
      setOpenErrorPopup(true);
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    updateChecked(e.target.checked);
  };

  return (
    <>
      <BuyTicketsPopupSmart
        prevStep={prevStep}
        open={open}
        setOpen={setOpen}
        checked={checked}
        handleCheckboxChange={handleCheckboxChange}
        handleProceedToBuy={handleProceedToBuy}
      />
      <AlertDialog
        prevStep={prevStep}
        open={openErrorPopup}
        setOpen={setOpenErrorPopup}
        msgUndo={msgUndo}
        dialogTitle={dialogTitle}
        dialogDescription={dialogDescription}
      />
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    ticketsStepFormErrors: state.ticketCategories.ticketsStepFormErrors,
    emailFormErrors: state.ticketCategories.emailFormErrors,
    namesStepFormErrors: state.ticketCategories.namesStepFormErrors,

    isError: state.ticketCategories.isError,
    errorMsg: state.ticketCategories.errorMsg,
    isLoading: state.ticketCategories.isLoading
  }
}

export default connect(mapStateToProps)(TermsAndConditionsStepSmart);
