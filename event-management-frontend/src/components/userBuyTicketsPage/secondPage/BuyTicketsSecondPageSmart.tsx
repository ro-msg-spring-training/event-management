import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadTicketCategories } from '../../../actions/TicketReservationActions';
import { TicketAvailabilityData } from '../../../model/TicketAvailabilityData';
import { Container, CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import BuyTicketsSecondPageDumb from './BuyTicketsSecondPageDumb';

interface BuyTicketsSecondPageSmartProps {
  match: any,
  fetchedData: {
    ticketCategory: TicketAvailabilityData[],
    isError: boolean,
    isLoading: boolean,
  },
  fetchTicketCategories: (idEvent: string) => void,
}

function BuyTicketsSecondPageSmart({ match, fetchedData, fetchTicketCategories }: BuyTicketsSecondPageSmartProps) {
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
      />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    fetchedData: state.ticketCategories,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchTicketCategories: (idEvent: string) => dispatch(loadTicketCategories(idEvent)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuyTicketsSecondPageSmart);

//TODO
//number of tickets left for that event => max number of tickets available for purchase in the first card
//for the third card => as many inputs as there were tickets in the first card
//redux pt post -> '/bookings'
//redux pt state
//internationalizare