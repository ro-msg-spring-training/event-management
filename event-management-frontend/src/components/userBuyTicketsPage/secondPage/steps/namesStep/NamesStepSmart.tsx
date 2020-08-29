import React, { useEffect } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { userBuyTicketsStyle } from '../../../../../styles/UserBuyTicketsStyle';
import { TicketsPerCateory, TicketNames } from '../../../../../model/UserReserveTicket';
import NamesStepDumb from './NamesStepDumb';
import { connect } from 'react-redux';
import { NamesStepFormErrors } from '../../../../../model/BuyTicketsSecondPage';
import { updateNamesStepFormErrors } from '../../../../../actions/TicketReservationActions';

interface NamesStepProps {
  nextStep: () => void,
  prevStep: () => void,
  handleEnterKey: (e: any) => void,
  ticketAmount: TicketsPerCateory[],
  ticketNames: TicketNames[],

  updateTicketNames: (ticketAmount: TicketNames[]) => void,

  namesStepFormErrors: NamesStepFormErrors[],
  updateNamesStepFormErrors: (namesStepFormErrors: NamesStepFormErrors[]) => void,
}

const createFields = (initialTicketNames: TicketNames[], ticket: TicketsPerCateory): TicketNames[] => {
  let newField: TicketNames = { ticketTitle: ticket.category, names: new Array(ticket.quantity).fill("") };
  (initialTicketNames.find(item => item.ticketTitle === ticket.category) === undefined) && initialTicketNames.push(newField);
  return initialTicketNames;
}

const initializeNamesFormErrors = (namesStepFormErrors: NamesStepFormErrors[], ticketAmount: TicketsPerCateory[]): NamesStepFormErrors[] => {
  for (let i = 0; i < ticketAmount.length; i++) {
    for (let j = 0; j < ticketAmount[i].quantity; j++) {
      let currTextFieldName = ticketAmount[i].category + "_" + j;
      namesStepFormErrors.find(item => item.textFieldName === currTextFieldName) === undefined &&
        namesStepFormErrors.push({ textFieldName: currTextFieldName, error: "" });
    }
  }
  return namesStepFormErrors;
}

const updateNameErrorsLocally = (namesStepFormErrors: NamesStepFormErrors[], textFieldName: string, message: string,
  updateTicketsStepFormErrors: (namesStepFormErrors: NamesStepFormErrors[]) => void): void => {
  let index = namesStepFormErrors.findIndex(error => error.textFieldName === textFieldName);
  namesStepFormErrors[index].error = message;
  updateTicketsStepFormErrors(namesStepFormErrors);
}

const nameRegex = RegExp(
  /^[-a-zA-Z\s]*$/
);

function NamesStepSmart({ nextStep, prevStep, handleEnterKey, ticketAmount, ticketNames, updateTicketNames, namesStepFormErrors, updateNamesStepFormErrors }: NamesStepProps) {
  const classes = userBuyTicketsStyle();

  console.log("ticketAmount", ticketAmount);

  namesStepFormErrors = initializeNamesFormErrors(namesStepFormErrors, ticketAmount);
  useEffect(() => {
    let initialTicketNames: TicketNames[] = ticketNames;
    let ticketArr = ticketAmount.filter(ticket => ticket.quantity !== 0)
    ticketArr.length !== 0 && ticketArr.map(ticket => (initialTicketNames = createFields(initialTicketNames, ticket)))
    updateTicketNames(initialTicketNames);

    //initialize form errors for NamesStep
    updateNamesStepFormErrors(namesStepFormErrors);
  }, [])

  const handleNameStepChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    //VIP_0 => ticketData[0] = VIP; ticketData[1] = 0
    let ticketData = name.split("_");

    //find the ticket category and its names array
    let ticketToUpdate = ticketNames.find(ticket => (ticket.ticketTitle === ticketData[0]));

    //set the new value to the specified position in the names array
    ticketToUpdate!.names[Number(ticketData[1])] = value;

    //basically update ticketNames with the new ticket
    let ticketNamesCopy = [...ticketNames];
    let index = ticketNames.findIndex(ticket => (ticket.ticketTitle === ticketData[0]))
    let replacedTicket = { ...ticketNamesCopy[index] }
    replacedTicket = ticketToUpdate as TicketNames;
    ticketNamesCopy[index] = replacedTicket;
    updateTicketNames(ticketNamesCopy);

    // check for errors
    nameRegex.test(value) ?
      updateNameErrorsLocally(namesStepFormErrors, name, "", updateNamesStepFormErrors) :
      updateNameErrorsLocally(namesStepFormErrors, name, "Wrong input", updateNamesStepFormErrors)
  }

  let inputs: JSX.Element[] = [];
  for (let i = 0; i < ticketAmount.length; i++) {
    for (let j = 0; j < ticketAmount[i].quantity; j++) {
      let textFieldName = ticketAmount[i].category + "_" + j;
      const currError = namesStepFormErrors.find(nameError => nameError.textFieldName === textFieldName)!.error;
      inputs.push(
        <Grid item xs={12} key={ticketAmount[i].category + "#" + j}>
          <TextField
            className={classes.position}
            onKeyDown={handleEnterKey}
            type="text"
            name={textFieldName}
            id={textFieldName}
            fullWidth
            defaultValue={ticketNames.find(ticket => ticket.ticketTitle === ticketAmount[i].category)?.names[j]}
            label={ticketAmount[i].category + " #" + Number(j + 1)}
            variant="outlined"
            onChange={handleNameStepChange}
            error={currError.length > 0}
            helperText={currError}
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

const mapStateToProps = (state: any) => {
  return {
    ticketAmount: state.ticketCategories.ticketAmount,
    namesStepFormErrors: state.ticketCategories.namesStepFormErrors,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateNamesStepFormErrors: (namesStepFormErrors: NamesStepFormErrors[]) => dispatch(updateNamesStepFormErrors(namesStepFormErrors)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NamesStepSmart);
