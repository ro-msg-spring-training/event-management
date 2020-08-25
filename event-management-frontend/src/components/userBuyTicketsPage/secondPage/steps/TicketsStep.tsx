import React from 'react';
import { Button, Grid, TextField, makeStyles, Theme, Typography } from '@material-ui/core';
import { useStyles } from '../../../../styles/CommonStyles';
import { userBuyTicketsStyle } from '../../../../styles/UserBuyTicketsStyle';
import "../../secondPage/BuyTicketsStepper.css"

interface TicketsStepProps {
  nextStep: () => void,
  handleEnterKey: (e: any) => void,
  handleStepperChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

function TicketsStep({ nextStep, handleEnterKey, handleStepperChange }: TicketsStepProps) {
  const buttonClass = useStyles();
  const classes = userBuyTicketsStyle();

  return (
    // <div
    // style={{
    //     position: 'absolute', left: '50%', top: '50%',
    //     transform: 'translate(-50%, -50%)'
    // }}
    // >
    <div className="form-wrapper">
      <Typography className={classes.typography}>Choose the number of tickets</Typography>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
          <TextField
            className={classes.position}
            onKeyDown={handleEnterKey}
            type="number"
            name="VIP"
            fullWidth
            label="VIP"
            variant="outlined"
            onChange={handleStepperChange}
            // error={formErrors.title.length > 0}
            // helperText={formErrors.title}
            required />
        </Grid>

        <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
          <TextField
            className={classes.position}
            onKeyDown={handleEnterKey}
            type="number"
            name="Standard"
            fullWidth
            label="Standard"
            variant="outlined"
            onChange={handleStepperChange}
            // error={formErrors.title.length > 0}
            // helperText={formErrors.title}
            required />
        </Grid>

        <Grid item container direction="row" justify="center" alignItems="center" className={classes.button}>
          <Grid item xs={4} sm={3} md={2} lg={1} xl={1} />
          <Grid item xs={4} sm={3} md={2} lg={1} xl={1} >
            <Button variant="contained" className={`${buttonClass.buttonStyle2} ${buttonClass.buttonStyle3}`} onClick={nextStep}> NEXT </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default TicketsStep;