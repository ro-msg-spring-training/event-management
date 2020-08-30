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
}

const verifyIfNoErrorsInTicketsStep = (ticketsStepFormErrors: TicketsStepFormErrors[]): boolean => {
  return ticketsStepFormErrors.filter(ticketError => ticketError.error !== "").length === 0
}

const verifyIfNoErrorsInEmailStep = (emailFormErrors: EmailStepFormErrors): boolean => {
  return emailFormErrors.error === ""
}

const verifyIfNoErrorsInNamesStep = (namesStepFormErrors: NamesStepFormErrors[]): boolean => {
  return namesStepFormErrors.filter(nameError => nameError.error !== "").length === 0
}

const verifyIfNoNullFields = (booking: Booking): boolean => {
  if (booking.email === "") return false;
  if (booking.tickets.length === 0) return false;
  if (booking.tickets.filter(ticket => ticket.name === "").length > 0) return false;
  return true;
}

const verifyIfNoErrors = (ticketsStepFormErrors: TicketsStepFormErrors[], emailFormErrors: EmailStepFormErrors, namesStepFormErrors: NamesStepFormErrors[], booking: Booking): boolean => {
  if (verifyIfNoErrorsInTicketsStep(ticketsStepFormErrors) === true
    && verifyIfNoErrorsInEmailStep(emailFormErrors) === true
    && verifyIfNoErrorsInNamesStep(namesStepFormErrors) === true
    && verifyIfNoNullFields(booking) === true)
    return true;
  return false;
}

function TermsAndConditionsStepSmart({ prevStep, checked, booking, updateBookings, ticketNames,
  updateChecked, addBookings, ticketsStepFormErrors, emailFormErrors, namesStepFormErrors }: TermsAndConditionsStepSmartProps) {

  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [openErrorPopup, setOpenErrorPopup] = useState(false);
  const [msgUndo, setMsgUndo] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogDescription, setDialogDescription] = useState("");
  const history = useHistory();

  useEffect(() => {
    updateChecked(false);
  }, []);

  let handleEventBuyTickets = (): void => {
    setOpen(true);
  }

  useEffect(() => {
    let newBooking = { ...booking };
    let newArr: Ticket[] = [];

    ticketNames.map(category => {
      category.names.map(currName => { newArr.push({ ticketCategoryTitle: category.ticketTitle, name: currName }); });
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
      history.push('user/events');

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
  }
}

export default connect(mapStateToProps)(TermsAndConditionsStepSmart);
