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

  updateChecked: (checked: boolean) => void,
  checked: boolean,

  step: number,

  nextStep: () => void,
  prevStep: () => void,
  handleEnterKey: (e: any) => void,
  handleTicketsStepChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleEmailStepChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleNameStepChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const today = new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0]

function BuyTicketsSecondPageDumb({ gotoFirstPage, gotoEventListPage, ticketCategories, eventId, booking, addBookings,
  updateBookings, updateTicketAmount, ticketAmount, updateTicketNames, ticketNames, updateChecked, checked,
  step, nextStep, prevStep, handleEnterKey, handleTicketsStepChange, handleEmailStepChange,
  handleNameStepChange, handleCheckboxChange }: BuyTicketsSecondPageDumbProps) {
  
  const classes = BuyTicketsSecondPageStyle();

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
          updateBookings={updateBookings}
          ticketNames={ticketNames}
          updateChecked={updateChecked}
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
