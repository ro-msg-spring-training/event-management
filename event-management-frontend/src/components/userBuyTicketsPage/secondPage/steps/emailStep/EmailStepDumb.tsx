import React from 'react';
import { useStyles } from '../../../../../styles/CommonStyles';
import { Button, Grid, Typography, TextField } from '@material-ui/core';
import { userBuyTicketsStyle } from '../../../../../styles/UserBuyTicketsStyle';
import { EmailStepFormErrors } from '../../../../../model/BuyTicketsSecondPage';

interface EmailStepDumbProps {
  nextStep: () => void,
  prevStep: () => void,
  handleEnterKey: (e: any) => void,
  email: string,

  handleEmailStepChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  emailFormErrors: EmailStepFormErrors,
}

function EmailStepDumb({ nextStep, prevStep, handleEnterKey, email, handleEmailStepChange, emailFormErrors }: EmailStepDumbProps) {
  const buttonClass = useStyles();
  const classes = userBuyTicketsStyle();

  return (
    <>
      <Typography className={classes.typography} align="center">Please type in your email address</Typography>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
          <TextField
            className={classes.position}
            onKeyDown={handleEnterKey}
            name="Email"
            fullWidth
            defaultValue={email}
            label="Email"
            variant="outlined"
            onChange={handleEmailStepChange}
            error={emailFormErrors.error.length > 0}
            helperText={emailFormErrors.error}
          />
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

export default EmailStepDumb;