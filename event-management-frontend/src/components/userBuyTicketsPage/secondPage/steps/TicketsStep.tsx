import React, { useEffect } from 'react';
import { Button, Grid, TextField, makeStyles, Theme, Typography, Tooltip, IconButton, withStyles } from '@material-ui/core';
import { useStyles } from '../../../../styles/CommonStyles';
import { userBuyTicketsStyle } from '../../../../styles/UserBuyTicketsStyle';
import { TicketAvailabilityData } from '../../../../model/TicketAvailabilityData';
import HelpIcon from '@material-ui/icons/Help';

interface TicketsPerCateory {
  category: string,
  quantity: number
}

interface TicketsStepProps {
  nextStep: () => void,
  handleEnterKey: (e: any) => void,
  handleTicketsStepChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  ticketCategories: TicketAvailabilityData[],
  ticketAmount: TicketsPerCateory[],
}

const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

function TicketsStep({ nextStep, handleEnterKey, handleTicketsStepChange, ticketCategories, ticketAmount }: TicketsStepProps) {
  const buttonClass = useStyles();
  const classes = userBuyTicketsStyle();

  console.log("CAT ", ticketCategories);
  console.log("AMT ", ticketAmount);

  let inputs = [];
  for (let i = 0; i < ticketCategories.length; i++) {
    inputs.push(
      <Grid item xs={10} sm={10} md={10} lg={10} xl={10} key={ticketCategories[i].title}>
        <TextField
          className={classes.position}
          onKeyDown={handleEnterKey}
          type="number"
          name={ticketCategories[i].title}
          fullWidth
          defaultValue={ticketAmount.find(ticket => ticket.category === ticketCategories[i].title)?.quantity}
          label={ticketCategories[i].title}
          variant="outlined"
          onChange={handleTicketsStepChange}
        // error={formErrors.title.length > 0}
        // helperText={formErrors.title}
        />
      </Grid >
    );
  }

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

export default TicketsStep;