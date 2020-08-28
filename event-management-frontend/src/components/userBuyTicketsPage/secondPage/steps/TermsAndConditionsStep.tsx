import React, { useState, useEffect } from 'react';
import { useStyles } from '../../../../styles/CommonStyles';
import { Button, Grid, Typography } from '@material-ui/core';
import { userBuyTicketsStyle } from '../../../../styles/UserBuyTicketsStyle';
import BuyTicketsPopup from '../BuyTicketsPopup';
import Booking from '../../../../model/Booking';
import Ticket from '../../../../model/Ticket';
import { TicketNames } from '../../../../model/UserReserveTicket';

interface TermsAndConditionsStepProps {
  prevStep: () => void,
  checked: boolean,
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  booking: Booking,
  setBooking: (booking: Booking) => void,
  ticketNames: TicketNames[],
  setChecked: (e: boolean) => void,
  addBookings: (booking: Booking) => void,
}

function TermsAndConditionsStep({ prevStep, checked, handleCheckboxChange, booking, setBooking, ticketNames, setChecked, addBookings }: TermsAndConditionsStepProps) {
  const [open, setOpen] = useState(false);
  const buttonClass = useStyles();
  const classes = userBuyTicketsStyle();

  useEffect(() => {
    setChecked(false);
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
    setBooking(newBooking);
  }, []);

  const handleProceedToBuy = (): void => {
    checked && addBookings(booking)
  }

  return (
    <>
      <Typography className={classes.typography} align="center">Terms and Conditions</Typography>
      <Grid item container direction="row" justify="center" alignItems="center">
        <Button variant="contained" className={`${buttonClass.buttonStyle2} ${buttonClass.buttonStyle3}`} onClick={handleEventBuyTickets}> BUY TICKETS </Button>

        <Grid item container direction="row" justify="center" alignItems="center" className={classes.button}>
          <Grid item xs={4} sm={3} md={2} lg={1} xl={1}>
            <Button variant="contained" className={`${buttonClass.buttonStyle2} ${buttonClass.buttonStyle3} ${classes.buttonPosition}`} onClick={prevStep}> PREV </Button>
          </Grid>
          <Grid item xs={4} sm={3} md={2} lg={1} xl={1} />
        </Grid>
      </Grid>

      <BuyTicketsPopup
        open={open}
        setOpen={setOpen}
        checked={checked}
        handleCheckboxChange={handleCheckboxChange}
        handleProceedToBuy={handleProceedToBuy}
      />
    </>
  );
};

export default TermsAndConditionsStep;