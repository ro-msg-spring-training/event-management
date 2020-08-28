import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadTicketCategories, addBookings, updateBookings, updateTicketAmount, updateTicketNames, updateChecked } from '../../../actions/TicketReservationActions';
import { TicketAvailabilityData } from '../../../model/TicketAvailabilityData';
import { Container, CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import BuyTicketsSecondPageDumb from './BuyTicketsSecondPageDumb';
import Booking from '../../../model/Booking';
import { TicketsPerCateory, TicketNames } from '../../../model/UserReserveTicket';

interface BuyTicketsSecondPageSmartProps {
  match: any,
  fetchedData: {
    isError: boolean,
    isLoading: boolean,
  },
  ticketCategories: TicketAvailabilityData[],
  fetchTicketCategories: (idEvent: string) => void,
  addBookings: (booking: Booking) => void,

  updateBookings: (booking: Booking) => void,
  booking: Booking,

  updateTicketAmount: (ticketAmount: TicketsPerCateory[]) => void,
  ticketAmount: TicketsPerCateory[],

  updateTicketNames: (ticketAmount: TicketNames[]) => void,
  ticketNames: TicketNames[],

  updateChecked: (checked: boolean) => void,
  checked: boolean,
}

const handleEnterKey = (e: any): void => { e.keyCode === 13 && e.preventDefault(); }

function BuyTicketsSecondPageSmart({ match, fetchedData, ticketCategories, fetchTicketCategories, addBookings,
  booking, updateBookings, updateTicketAmount, ticketAmount, updateTicketNames, ticketNames, updateChecked, checked }: BuyTicketsSecondPageSmartProps) {

  const [step, setStep] = useState(1);
  const history = useHistory();

  // Proceed to next step
  const nextStep = () => { setStep(step + 1); };

  // Go back to prev step
  const prevStep = () => { setStep(step - 1); };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    updateChecked(e.target.checked);
  };

  const handleTicketsStepChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const index = ticketCategories.findIndex(ticket => ticket.title === name)
    ticketCategories[index].remaining >= Number(value) ?
      updateTicketAmount(ticketAmount.map(item => (item.category === name ? { ...item, 'quantity': Number(value) } : item))) :
      console.log("Error not that many tickets in stock");
  }

  const handleEmailStepChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    let newBooking = { ...booking };
    newBooking.email = value;
    updateBookings(newBooking);
  }

  const handleNameStepChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    //VIP_0 => ticketData[0] = VIP; ticketData[1] = 0
    let ticketData = name.split("_");

    //find the ticket category and its names array
    let ticketToUpdate = ticketNames.find(ticket => (ticket.ticketTitle === ticketData[0]));

    //set the new value to the specified position in the names array
    ticketToUpdate!.names[Number(ticketData[1])] = value;

    let ticketNamesCopy = [...ticketNames];
    let index = ticketNames.findIndex(ticket => (ticket.ticketTitle === ticketData[0]))
    let replacedTicket = { ...ticketNamesCopy[index] }
    replacedTicket = ticketToUpdate as TicketNames;
    ticketNamesCopy[index] = replacedTicket;
    updateTicketNames(ticketNamesCopy);
  }

  const gotoFirstPage = (): void => {
    history.push(`user/reserve-tickets/first-page/${match.params.id}`);
  }

  const gotoEventListPage = (): void => {
    //TODO redirect to events list
    history.push(`user/events`);
  }

  useEffect(() => {
    fetchTicketCategories(match.params.id)
  }, [match.params.id])

  if (fetchedData.isLoading) {
    return (
      <Container maxWidth="lg">
        <CircularProgress />
      </Container>
    );
  } else if (fetchedData.isError) {
    return (
      <h1>An error has occured</h1>
    );
  }

  return (
    <div className="wrapper">
      <BuyTicketsSecondPageDumb
        gotoFirstPage={gotoFirstPage}
        gotoEventListPage={gotoEventListPage}
        ticketCategories={ticketCategories}
        eventId={match.params.id}
        booking={booking}

        updateBookings={updateBookings}
        addBookings={addBookings}

        updateTicketAmount={updateTicketAmount}
        ticketAmount={ticketAmount}

        updateTicketNames={updateTicketNames}
        ticketNames={ticketNames}

        updateChecked={updateChecked}
        checked={checked}

        step={step}

        nextStep={nextStep}
        prevStep={prevStep}
        handleEnterKey={handleEnterKey}
        handleTicketsStepChange={handleTicketsStepChange}
        handleEmailStepChange={handleEmailStepChange}
        handleNameStepChange={handleNameStepChange}
        handleCheckboxChange={handleCheckboxChange}
      />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    fetchedData: state.ticketCategories,
    booking: state.ticketCategories.booking,
    ticketCategories: state.ticketCategories.ticketCategory,

    ticketAmount: state.ticketCategories.ticketAmount,
    ticketNames: state.ticketCategories.ticketNames,
    checked: state.ticketCategories.checked,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchTicketCategories: (idEvent: string) => dispatch(loadTicketCategories(idEvent)),
    addBookings: (booking: Booking) => dispatch(addBookings(booking)),

    updateBookings: (booking: Booking) => dispatch(updateBookings(booking)),
    updateTicketAmount: (ticketAmount: TicketsPerCateory[]) => dispatch(updateTicketAmount(ticketAmount)),
    updateTicketNames: (ticketNames: TicketNames[]) => dispatch(updateTicketNames(ticketNames)),
    updateChecked: (checked: boolean) => dispatch(updateChecked(checked)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuyTicketsSecondPageSmart);

//TODO
//validations
//number of tickets left for that event => max number of tickets available for purchase in the first card
//internationalizare
