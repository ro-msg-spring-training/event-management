import React, { useState } from 'react';
import TicketsStep from './steps/TicketsStep';
import EmailStep from './steps/EmailStep';
import NamesStep from './steps/NamesStep';
import TermsAndConditionsStep from './steps/TermsAndConditionsStep';
import Booking from '../../../model/Booking';
import classes from '*.module.css';
import { Tooltip, IconButton, makeStyles, Theme } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import CloseIcon from '@material-ui/icons/Close';

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


interface BuyTicketsSecondPageDumbProps {
  gotoFirstPage: any,
  gotoEventListPage: any
}

function BuyTicketsSecondPageDumb({ gotoFirstPage, gotoEventListPage, }: BuyTicketsSecondPageDumbProps) {
  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState<Booking>();
  const classes = BuyTicketsSecondPageDumbStyle();

  // Proceed to next step
  const nextStep = () => { setStep(step + 1); };

  // Go back to prev step
  const prevStep = () => { setStep(step - 1); };

  // // Handle fields change
  // const handleChange = (input) => (e) => {
  //   setState({ [input]: e.target.value });
  // };

  // // const { step } = state;
  // const { firstName, lastName, email, occupation, city, bio } = state;
  // const values = { firstName, lastName, email, occupation, city, bio };
  const handleEnterKey = (e: any): void => { e.keyCode === 13 && e.preventDefault(); }

  const handleStepperChange = (e: React.ChangeEvent<HTMLInputElement>): void => {

  }

  const [checked, setChecked] = useState(false);
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

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
          handleStepperChange={handleStepperChange}
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