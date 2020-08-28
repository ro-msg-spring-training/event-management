import React, { useState, useEffect } from 'react';
import TicketsStep from './steps/ticketsStep/TicketsStepSmart';
import EmailStep from './steps/EmailStep';
import NamesStep from './steps/namesStep/NamesStepSmart';
import TermsAndConditionsStep from './steps/termsAndConditionsStep/TermsAndConditionsStepSmart';
import Booking from '../../../model/Booking';
import { Tooltip, IconButton } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import CloseIcon from '@material-ui/icons/Close';
import { TicketAvailabilityData } from '../../../model/TicketAvailabilityData';
import { BuyTicketsSecondPageStyle } from '../../../styles/BuyTicketsSecondPageStyle';
import { TicketsPerCateory, TicketNames } from '../../../model/UserReserveTicket';

interface BuyTicketsSecondPageDumbProps {
  gotoFirstPage: () => void,
  gotoEventListPage: () => void,
  ticketCategories: TicketAvailabilityData[],
  eventId: number | string,
  booking: Booking,
  addBookings: (booking: Booking) => void,

  updateBookings: (booking: Booking) => void,

  updateTicketAmount: (ticketAmount: TicketsPerCateory[]) => void,
  ticketAmount: TicketsPerCateory[],

  updateTicketNames: (ticketAmount: TicketNames[]) => void,
  ticketNames: TicketNames[],
}

function BuyTicketsSecondPageDumb({ gotoFirstPage, gotoEventListPage, ticketCategories, eventId, booking, addBookings,
  updateBookings, updateTicketAmount, ticketAmount, updateTicketNames, ticketNames }: BuyTicketsSecondPageDumbProps) {
  const [step, setStep] = useState(1);
  const [checked, setChecked] = useState(false);

  let today = new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0]

  let initialTicketState: TicketsPerCateory[] = [];
  useEffect(() => {
    ticketCategories.map((ticket) => initialTicketState.push({ category: ticket.title, quantity: 0 }))
    updateTicketAmount(initialTicketState);

    let oldBooking = { ...booking };
    oldBooking.eventId = Number(eventId);
    oldBooking.bookingDate = today;
    updateBookings(oldBooking);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const classes = BuyTicketsSecondPageStyle();

  // Proceed to next step
  const nextStep = () => { setStep(step + 1); };

  // Go back to prev step
  const prevStep = () => { setStep(step - 1); };

  const handleEnterKey = (e: any): void => { e.keyCode === 13 && e.preventDefault(); }

  const handleTicketsStepChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const index = ticketCategories.findIndex(ticket => ticket.title === name)
    ticketCategories[index].remaining >= Number(value) ?
      updateTicketAmount(ticketAmount.map(item => (item.category === name ? { ...item, 'quantity': Number(value) } : item))) :
      console.log("Error not that many tickets in stock");
  }

  const handleEmailStepChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    let newBooking = { ...booking };
    newBooking.email = value;
    updateBookings(newBooking);
  }

  const handleNameStepChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    //VIP_0 => ticketData[0] = VIP; ticketData[1] = 0
    let ticketData = name.split("_");

    //find the ticket category and its names array
    let ticketToUpdate = ticketNames.find(ticket => (ticket.ticketTitle === ticketData[0]));

    //set the new value to the specified position in the names array
    ticketToUpdate!.names[Number(ticketData[1])] = value;

    let ticketNamesCopy = [...ticketNames];
    let index = ticketNames.findIndex(ticket => (ticket.ticketTitle === ticketData[0]))
    let replacedTicket = { ...ticketNamesCopy[index] }
    replacedTicket = ticketToUpdate as TicketNames;
    ticketNamesCopy[index] = replacedTicket;
    updateTicketNames(ticketNamesCopy);
  }

  const buttons =
    <>
      <div className={classes.positionLeft}>
        <Tooltip title="Go to first page">
          <IconButton onClick={gotoFirstPage}><NavigateNextIcon fontSize="large" className={classes.prevButtonStyle} /></IconButton>
        </Tooltip>
      </div>

      <div className={classes.positionRight}>
        <Tooltip title="Cancel purchase">
          <IconButton onClick={gotoEventListPage}><CloseIcon fontSize="large" className={classes.cancelButtonStyle} /></IconButton>
        </Tooltip>
      </div>
    </>

  let currentPage = <></>

  switch (step) {
    case 1:
      currentPage =
        <TicketsStep
          nextStep={nextStep}
          handleEnterKey={handleEnterKey}
          handleTicketsStepChange={handleTicketsStepChange}
          ticketCategories={ticketCategories}
          ticketAmount={ticketAmount}
        />
      break;
    case 2:
      currentPage =
        <EmailStep
          nextStep={nextStep}
          prevStep={prevStep}
          handleEnterKey={handleEnterKey}
          handleEmailStepChange={handleEmailStepChange}
          email={booking.email}
        />
      break;
    case 3:
      currentPage =
        <NamesStep
          nextStep={nextStep}
          prevStep={prevStep}
          handleEnterKey={handleEnterKey}
          handleNameStepChange={handleNameStepChange}
          ticketAmount={ticketAmount}
          ticketNames={ticketNames}
          updateTicketNames={updateTicketNames}
        />
      break;
    case 4:
      currentPage =
        <TermsAndConditionsStep
          prevStep={prevStep}
          checked={checked}
          handleCheckboxChange={handleCheckboxChange}
          booking={booking}
          // setBooking={setBooking}
          updateBookings={updateBookings}
          ticketNames={ticketNames}
          setChecked={setChecked}
          addBookings={addBookings}
        />
      break;
    default:
      (console.log('Wrong step'))
  }

  return (
    <>
      {currentPage}
      {buttons}
    </>
  );
}

export default BuyTicketsSecondPageDumb;
