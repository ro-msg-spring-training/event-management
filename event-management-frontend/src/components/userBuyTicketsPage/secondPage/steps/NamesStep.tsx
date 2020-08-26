import React, { Component } from 'react';
import { useStyles } from '../../../../styles/CommonStyles';
import { Button, Grid, Typography, TextField, Paper } from '@material-ui/core';
import { userBuyTicketsStyle } from '../../../../styles/UserBuyTicketsStyle';
import { TicketAvailabilityData } from '../../../../model/TicketAvailabilityData';

interface TicketsPerCateory {
  category: string,
  quantity: number
}

interface NamesStepProps {
  nextStep: () => void,
  prevStep: () => void,
  handleEnterKey: (e: any) => void,
  handleStepperChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  ticketCategories: TicketAvailabilityData[],
  ticketAmount: TicketsPerCateory[],
}

function NamesStep({ nextStep, prevStep, handleEnterKey, handleStepperChange, ticketCategories, ticketAmount }: NamesStepProps) {
  const buttonClass = useStyles();
  const classes = userBuyTicketsStyle();

  console.log("Final ticket amount: ", ticketAmount);

  let inputs = [];
  for (let i = 0; i < ticketAmount.length; i++) {
    for (let j = 0; j < ticketAmount[i].quantity; j++) {
      inputs.push(
        <Grid item xs={12} key={ticketAmount[i].category + "#" + j}>
          <TextField
            className={classes.position}
            onKeyDown={handleEnterKey}
            type="number"
            name={ticketAmount[i].category + "#" + j}
            fullWidth
            label={ticketAmount[i].category + " #" + Number(j + 1)}
            variant="outlined"
            onChange={handleStepperChange}
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