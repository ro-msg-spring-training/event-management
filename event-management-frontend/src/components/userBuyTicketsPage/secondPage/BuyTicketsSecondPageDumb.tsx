import React, { useState, KeyboardEvent } from 'react';
import TicketsStep from './steps/ticketsStep/TicketsStepSmart';
import EmailStep from './steps/emailStep/EmailStepSmart';
import NamesStep from './steps/namesStep/NamesStepSmart';
import TermsAndConditionsStep from './steps/termsAndConditionsStep/TermsAndConditionsStepSmart';
import Booking from '../../../model/Booking';
import { Tooltip, IconButton, Paper, Grid } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import CloseIcon from '@material-ui/icons/Close';
import { BuyTicketsSecondPageStyle, buyTicketsSecondPageDumbStyle } from '../../../styles/BuyTicketsSecondPageStyle';
import { TicketNames } from '../../../model/UserReserveTicket';
import { TicketAvailabilityData } from '../../../model/BuyTicketsSecondPage';
import '../../../styles/ReservePageStyle.css';
import { useTranslation } from 'react-i18next';

interface BuyTicketsSecondPageDumbProps {
  gotoFirstPage: () => void;
  gotoEventListPage: () => void;
  ticketCategories: TicketAvailabilityData[];
  eventId: number | string;
  booking: Booking;
  addBookings: (booking: Booking) => void;
  updateBookings: (booking: Booking) => void;

  updateTicketNames: (ticketAmount: TicketNames[]) => void;
  ticketNames: TicketNames[];

  updateChecked: (checked: boolean) => void;
  checked: boolean;

  step: number;
  nextStep: () => void;
  prevStep: () => void;
  handleEnterKey: (e: KeyboardEvent<HTMLDivElement>) => void;
}

function BuyTicketsSecondPageDumb({
  gotoFirstPage,
  gotoEventListPage,
  ticketCategories,
  eventId,
  booking,
  addBookings,
  updateBookings,
  updateTicketNames,
  ticketNames,
  updateChecked,
  checked,
  step,
  nextStep,
  prevStep,
  handleEnterKey,
}: BuyTicketsSecondPageDumbProps) {
  const [t] = useTranslation();

  const buttonStyles = BuyTicketsSecondPageStyle();
  const generalStyle = buyTicketsSecondPageDumbStyle();

  const buttons = (
    <>
      <Tooltip title={t('buyTicketsSecondPage.gotoFirstPage') as string}>
        <IconButton
          onClick={gotoFirstPage}
          className={`${buttonStyles.positionLeft} buttonStyleLeft ${buttonStyles.prevButtonStyle} buttonStyleLeftSecond`}
        >
          <NavigateNextIcon color="secondary" />
        </IconButton>
      </Tooltip>

      <Tooltip title={t('buyTicketsSecondPage.cancelPurchase') as string}>
        <IconButton
          onClick={gotoEventListPage}
          className={`${buttonStyles.positionRight} buttonStyleRight ${buttonStyles.cancelButtonStyle} buttonStyleRightSecond`}
        >
          <CloseIcon color="secondary" />
        </IconButton>
      </Tooltip>
    </>
  );

  const [open, setOpen] = useState(false);
  let handleBuy = (): void => {
    setOpen(true);
    nextStep();
  };

  let currentPage = <></>;
  switch (step) {
    case 1:
      currentPage = (
        <div style={{ marginTop: '2vh' }}>
          <TicketsStep
            nextStep={nextStep}
            handleEnterKey={handleEnterKey}
            ticketCategories={ticketCategories}
            updateTicketNames={updateTicketNames}
            eventId={eventId}
          />
        </div>
      );
      break;

    case 2:
      currentPage = (
        <div style={{ marginTop: '15vh' }}>
          <EmailStep
            nextStep={nextStep}
            prevStep={prevStep}
            handleEnterKey={handleEnterKey}
            email={booking.email}
            updateBookings={updateBookings}
            booking={booking}
          />
        </div>
      );
      break;

    case 3:
      currentPage = (
        <NamesStep
          handleBuy={handleBuy}
          prevStep={prevStep}
          handleEnterKey={handleEnterKey}
          ticketNames={ticketNames}
          updateTicketNames={updateTicketNames}
        />
      );
      break;
    case 4:
      currentPage = (
        <TermsAndConditionsStep
          open={open}
          setOpen={setOpen}
          prevStep={prevStep}
          checked={checked}
          booking={booking}
          updateBookings={updateBookings}
          ticketNames={ticketNames}
          updateChecked={updateChecked}
          addBookings={addBookings}
        />
      );
      break;
    default:
      console.error('Wrong step');
  }

  return (
    <div className={generalStyle.root}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12}>
          <Paper className={`${generalStyle.paperStyle} buyPageResponsive `}>{currentPage}</Paper>
        </Grid>
      </Grid>
      {buttons}
    </div>
  );
}

export default BuyTicketsSecondPageDumb;
