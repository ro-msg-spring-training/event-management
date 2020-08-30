import React, { useState, useEffect } from 'react';
import Booking from '../../../../../model/Booking';
import Ticket from '../../../../../model/Ticket';
import { TicketNames } from '../../../../../model/UserReserveTicket';
import TermsAndConditionsDumb from './TermsAndConditionsStepDumb';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { TicketsStepFormErrors, EmailStepFormErrors, NamesStepFormErrors } from '../../../../../model/BuyTicketsSecondPage';
import AlertDialog from '../../../../eventCreateOrEdit/AlertDialog';
import { useTranslation } from 'react-i18next';
import { verifyIfNoErrors, verifyIfNoNullFields, verifyIfNoErrorsInTicketsStep, verifyIfNoErrorsInEmailStep, verifyIfNoErrorsInNamesStep } from '../../../../../utils/ticketReservationUtils/TermsAndConditionsUtils';
import { Container, CircularProgress } from '@material-ui/core';

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
}

function TermsAndConditionsStepSmart({ prevStep, checked, booking, updateBookings, ticketNames,
  updateChecked, addBookings, ticketsStepFormErrors, emailFormErrors, namesStepFormErrors, isError, isLoading, errorMsg }: TermsAndConditionsStepSmartProps) {

  const { t } = useTranslation();

  const [result, setResult] = useState(false);
  const [open, setOpen] = useState(false);
  const [openErrorPopup, setOpenErrorPopup] = useState(false);
  const [msgUndo, setMsgUndo] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogDescription, setDialogDescription] = useState("");
  const history = useHistory();

  let display = <></>

  useEffect(() => {
    updateChecked(false);
  }, [updateChecked]);

  let handleEventBuyTickets = (): void => {
    setOpen(true);
  }

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
      setDialogDescription("You haven't checked the Terms and Conditions agreement, in order to buy the tickets you need to read and accept the Terms and Conditions statements");
      setOpenErrorPopup(true);

    } else if (noErrors) {
      addBookings(booking);

      if (isLoading) {
        console.log("LOADING");
        return (
          <Container maxWidth="lg">
            <CircularProgress />
          </Container>
        );
      }
      else if (isError) {
        console.log("ERRORRRR");
        alert("ERROR " + errorMsg);
      } else {
        console.log("SUCCESS");
        alert("SUCCESS");
        return history.push('user/events');
      }

    } else if (!verifyIfNoNullFields(booking)) {
      console.log("errors null fields");
      setOpen(false);

      setMsgUndo(t("welcome.popupErrMsgUnderstood"));
      setDialogTitle(t("welcome.popupMsgErrTitle"));
      setDialogDescription(t("welcome.popupErrMsgNotFilled"));
      setOpenErrorPopup(true);

    } else if (!verifyIfNoErrorsInTicketsStep(ticketsStepFormErrors)) {
      console.log("errors in tickets step");
      setOpen(false);

      setMsgUndo(t("welcome.popupErrMsgUnderstood"));
      setDialogTitle(t("welcome.popupMsgErrTitle"));
      setDialogDescription("There are still errors in the tickets section, in order to buy the tickets you need to resolve them");
      setOpenErrorPopup(true);

    } else if (!verifyIfNoErrorsInEmailStep(emailFormErrors)) {
      console.log("errors in email step");
      setOpen(false);

      setMsgUndo(t("welcome.popupErrMsgUnderstood"));
      setDialogTitle(t("welcome.popupMsgErrTitle"));
      setDialogDescription("There are still errors in the email section, in order to buy the tickets you need to resolve them");
      setOpenErrorPopup(true);

    } else if (!verifyIfNoErrorsInNamesStep(namesStepFormErrors)) {
      console.log("errors in names step");
      setOpen(false);

      setMsgUndo(t("welcome.popupErrMsgUnderstood"));
      setDialogTitle(t("welcome.popupMsgErrTitle"));
      setDialogDescription("There are still errors in the names section, in order to buy the tickets you need to resolve them");
      setOpenErrorPopup(true);
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    updateChecked(e.target.checked);
  };

  return (
    <>
      <TermsAndConditionsDumb
        prevStep={prevStep}
        checked={checked}
        handleCheckboxChange={handleCheckboxChange}
        handleEventBuyTickets={handleEventBuyTickets}
        open={open}
        setOpen={setOpen}
        handleProceedToBuy={handleProceedToBuy}
      />
      <AlertDialog
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
