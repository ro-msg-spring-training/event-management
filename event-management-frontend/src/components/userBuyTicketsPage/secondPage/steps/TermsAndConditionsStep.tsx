import React from 'react';
import { useStyles } from '../../../../styles/CommonStyles';
import { Button, Grid, TextField, makeStyles } from '@material-ui/core';

interface TermsAndConditionsStepProps {
  prevStep: () => void,
}

function TermsAndConditionsStep({ prevStep }: TermsAndConditionsStepProps) {
  const buttonClass = useStyles();
  return (
    <>
      <h1>Terms Step (4)</h1>

      <Grid item container direction="row" justify="center" alignItems="center">
        <Grid item xs={4} sm={3} md={2} lg={1} xl={1}>
          <Button variant="contained" className={`${buttonClass.buttonStyle2} ${buttonClass.buttonStyle3}`} onClick={prevStep}> PREV </Button>
        </Grid>
        <Grid item xs={4} sm={3} md={2} lg={1} xl={1} />
      </Grid>
    </>
  );
};

export default TermsAndConditionsStep;