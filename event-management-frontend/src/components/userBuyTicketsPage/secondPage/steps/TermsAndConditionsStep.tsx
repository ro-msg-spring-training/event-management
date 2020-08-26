import React, { useState } from 'react';
import { useStyles } from '../../../../styles/CommonStyles';
import { Button, Grid, TextField, makeStyles, Typography } from '@material-ui/core';
import { userBuyTicketsStyle } from '../../../../styles/UserBuyTicketsStyle';
import BuyTicketsPopup from '../BuyTicketsPopup';

interface TermsAndConditionsStepProps {
  prevStep: () => void,
  checked: boolean,
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

function TermsAndConditionsStep({ prevStep, checked, handleCheckboxChange }: TermsAndConditionsStepProps) {
  const [open, setOpen] = useState(false);
  const buttonClass = useStyles();
  const classes = userBuyTicketsStyle();

  let handleEventBuyTickets = (): void => {
    setOpen(true);
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
      />
    </>
  );
};

export default TermsAndConditionsStep;