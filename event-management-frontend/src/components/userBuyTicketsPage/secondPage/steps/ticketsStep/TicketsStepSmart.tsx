import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import { userBuyTicketsStyle } from '../../../../../styles/UserBuyTicketsStyle';
import { TicketAvailabilityData } from '../../../../../model/TicketAvailabilityData';
import { TicketsPerCateory, TicketNames } from '../../../../../model/UserReserveTicket';
import TicketsStepDumb from './TicketsStepDumb'

interface TicketsStepSmartProps {
  nextStep: () => void,
  handleEnterKey: (e: any) => void,
  updateTicketAmount: (ticketAmount: TicketsPerCateory[]) => void,
  ticketCategories: TicketAvailabilityData[],
  ticketAmount: TicketsPerCateory[],

  updateTicketNames: (ticketAmount: TicketNames[]) => void,
}

function TicketsStepSmart({ nextStep, handleEnterKey, updateTicketAmount, ticketCategories, ticketAmount, updateTicketNames }: TicketsStepSmartProps) {
  const classes = userBuyTicketsStyle();

  const handleTicketsStepChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    updateTicketNames([]);
    const index = ticketCategories.findIndex(ticket => ticket.title === name)
    ticketCategories[index].remaining >= Number(value) ?
      updateTicketAmount(ticketAmount.map(item => (item.category === name ? { ...item, 'quantity': Number(value) } : item))) :
      console.log("Error not that many tickets in stock");
  }

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


// interface FormErrors {
//   ticketCategoryTitle: string,
//   error: string
// }

// const initializeFormErrors = (ticketsStepFormErrors: FormErrors[], ticketCategories: TicketAvailabilityData[]): FormErrors[] => {
//   ticketCategories.forEach(ticket => {
//     ticketsStepFormErrors.find(item => item.ticketCategoryTitle === ticket.title) === undefined &&
//       ticketsStepFormErrors.push({ ticketCategoryTitle: ticket.title, error: "" });
//   });

//   return ticketsStepFormErrors;
// }