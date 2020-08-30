import React from 'react';
import TicketsStep from './steps/ticketsStep/TicketsStepSmart';
import EmailStep from './steps/emailStep/EmailStepSmart';
import NamesStep from './steps/namesStep/NamesStepSmart';
import TermsAndConditionsStep from './steps/termsAndConditionsStep/TermsAndConditionsStepSmart';
import Booking from '../../../model/Booking';
import { Tooltip, IconButton, Theme, makeStyles, Paper, Grid, Box } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import CloseIcon from '@material-ui/icons/Close';
import { BuyTicketsSecondPageStyle } from '../../../styles/BuyTicketsSecondPageStyle';
import { TicketNames } from '../../../model/UserReserveTicket';
import { TicketAvailabilityData } from '../../../model/BuyTicketsSecondPage';

export const buyTicketsSecondPageDumbStyle = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    minHeight: '93.3vh',
    background: 'linear-gradient(45deg, #21C6F3 50%, #1E5FA4 90%)',
  },
  wrapper: {
    // minWidth: '40%',
    // minHeight: '50%',
    minWidth: '30vw',
    minHeight: '40vh',
    background: 'white',
  },
  position: {
    // display: 'flex',
    // flexDirection: 'row',
  },
  paper: {
    backgroundColor: 'white',
    maxWidth: '40vw',
    minHeight: '40vh',
    maxHeight: '60vh',
    // overflowY: "scroll",
    paddinggBottom: '3vh',
    // padding: '15vh 45%',
    // width: '60%',
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginLeft: '20%',
    // display: 'flex',
    // flexDirection: 'column',
  },
  scroll: {
    overflowY: 'scroll'
  }
}));

interface BuyTicketsSecondPageDumbProps {
  gotoFirstPage: () => void,
  gotoEventListPage: () => void,
  ticketCategories: TicketAvailabilityData[],
  eventId: number | string,
  booking: Booking,
  addBookings: (booking: Booking) => void,
  updateBookings: (booking: Booking) => void,

  updateTicketNames: (ticketAmount: TicketNames[]) => void,
  ticketNames: TicketNames[],

  updateChecked: (checked: boolean) => void,
  checked: boolean,

  step: number,
  nextStep: () => void,
  prevStep: () => void,
  handleEnterKey: (e: any) => void,
}

function BuyTicketsSecondPageDumb({ gotoFirstPage, gotoEventListPage, ticketCategories, eventId, booking, addBookings,
  updateBookings, updateTicketNames, ticketNames, updateChecked, checked,
  step, nextStep, prevStep, handleEnterKey }: BuyTicketsSecondPageDumbProps) {

  const classes = BuyTicketsSecondPageStyle();
  const classes2 = buyTicketsSecondPageDumbStyle();

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
          ticketCategories={ticketCategories}
          updateTicketNames={updateTicketNames}
          eventId={eventId}
        />
      break;
    case 2:
      currentPage =
        <EmailStep
          nextStep={nextStep}
          prevStep={prevStep}
          handleEnterKey={handleEnterKey}
          email={booking.email}
          updateBookings={updateBookings}
          booking={booking}
        />
      break;
    case 3:
      currentPage =
        <NamesStep
          nextStep={nextStep}
          prevStep={prevStep}
          handleEnterKey={handleEnterKey}
          ticketNames={ticketNames}
          updateTicketNames={updateTicketNames}
        />
      break;
    case 4:
      currentPage =
        <TermsAndConditionsStep
          prevStep={prevStep}
          checked={checked}
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
    <div className={classes2.root}>
      <Grid container direction="column" alignItems="center" justify="center" style={{ minHeight: '80vh' }} >
        <Grid container item className={classes2.paper}>
          {/* <Box className={classes2.wrapper}> */}
          {/* <Grid item xs={3} className={classes2.paper}> */}
          {/* <Paper className={classes2.paper}> */}
          <Grid item xs={12} className={classes2.position}>
            {currentPage}
          </Grid>
          {/* </Paper> */}
          {/* </Grid> */}
          {/* </Box > */}
        </Grid>

      </Grid>

      {buttons}
    </div >
  );
}

export default BuyTicketsSecondPageDumb;
