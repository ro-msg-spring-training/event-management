import React from 'react';
import { useStyles } from '../../../../../styles/CommonStyles';
import { Button, Grid, Typography } from '@material-ui/core';
import { userBuyTicketsStyle } from '../../../../../styles/UserBuyTicketsStyle';

interface NamesStepPropsDumb {
  noTicketsSelected: boolean,
  nextStep: () => void,
  prevStep: () => void,
  inputs: JSX.Element[],
}

function NamesStepDumb({ noTicketsSelected, nextStep, prevStep, inputs }: NamesStepPropsDumb) {
  const buttonClass = useStyles();
  const classes = userBuyTicketsStyle();

  return (
    <>
      {
        noTicketsSelected ?
          <Typography className={classes.typography} align="center" >There have not been any tickets selected.</Typography> :
          <Typography className={classes.typography} align="center" >Input the names of the people whom are to use the tickets</Typography>
      }
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

export default NamesStepDumb;