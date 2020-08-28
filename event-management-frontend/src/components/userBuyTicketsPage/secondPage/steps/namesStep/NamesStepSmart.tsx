import React, { useEffect } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { userBuyTicketsStyle } from '../../../../../styles/UserBuyTicketsStyle';
import { TicketsPerCateory, TicketNames } from '../../../../../model/UserReserveTicket';
import NamesStepDumb from './NamesStepDumb';

interface NamesStepProps {
  nextStep: () => void,
  prevStep: () => void,
  handleEnterKey: (e: any) => void,
  handleNameStepChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  ticketAmount: TicketsPerCateory[],
  ticketNames: TicketNames[],
  // setTicketNames: (ticketNames: TicketNames[]) => void,

  updateTicketNames: (ticketAmount: TicketNames[]) => void,
}

const createFields = (initialTicketNames: TicketNames[], ticket: TicketsPerCateory): TicketNames[] => {
  let newField: TicketNames = { ticketTitle: ticket.category, names: new Array(ticket.quantity).fill("") };
  (initialTicketNames.find(item => item.ticketTitle === ticket.category) === undefined) && initialTicketNames.push(newField);
  return initialTicketNames;
}

function NamesStepSmart({ nextStep, prevStep, handleEnterKey, handleNameStepChange, ticketAmount, ticketNames, updateTicketNames }: NamesStepProps) {
  const classes = userBuyTicketsStyle();

  useEffect(() => {
    let initialTicketNames: TicketNames[] = ticketNames;
    let ticketArr = ticketAmount.filter(ticket => ticket.quantity !== 0)
    ticketArr.length !== 0 && ticketArr.map(ticket => (initialTicketNames = createFields(initialTicketNames, ticket)))
    updateTicketNames(initialTicketNames);
  }, [])

  let inputs: JSX.Element[] = [];
  for (let i = 0; i < ticketAmount.length; i++) {
    for (let j = 0; j < ticketAmount[i].quantity; j++) {
      inputs.push(
        <Grid item xs={12} key={ticketAmount[i].category + "#" + j}>
          <TextField
            className={classes.position}
            onKeyDown={handleEnterKey}
            type="text"
            name={ticketAmount[i].category + "_" + j}
            id={ticketAmount[i].category + "_" + j}
            fullWidth
            defaultValue={ticketNames.find(ticket => ticket.ticketTitle === ticketAmount[i].category)?.names[j]}
            label={ticketAmount[i].category + " #" + Number(j + 1)}
            variant="outlined"
            onChange={handleNameStepChange}
          // error={formErrors.title.length > 0}
          // helperText={formErrors.title}
          />
        </Grid >
      );
    }
  }

  return (
    <NamesStepDumb
      nextStep={nextStep}
      prevStep={prevStep}
      inputs={inputs}
    />
  );
};

export default NamesStepSmart;