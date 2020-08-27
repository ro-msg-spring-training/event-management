import React, { Component, useEffect } from 'react';
import { useStyles } from '../../../../styles/CommonStyles';
import { Button, Grid, Typography, TextField, Paper } from '@material-ui/core';
import { userBuyTicketsStyle } from '../../../../styles/UserBuyTicketsStyle';
import { TicketAvailabilityData } from '../../../../model/TicketAvailabilityData';

interface TicketsPerCateory {
  category: string,
  quantity: number
}

interface TicketNames {
  ticketTitle: string,
  names: string[],
}

interface NamesStepProps {
  nextStep: () => void,
  prevStep: () => void,
  handleEnterKey: (e: any) => void,
  handleNameStepChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  ticketAmount: TicketsPerCateory[],
  ticketNames: TicketNames[],
  setTicketNames: (ticketNames: TicketNames[]) => void,
}


let initialTicketNames: TicketNames[] = [];

const createFields = (ticket: TicketsPerCateory): TicketNames => {
  let newField: TicketNames = { ticketTitle: ticket.category, names: new Array(ticket.quantity).fill("") };
  return newField;
}

function NamesStep({ nextStep, prevStep, handleEnterKey, handleNameStepChange, ticketAmount, ticketNames, setTicketNames }: NamesStepProps) {
  const buttonClass = useStyles();
  const classes = userBuyTicketsStyle();

  useEffect(() => {
    let ticketArr = ticketAmount.filter(ticket => ticket.quantity !== 0)
    console.log("ticketArr ", ticketArr);
    ticketArr.length !== 0 && ticketArr.map(ticket => (initialTicketNames.push(createFields(ticket))))
    setTicketNames(initialTicketNames);
  }, [])

  console.log("FINAL TICKET NAMES ", ticketNames);

  let inputs:JSX.Element[] = [];
  for (let i = 0; i < ticketAmount.length; i++) {
    for (let j = 0; j < ticketAmount[i].quantity; j++) {
      inputs.push(
        <Grid item xs={12} key={ticketAmount[i].category + "#" + j}>
          <TextField
            className={classes.position}
            onKeyDown={handleEnterKey}
            type="text"
            name={ticketAmount[i].category + "_" + j}
            id={ticketAmount[i].category + "_" + j}
            fullWidth
            label={ticketAmount[i].category + " #" + Number(j + 1)}
            variant="outlined"
            onChange={handleNameStepChange}
          // error={formErrors.title.length > 0}
          // helperText={formErrors.title}
          />
        </Grid >
      );
    }
  }


  return (
    <>
      <Typography className={classes.typography} align="center" >Input the names of the people whom are to use the tickets</Typography>
      <Grid container direction="row" justify="center" alignItems="center">

        <Grid item xs={10} container justify="center" alignItems="center" className={classes.gridStyle}>
          {inputs}
        </Grid>

        <Grid item container direction="row" justify="center" alignItems="center" className={classes.button}>
          <Grid item xs={4} sm={3} md={2} lg={1} xl={1}>
            <Button variant="contained" className={`${buttonClass.buttonStyle2} ${buttonClass.buttonStyle3} ${classes.buttonPosition}`} onClick={prevStep}> PREV </Button>
          </Grid>

          <Grid item xs={4} sm={3} md={2} lg={1} xl={1}>
            <Button variant="contained" className={`${buttonClass.buttonStyle2} ${buttonClass.buttonStyle3} ${classes.buttonPosition}`} onClick={nextStep}> NEXT </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default NamesStep;