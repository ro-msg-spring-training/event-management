import React, { Component } from 'react';
import { useStyles } from '../../../../styles/CommonStyles';
import { Button, Grid, Typography, TextField } from '@material-ui/core';
import { userBuyTicketsStyle } from '../../../../styles/UserBuyTicketsStyle';

interface NamesStepProps {
  nextStep: () => void,
  prevStep: () => void,
  handleEnterKey: (e: any) => void,
  handleStepperChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

function NamesStep({ nextStep, prevStep, handleEnterKey, handleStepperChange }: NamesStepProps) {
  const buttonClass = useStyles();
  const classes = userBuyTicketsStyle();

  const ticketArr = [
    { title: "VIP", sold: 3, remaining: 2 },
    { title: "Standard", sold: 5, remaining: 3 },
  ]

  let inputs = [];
  for (let i = 0; i < ticketArr.length; i++) {
    for (let j = 0; j < ticketArr[i].remaining; j++) {
      inputs.push(
        <Grid item xs={10} sm={10} md={10} lg={10} xl={10} key={ticketArr[i].title + "#" + j}>
          <TextField
            className={classes.position}
            onKeyDown={handleEnterKey}
            type="number"
            name={ticketArr[i].title + "#" + j}
            fullWidth
            label={ticketArr[i].title + " #" + j}
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
      <Typography className={classes.typography}>Input the names of the people whom are to use the tickets</Typography>
      <Grid container direction="row" justify="center" alignItems="center">
        { inputs }
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