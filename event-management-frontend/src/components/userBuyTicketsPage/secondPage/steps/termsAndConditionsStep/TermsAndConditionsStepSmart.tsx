import React, { useState, useEffect } from 'react';
import { useStyles } from '../../../../../styles/CommonStyles';
import { userBuyTicketsStyle } from '../../../../../styles/UserBuyTicketsStyle';
import Booking from '../../../../../model/Booking';
import Ticket from '../../../../../model/Ticket';
import { TicketNames } from '../../../../../model/UserReserveTicket';
import TermsAndConditionsDumb from './TermsAndConditionsStepDumb';
import { useHistory } from 'react-router-dom';

interface TermsAndConditionsStepSmartProps {
  prevStep: () => void,
  checked: boolean,
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  booking: Booking,
  // setBooking: (booking: Booking) => void,
  ticketNames: TicketNames[],
  // setChecked: (e: boolean) => void,
  addBookings: (booking: Booking) => void,

  updateBookings: (booking: Booking) => void,

  updateChecked: (checked: boolean) => void,
}

function TermsAndConditionsStepSmart({ prevStep, checked, handleCheckboxChange, booking, updateBookings, ticketNames, updateChecked, addBookings }: TermsAndConditionsStepSmartProps) {
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