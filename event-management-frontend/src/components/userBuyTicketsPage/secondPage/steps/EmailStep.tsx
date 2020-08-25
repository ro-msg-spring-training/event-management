import React from 'react';
import { useStyles } from '../../../../styles/CommonStyles';
import { Button, Grid } from '@material-ui/core';
import { userBuyTicketsStyle } from '../../../../styles/UserBuyTicketsStyle';

interface EmailStepProps {
  nextStep: () => void,
  prevStep: () => void,
}

function EmailStep({ nextStep, prevStep }: EmailStepProps) {
  const buttonClass = useStyles();
  const classes = userBuyTicketsStyle();
  
  return (
    <>
      <h1>Email Step (2)</h1>
      <Grid container direction="row" justify="center" alignItems="center" className={classes.button}>
        <Grid item xs={4} sm={3} md={2} lg={1} xl={1}>
          <Button variant="contained" className={`${buttonClass.buttonStyle2} ${buttonClass.buttonStyle3}`} onClick={prevStep}> PREV </Button>
        </Grid>

        <Grid item xs={4} sm={3} md={2} lg={1} xl={1}>
          <Button variant="contained" className={`${buttonClass.buttonStyle2} ${buttonClass.buttonStyle3}`} onClick={nextStep}> NEXT </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default EmailStep;