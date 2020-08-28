import React from 'react';
import { useStyles } from '../../../../../styles/CommonStyles';
import { Button, Grid, Typography } from '@material-ui/core';
import { userBuyTicketsStyle } from '../../../../../styles/UserBuyTicketsStyle';
import BuyTicketsPopupSmart from './popup/BuyTicketsPopupSmart'

interface TermsAndConditionsStepDumbProps {
  prevStep: () => void,
  checked: boolean,
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handleEventBuyTickets: () => void,
  open: boolean,
  setOpen: (open: boolean) => void,
  handleProceedToBuy: () => void,
}

function TermsAndConditionsStepDumb({ prevStep, checked, handleCheckboxChange, handleEventBuyTickets, open, setOpen, handleProceedToBuy }: TermsAndConditionsStepDumbProps) {
  const buttonClass = useStyles();
  const classes = userBuyTicketsStyle();

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

      <BuyTicketsPopupSmart
        open={open}
        setOpen={setOpen}
        checked={checked}
        handleCheckboxChange={handleCheckboxChange}
        handleProceedToBuy={handleProceedToBuy}
      />
    </>
  );
};

export default TermsAndConditionsStepDumb;