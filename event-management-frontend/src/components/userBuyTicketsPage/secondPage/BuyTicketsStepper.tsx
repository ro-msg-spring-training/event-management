import React, { useState } from 'react';
import TicketsStep from './steps/TicketsStep';
import EmailStep from './steps/EmailStep';
import NamesStep from './steps/NamesStep';
import TermsAndConditionsStep from './steps/TermsAndConditionsStep';
import Booking from '../../../model/Booking';

function BuyTicketsStepper() {
  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState<Booking>();

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

  switch (step) {
    case 1:
      return (
        <TicketsStep
          nextStep={nextStep}
          handleEnterKey={handleEnterKey}
          handleStepperChange={handleStepperChange}
        />
      );
    case 2:
      return (
        <EmailStep
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );
    case 3:
      return (
        <NamesStep
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );
    case 4:
      return (
        <TermsAndConditionsStep
          prevStep={prevStep}
        />
      );
    default:
      (console.log('Wrong step'))
  }

  return (
    <></>
  );
}

export default BuyTicketsStepper;