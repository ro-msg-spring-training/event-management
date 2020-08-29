import React, { useState, useEffect } from 'react';
import Booking from '../../../../../model/Booking';
import Ticket from '../../../../../model/Ticket';
import { TicketNames } from '../../../../../model/UserReserveTicket';
import TermsAndConditionsDumb from './TermsAndConditionsStepDumb';
import { useHistory } from 'react-router-dom';

interface TermsAndConditionsStepSmartProps {
  prevStep: () => void,
  checked: boolean,
  booking: Booking,
  ticketNames: TicketNames[],
  addBookings: (booking: Booking) => void,
  updateBookings: (booking: Booking) => void,
  updateChecked: (checked: boolean) => void,
}

function TermsAndConditionsStepSmart({ prevStep, checked, booking, updateBookings, ticketNames, updateChecked, addBookings }: TermsAndConditionsStepSmartProps) {
  const [open, setOpen] = useState(false);
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

    console.log("TICKET NAMES: ", ticketNames);
    ticketNames.map(category => {
      category.names.map(currName => { newArr.push({ ticketCategoryTitle: category.ticketTitle, name: currName }); });
    });

    newBooking.tickets = newArr;
    updateBookings(newBooking);
  }, []);

  const handleProceedToBuy = (): void => {
    // checked && addBookings(booking)
    if (checked) {
      addBookings(booking);
      history.push('user/events');
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    updateChecked(e.target.checked);
  };

  return (
    <TermsAndConditionsDumb
      prevStep={prevStep}
      checked={checked}
      handleCheckboxChange={handleCheckboxChange}
      handleEventBuyTickets={handleEventBuyTickets}
      open={open}
      setOpen={setOpen}
      handleProceedToBuy={handleProceedToBuy}
    />
  );
};

export default TermsAndConditionsStepSmart;