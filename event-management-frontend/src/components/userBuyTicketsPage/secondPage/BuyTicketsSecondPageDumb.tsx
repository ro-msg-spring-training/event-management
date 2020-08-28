import React, { useState, useEffect } from 'react';
import TicketsStep from './steps/TicketsStep';
import EmailStep from './steps/EmailStep';
import NamesStep from './steps/NamesStep';
import TermsAndConditionsStep from './steps/TermsAndConditionsStep';
import Booking from '../../../model/Booking';
import { Tooltip, IconButton, makeStyles, Theme } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import CloseIcon from '@material-ui/icons/Close';
import { TicketAvailabilityData } from '../../../model/TicketAvailabilityData';

const BuyTicketsSecondPageDumbStyle = makeStyles((theme: Theme) => ({
  prevButtonStyle: {
    color: theme.palette.secondary.light,
    transform: 'rotate(-180deg)',
  },
  cancelButtonStyle: {
    color: theme.palette.secondary.contrastText,
    transform: 'rotate(-180deg)',
  },
  positionLeft: {
    position: 'absolute',
    bottom: "0.5%",
    left: "0.5%",
  },
  positionRight: {
    position: 'absolute',
    bottom: "0.5%",
    right: "0.5%",
  }
}))

interface TicketsPerCateory {
  category: string,
  quantity: number
}

interface TicketNames {
  ticketTitle: string,
  names: string[],
}

interface BuyTicketsSecondPageDumbProps {
  gotoFirstPage: () => void,
  gotoEventListPage: () => void,
  ticketCategories: TicketAvailabilityData[],
  eventId: number | string,
}

const initialBooking = {
  bookingDate: "",
  eventId: "",
  email: "",
  tickets: []
}

function BuyTicketsSecondPageDumb({ gotoFirstPage, gotoEventListPage, ticketCategories, eventId }: BuyTicketsSecondPageDumbProps) {
  const [step, setStep] = useState(1);
  const [ticketAmount, setTicketAmount] = useState<TicketsPerCateory[]>([]);
  const [ticketNames, setTicketNames] = useState<TicketNames[]>([]);
  const [booking, setBooking] = useState<Booking>(initialBooking);
  const [checked, setChecked] = useState(false);

  let today = new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0]
  const dateAndTime = today.split("T");
  const currDate = dateAndTime[0];

  let initialTicketState: TicketsPerCateory[] = [];
  useEffect(() => {
    ticketCategories.map((ticket) => initialTicketState.push({ category: ticket.title, quantity: 0 }))
    setTicketAmount(initialTicketState);

    let oldBooking = { ...booking };
    oldBooking.eventId = eventId;
    oldBooking.bookingDate = currDate;
    setBooking(oldBooking);

    // ticketCategories.map((ticket) => initialTicketNames.push({ ticketTitle: ticket.title, names: [] }))
    // setTicketNames(initialTicketNames);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const classes = BuyTicketsSecondPageDumbStyle();

  // Proceed to next step
  const nextStep = () => { setStep(step + 1); };

  // Go back to prev step
  const prevStep = () => { setStep(step - 1); };

  // // Handle fields change
  // const handleChange = (input) => (e) => {
  //   setState({ [input]: e.target.value });
  // };

  const handleEnterKey = (e: any): void => { e.keyCode === 13 && e.preventDefault(); }

  const handleStepperChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

  }

  const handleTicketsStepChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const index = ticketCategories.findIndex(ticket => ticket.title === name)
    ticketCategories[index].remaining >= Number(value) ?
      setTicketAmount(ticketAmount.map(item => (item.category === name ? { ...item, 'quantity': Number(value) } : item))) :
      console.log("Error not that many tickets in stock");
  }
  console.log("ticketAmount", ticketAmount);

  const handleEmailStepChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    let newBooking = { ...booking };
    newBooking.email = value;
    setBooking(newBooking);
  }

  const handleNameStepChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    console.log(name, " ", value);
    console.log(ticketNames);

    //VIP_0 => ticketData[0] = VIP; ticketData[1] = 0
    let ticketData = name.split("_");

    //find the ticket category and its names array
    let ticketToUpdate = ticketNames.find(ticket => (ticket.ticketTitle === ticketData[0]));

    //set the new value to the specified position in the names array
    ticketToUpdate!.names[Number(ticketData[1])] = value;

    console.log(ticketToUpdate);

    let ticketNamesCopy = [...ticketNames];
    let index = ticketNames.findIndex(ticket => (ticket.ticketTitle === ticketData[0]))
    let replacedTicket = { ...ticketNamesCopy[index] }
    replacedTicket = ticketToUpdate as TicketNames;
    ticketNamesCopy[index] = replacedTicket;
    setTicketNames(ticketNamesCopy);

    console.log("FINAL TICKET NAMES: ", ticketNames);
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

  console.log("BOOKING: ", booking);

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
          setTicketNames={setTicketNames}
        />
      break;
    case 4:
      currentPage =
        <TermsAndConditionsStep
          prevStep={prevStep}
          checked={checked}
          handleCheckboxChange={handleCheckboxChange}
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