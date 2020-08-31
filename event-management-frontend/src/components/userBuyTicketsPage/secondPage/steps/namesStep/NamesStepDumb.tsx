import React from 'react';
import { useStyles } from '../../../../../styles/CommonStyles';
import { Button, Grid, Typography } from '@material-ui/core';
import { userBuyTicketsStyle } from '../../../../../styles/UserBuyTicketsStyle';
import { HtmlTooltip } from '../../../../../styles/BuyTicketsSecondPageStyle';
import HelpIcon from '@material-ui/icons/Help';

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

      <HtmlTooltip
        className={classes.alignHelpIcon}
        title={
          <>
            {
              noTicketsSelected ?
                `You did not choose the desired number of tickets. In order to proceed with the transaction,
                 please return to the Number of Tickets step and choose the desired number of tickets from the categories you prefer` :
                "Please input the names of the people whom are to use the tickets"
            }
          </>
        }
      >
        <HelpIcon color="primary" fontSize="small" />
      </HtmlTooltip>

      {
        noTicketsSelected ?
          <Typography className={classes.typography} align="center" >There have not been any tickets selected.</Typography> :
          <Typography className={classes.typography} align="center" >Names on the Tickets</Typography>
      }

      <Grid container direction="row" justify="center" alignItems="center">

        {/*  */}
        <Grid item xs={12} container justify="center" alignItems="center" className={classes.gridStyle}>
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