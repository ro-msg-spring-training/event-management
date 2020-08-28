import React from 'react';
import EmailStep from './steps/EmailStep';
import Booking from '../../../model/Booking';
import { Tooltip, IconButton } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import CloseIcon from '@material-ui/icons/Close';
import { TicketAvailabilityData } from '../../../model/TicketAvailabilityData';
import { BuyTicketsSecondPageStyle } from '../../../styles/BuyTicketsSecondPageStyle';
import { TicketsPerCateory, TicketNames } from '../../../model/UserReserveTicket';
import TicketsStepSmart from './steps/ticketsStep/TicketsStepSmart';
import NamesStepSmart from './steps/namesStep/NamesStepSmart';
import TermsAndConditionsStepSmart from './steps/termsAndConditionsStep/TermsAndConditionsStepSmart';

interface BuyTicketsSecondPageDumbProps {
  gotoFirstPage: () => void,
  gotoEventListPage: () => void,
  ticketCategories: TicketAvailabilityData[],
  booking: Booking,
  setBooking: (booking: Booking) => void,
  addBookings: (booking: Booking) => void,
  step: number,
  prevStep: () => void,
  nextStep: () => void,
  handleEnterKey: (e: any) => void,
  handleTicketsStepChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  ticketAmount: (TicketsPerCateory[]),
  handleEmailStepChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleNameStepChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  ticketNames: TicketNames[],
  setTicketNames: (ticketNames: TicketNames[]) => void,
  checked: boolean,
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  setChecked: (checkedState: boolean) => void,
}

function BuyTicketsSecondPageDumb({ gotoFirstPage, gotoEventListPage, ticketCategories, booking, setBooking, addBookings,
  step, prevStep, nextStep, handleEnterKey, handleTicketsStepChange, ticketAmount,
  handleEmailStepChange, handleNameStepChange, ticketNames, setTicketNames, checked,
  handleCheckboxChange, setChecked }: BuyTicketsSecondPageDumbProps) {
  const classes = BuyTicketsSecondPageStyle();

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
        <TicketsStepSmart
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
        <NamesStepSmart
          nextStep={nextStep}
          prevStep={prevStep}
          handleEnterKey={handleEnterKey}
          handleNameStepChange={handleNameStepChange}
          ticketAmount={ticketAmount}
          ticketNames={ticketNames}
          setTicketNames={setTicketNames}
        />
      break;
    case 4:
      currentPage =
        <TermsAndConditionsStepSmart
          prevStep={prevStep}
          checked={checked}
          handleCheckboxChange={handleCheckboxChange}
          booking={booking}
          setBooking={setBooking}
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