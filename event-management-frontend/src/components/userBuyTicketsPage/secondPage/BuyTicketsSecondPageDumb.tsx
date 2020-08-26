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

interface BuyTicketsSecondPageDumbProps {
  gotoFirstPage: () => void,
  gotoEventListPage: () => void,
  ticketCategories: TicketAvailabilityData[],
}

function BuyTicketsSecondPageDumb({ gotoFirstPage, gotoEventListPage, ticketCategories }: BuyTicketsSecondPageDumbProps) {
  const [step, setStep] = useState(1);
  const [ticketAmount, setTicketAmount] = useState<TicketsPerCateory[]>([]);
  // const [booking, setBooking] = useState<Booking>();
  const [checked, setChecked] = useState(false);

  let initialTicketState: TicketsPerCateory[] = [];
  useEffect(() => {
    ticketCategories.map((ticket) => initialTicketState.push({ category: ticket.title, quantity: 0 }))
    setTicketAmount(initialTicketState);

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
        />
      break;
    case 2:
      currentPage =
        <EmailStep
          nextStep={nextStep}
          prevStep={prevStep}
          handleEnterKey={handleEnterKey}
          handleStepperChange={handleStepperChange}
        />
      break;
    case 3:
      currentPage =
        <NamesStep
          nextStep={nextStep}
          prevStep={prevStep}
          handleEnterKey={handleEnterKey}
          handleStepperChange={handleStepperChange}
          ticketCategories={ticketCategories}
          ticketAmount={ticketAmount}
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