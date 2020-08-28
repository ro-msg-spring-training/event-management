import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import { userBuyTicketsStyle } from '../../../../../styles/UserBuyTicketsStyle';
import { TicketAvailabilityData } from '../../../../../model/TicketAvailabilityData';
import { TicketsPerCateory } from '../../../../../model/UserReserveTicket';
import TicketsStepDumb from './TicketsStepDumb'

interface TicketsStepSmartProps {
  nextStep: () => void,
  handleEnterKey: (e: any) => void,
  handleTicketsStepChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  ticketCategories: TicketAvailabilityData[],
  ticketAmount: TicketsPerCateory[],
}

function TicketsStepSmart({ nextStep, handleEnterKey, handleTicketsStepChange, ticketCategories, ticketAmount }: TicketsStepSmartProps) {
  const classes = userBuyTicketsStyle();

  let inputs: JSX.Element[] = [];
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
    <TicketsStepDumb
      nextStep={nextStep}
      inputs={inputs}
    />
  );
};

export default TicketsStepSmart;