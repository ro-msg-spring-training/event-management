import React from 'react';
import { Button, Grid, TextField, makeStyles, Theme } from '@material-ui/core';
import { useStyles } from '../../../../styles/CommonStyles';

const useStylesTermsAndConditions = makeStyles((theme: Theme) => ({
  position: {
    margin: "1%"
  }
}));

interface TicketsStepProps {
  nextStep: () => void,
  handleEnterKey: (e: any) => void,
  handleStepperChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

function TicketsStep({ nextStep, handleEnterKey, handleStepperChange }: TicketsStepProps) {
  const buttonClass = useStyles();
  const classes = useStylesTermsAndConditions();

  return (
    <>
      <h1>Tickets Step (1)</h1>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
          <TextField
            className={classes.position}
            onKeyDown={handleEnterKey}
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
            name="Standard"
            fullWidth
            label="Standard"
            variant="outlined"
            onChange={handleStepperChange}
            // error={formErrors.title.length > 0}
            // helperText={formErrors.title}
            required />
        </Grid>

        <Grid item container direction="row" justify="center" alignItems="center">
          <Grid item xs={4} sm={3} md={2} lg={1} xl={1} />
          <Grid item xs={4} sm={3} md={2} lg={1} xl={1}>
            <Button variant="contained" className={`${buttonClass.buttonStyle2} ${buttonClass.buttonStyle3}`} onClick={nextStep}> NEXT </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default TicketsStep;