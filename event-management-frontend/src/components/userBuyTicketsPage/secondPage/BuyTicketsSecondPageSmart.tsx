import React from 'react';
import BuyTicketsSecondPageDumb from './BuyTicketsSecondPageDumb';

interface BuyTicketsSecondPageSmartProps {
  match: any,
}

function BuyTicketsSecondPageSmart({ match }: BuyTicketsSecondPageSmartProps) {

  return (
    <>
      <BuyTicketsSecondPageDumb eventId={match.params.id}/>
    </>
  );
};

export default BuyTicketsSecondPageSmart;

//TODO
//fetch event
//get number of tickets available (from all categories)
//number of tickets left for that event => max number of tickets available for purchase in the first card
//for the third card => as many inputs as there were tickets in the first card
//terms and conditions popup from msg terms and conditions
//redux pt post -> '/bookings'
//redux pt state
//internationalizare