import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadTicketCategories, addBookings } from '../../../actions/TicketReservationActions';
import { TicketAvailabilityData } from '../../../model/TicketAvailabilityData';
import { Container, CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import BuyTicketsSecondPageDumb from './BuyTicketsSecondPageDumb';
import Booking from '../../../model/Booking';
import { TicketsPerCateory, TicketNames } from '../../../model/UserReserveTicket';

interface BuyTicketsSecondPageSmartProps {
  match: any,
  fetchedData: {
    ticketCategory: TicketAvailabilityData[],
    isError: boolean,
    isLoading: boolean,
  },
  fetchTicketCategories: (idEvent: string) => void,
  addBookings: (booking: Booking) => void,
  ticketCategories: TicketAvailabilityData[],
}

const initialBooking = {
  bookingDate: "",
  eventId: "",
  email: "",
  tickets: []
}

function BuyTicketsSecondPageSmart({ match, fetchedData, fetchTicketCategories, addBookings, ticketCategories }: BuyTicketsSecondPageSmartProps) {

  const [step, setStep] = useState(1);
  const [ticketAmount, setTicketAmount] = useState<TicketsPerCateory[]>([]);
  const [checked, setChecked] = useState(false);
  //ticketNames has this structure so wehn the user modifies a name text field I know where to apply the change 
  const [ticketNames, setTicketNames] = useState<TicketNames[]>([]);

  let today = new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0]

  let initialTicketState: TicketsPerCateory[] = [];
  useEffect(() => {
    ticketCategories.map((ticket) => initialTicketState.push({ category: ticket.title, quantity: 0 }))
    setTicketAmount(initialTicketState);

    let oldBooking = { ...booking };
    oldBooking.eventId = Number(match.params.id);
    oldBooking.bookingDate = today;
    setBooking(oldBooking);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setChecked(event.target.checked);
  };


  // Proceed to next step
  const nextStep = () => { setStep(step + 1); };

  // Go back to prev step
  const prevStep = () => { setStep(step - 1); };

  const handleEnterKey = (e: any): void => { e.keyCode === 13 && e.preventDefault(); }

  const handleTicketsStepChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const index = ticketCategories.findIndex(ticket => ticket.title === name)
    ticketCategories[index].remaining >= Number(value) ?
      setTicketAmount(ticketAmount.map(item => (item.category === name ? { ...item, 'quantity': Number(value) } : item))) :
      console.log("Error not that many tickets in stock");
  }

  const handleEmailStepChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    let newBooking = { ...booking };
    newBooking.email = value;
    setBooking(newBooking);
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
    setTicketNames(ticketNamesCopy);
  }

  const [booking, setBooking] = useState<Booking>(initialBooking);
  const history = useHistory();

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
        ticketCategories={fetchedData.ticketCategory}
        booking={booking}
        setBooking={setBooking}
        addBookings={addBookings}
        step={step}
        prevStep={prevStep}
        nextStep={nextStep}
        handleEnterKey={handleEnterKey}
        handleTicketsStepChange={handleTicketsStepChange}
        ticketAmount={ticketAmount}
        handleEmailStepChange={handleEmailStepChange}
        handleNameStepChange={handleNameStepChange}
        ticketNames={ticketNames}
        setTicketNames={setTicketNames}
        checked={checked}
        handleCheckboxChange={handleCheckboxChange}
        setChecked={setChecked}
      />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    fetchedData: state.ticketCategories,
    ticketCategories: state.ticketCategories.ticketCategory
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchTicketCategories: (idEvent: string) => dispatch(loadTicketCategories(idEvent)),
    addBookings: (booking: Booking) => dispatch(addBookings(booking)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuyTicketsSecondPageSmart);

//TODO
//number of tickets left for that event => max number of tickets available for purchase in the first card
//redux pt state
//internationalizare