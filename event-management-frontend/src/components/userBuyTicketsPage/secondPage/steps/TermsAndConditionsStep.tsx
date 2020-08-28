import React, { useState, useEffect } from 'react';
import { useStyles } from '../../../../styles/CommonStyles';
import { Button, Grid, TextField, makeStyles, Typography } from '@material-ui/core';
import { userBuyTicketsStyle } from '../../../../styles/UserBuyTicketsStyle';
import BuyTicketsPopup from '../BuyTicketsPopup';
import Booking from '../../../../model/Booking';
import Ticket from '../../../../model/Ticket';

interface TicketNames {
  ticketTitle: string,
  names: string[],
}

interface TermsAndConditionsStepProps {
  prevStep: () => void,
  checked: boolean,
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  booking: Booking,
  setBooking: (booking: Booking) => void,
  ticketNames: TicketNames[],
}

function TermsAndConditionsStep({ prevStep, checked, handleCheckboxChange, booking, setBooking, ticketNames }: TermsAndConditionsStepProps) {
  const [open, setOpen] = useState(false);
  const buttonClass = useStyles();
  const classes = userBuyTicketsStyle();

  let handleEventBuyTickets = (): void => {
    setOpen(true);
  }

  let initialTicket: Ticket = { name: "", ticketCategoryTitle: "" };

  useEffect(() => {
    let newBooking = { ...booking };
    let newArr: Ticket[] = [];

    ticketNames.map(category => {
      category.names.map(currName => { newArr.push({ ticketCategoryTitle: category.ticketTitle, name: currName }); });
    });

    newBooking.tickets = newArr;
    setBooking(newBooking);
  }, []);

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
      />
    </>
  );
};

export default TermsAndConditionsStep;