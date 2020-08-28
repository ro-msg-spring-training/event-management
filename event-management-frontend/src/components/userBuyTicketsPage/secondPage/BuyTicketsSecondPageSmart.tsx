import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadTicketCategories, addBookings, updateBookings, updateTicketAmount, updateTicketNames } from '../../../actions/TicketReservationActions';
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
}

function BuyTicketsSecondPageSmart({ match, fetchedData, ticketCategories, fetchTicketCategories, addBookings,
  booking, updateBookings, updateTicketAmount, ticketAmount, updateTicketNames, ticketNames }: BuyTicketsSecondPageSmartProps) {
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
        ticketCategories={ticketCategories}
        eventId={match.params.id}
        booking={booking}

        updateBookings={updateBookings}
        addBookings={addBookings}

        updateTicketAmount={updateTicketAmount}
        ticketAmount={ticketAmount}

        updateTicketNames={updateTicketNames}
        ticketNames={ticketNames}
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
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchTicketCategories: (idEvent: string) => dispatch(loadTicketCategories(idEvent)),
    addBookings: (booking: Booking) => dispatch(addBookings(booking)),

    updateBookings: (booking: Booking) => dispatch(updateBookings(booking)),
    updateTicketAmount: (ticketAmount: TicketsPerCateory[]) => dispatch(updateTicketAmount(ticketAmount)),
    updateTicketNames: (ticketNames: TicketNames[]) => dispatch(updateTicketNames(ticketNames)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuyTicketsSecondPageSmart);

//TODO
//validations
//number of tickets left for that event => max number of tickets available for purchase in the first card
//internationalizare
