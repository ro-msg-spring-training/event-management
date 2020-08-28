import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadTicketCategories, addBookings, updateBookings } from '../../../actions/TicketReservationActions';
import { TicketAvailabilityData } from '../../../model/TicketAvailabilityData';
import { Container, CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import BuyTicketsSecondPageDumb from './BuyTicketsSecondPageDumb';
import Booking from '../../../model/Booking';

interface BuyTicketsSecondPageSmartProps {
  match: any,
  fetchedData: {
    ticketCategory: TicketAvailabilityData[],
    isError: boolean,
    isLoading: boolean,
  },
  fetchTicketCategories: (idEvent: string) => void,
  addBookings: (booking: Booking) => void,

  updateBookings: (booking: Booking) => void,
  booking: Booking
}

function BuyTicketsSecondPageSmart({ match, fetchedData, fetchTicketCategories, addBookings, booking, updateBookings }: BuyTicketsSecondPageSmartProps) {
  // const [booking, setBooking] = useState<Booking>(initialBooking);
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
        eventId={match.params.id}
        booking={booking}
        // setBooking={setBooking}
        updateBookings={updateBookings}
        addBookings={addBookings}
      />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    fetchedData: state.ticketCategories,
    booking: state.ticketCategories.booking
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchTicketCategories: (idEvent: string) => dispatch(loadTicketCategories(idEvent)),
    addBookings: (booking: Booking) => dispatch(addBookings(booking)),

    updateBookings: (booking: Booking) => dispatch(updateBookings(booking))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuyTicketsSecondPageSmart);

//TODO
//validations
//number of tickets left for that event => max number of tickets available for purchase in the first card
//internationalizare