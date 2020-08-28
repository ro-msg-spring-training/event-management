import React from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { useStyles } from '../../../../../styles/CommonStyles';
import { userBuyTicketsStyle } from '../../../../../styles/UserBuyTicketsStyle';
import HelpIcon from '@material-ui/icons/Help';
import { HtmlTooltip } from '../../../../../styles/BuyTicketsSecondPageStyle';

interface TicketsStepDumbProps {
  nextStep: () => void,
  inputs: JSX.Element[],
}

function TicketsStepDumb({ nextStep, inputs }: TicketsStepDumbProps) {
  const buttonClass = useStyles();
  const classes = userBuyTicketsStyle();

  return (
    <>
      <HtmlTooltip
        className={classes.alignHelpIcon}
        title={
          <>
            {"Please choose the desired number of tickets from the categories you desire"}
          </>
        }
      >
        <HelpIcon color="primary" fontSize="small" />
      </HtmlTooltip>

      <Typography className={classes.typography} align="center">Number of tickets</Typography>

      <Grid container justify="center" alignItems="center">

        {inputs}

        <Grid item container direction="row" justify="center" alignItems="center" className={classes.button}>
          <Grid item xs={4} sm={3} md={2} lg={1} xl={1} />
          <Grid item xs={4} sm={3} md={2} lg={1} xl={1} >
            <Button variant="contained" className={`${buttonClass.buttonStyle2} ${buttonClass.buttonStyle3} ${classes.buttonPosition}`} onClick={nextStep}> NEXT </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default TicketsStepDumb;