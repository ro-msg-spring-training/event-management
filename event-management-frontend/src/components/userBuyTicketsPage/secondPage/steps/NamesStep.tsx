import React from 'react';
import { useStyles } from '../../../../styles/CommonStyles';
import { Button, Grid } from '@material-ui/core';

interface NamesStepProps {
  nextStep: () => void,
  prevStep: () => void,
}

function NamesStep({ nextStep, prevStep }: NamesStepProps) {
  const classes = useStyles();
  return (
    <>
      <h1>Names Step (3)</h1>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={4} sm={3} md={2} lg={1} xl={1}>
          <Button variant="contained" className={`${classes.buttonStyle2} ${classes.buttonStyle3}`} onClick={prevStep}> PREV </Button>
        </Grid>

        <Grid item xs={4} sm={3} md={2} lg={1} xl={1}>
          <Button variant="contained" className={`${classes.buttonStyle2} ${classes.buttonStyle3}`} onClick={nextStep}> NEXT </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default NamesStep;