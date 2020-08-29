import React, { useEffect } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { userBuyTicketsStyle } from '../../../../../styles/UserBuyTicketsStyle';
import { TicketsPerCateory, TicketNames } from '../../../../../model/UserReserveTicket';
import TicketsStepDumb from './TicketsStepDumb'
import { connect } from 'react-redux';
import { updateTicketsStepFormErrors } from '../../../../../actions/TicketReservationActions';
import { TicketsStepFormErrors, TicketAvailabilityData } from '../../../../../model/BuyTicketsSecondPage';

interface TicketsStepSmartProps {
  nextStep: () => void,
  handleEnterKey: (e: any) => void,
  updateTicketAmount: (ticketAmount: TicketsPerCateory[]) => void,
  ticketCategories: TicketAvailabilityData[],
  ticketAmount: TicketsPerCateory[],

  updateTicketNames: (ticketAmount: TicketNames[]) => void,

  ticketsStepFormErrors: TicketsStepFormErrors[],
  updateTicketsStepFormErrors: (ticketsStepFormErrors: TicketsStepFormErrors[]) => void,
}

const initializeFormErrors = (ticketsStepFormErrors: TicketsStepFormErrors[], ticketCategories: TicketAvailabilityData[]): TicketsStepFormErrors[] => {
  ticketCategories.forEach(ticket => {
    ticketsStepFormErrors.find(item => item.ticketCategoryTitle === ticket.title) === undefined &&
      ticketsStepFormErrors.push({ ticketCategoryTitle: ticket.title, error: "" });
  });

  return ticketsStepFormErrors;
}

const updateErrorsLocally = (ticketsStepFormErrors: TicketsStepFormErrors[], name: string, message: string,
  updateTicketsStepFormErrors: (ticketsStepFormErrors: TicketsStepFormErrors[]) => void): void => {
  let index = ticketsStepFormErrors.findIndex(error => error.ticketCategoryTitle === name);
  ticketsStepFormErrors[index].error = message;
  updateTicketsStepFormErrors(ticketsStepFormErrors);
}

function TicketsStepSmart({ nextStep, handleEnterKey, updateTicketAmount, ticketCategories, ticketAmount, updateTicketNames,
  ticketsStepFormErrors, updateTicketsStepFormErrors }: TicketsStepSmartProps) {
  const classes = userBuyTicketsStyle();

  ticketsStepFormErrors = initializeFormErrors(ticketsStepFormErrors, ticketCategories);
  useEffect(() => {
    //initialize form errors for TicketsStep
    updateTicketsStepFormErrors(ticketsStepFormErrors);
  }, [])

  const handleTicketsStepChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const index = ticketCategories.findIndex(ticket => ticket.title === name)
    const remaining = ticketCategories[index].remaining;
    const category = ticketCategories[index].title;

    updateTicketNames([]);

    //check for errors
    if (Number(value) < 0) {
      updateErrorsLocally(ticketsStepFormErrors, name, "Wrong input", updateTicketsStepFormErrors);
    } else if (remaining < Number(value)) {
      updateErrorsLocally(ticketsStepFormErrors, name, `There are only ${remaining} tickets left in ${category}`, updateTicketsStepFormErrors);
    } else {
      updateTicketAmount(ticketAmount.map(item => (item.category === name ? { ...item, 'quantity': Number(value) } : item)))
      updateErrorsLocally(ticketsStepFormErrors, name, "", updateTicketsStepFormErrors);
    }
  }

  let inputs: JSX.Element[] = [];
  for (let i = 0; i < ticketCategories.length; i++) {
    const currError = ticketsStepFormErrors.find(error => error.ticketCategoryTitle === ticketCategories[i].title)!.error;
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
          error={currError.length > 0}
          helperText={currError}
          InputProps={{ inputProps: { min: 0 } }}
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

const mapStateToProps = (state: any) => {
  return {
    ticketsStepFormErrors: state.ticketCategories.ticketsStepFormErrors,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateTicketsStepFormErrors: (ticketsStepFormErrors: TicketsStepFormErrors[]) => dispatch(updateTicketsStepFormErrors(ticketsStepFormErrors)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketsStepSmart);
