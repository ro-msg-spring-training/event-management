import React from "react";
import { AppState } from "../../../../store/store";
import { connect } from "react-redux";
import CategoryPageDumb from "./CategoryPageDumb";
import { EventCrud } from "../../../../model/EventCrud";
import { addEmptyCategoryCard, updateEvent, updateFormErrors } from "../../../../actions/HeaderEventCrudActions";
import { EventFormErrors } from "../../../../model/EventFormErrors";

interface Props {
  newEvent: boolean;
  event: EventCrud;
  formErrors: EventFormErrors;
  addEmptyCategoryCard: () => void;
  updateEvent: (event: EventCrud) => void;
  updateFormErrors: (errors: EventFormErrors) => void;
}

const CategoryPageSmart: React.FC<Props> = (props: Props) => {
  const handleChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    // update event
    let newEvent = Object.assign({}, props.event);

    switch (name) {
      case "ticketsPerUser":
        newEvent.ticketsPerUser = parseInt(value);
        break;
      default:
        break;
    }
    props.updateEvent(newEvent);

    let newFormErrors = Object.assign({}, props.formErrors);

    switch (name) {
      case "ticketsPerUser":
        newFormErrors.ticketsPerUser = value <= 0 ? "Add more people!" : "";
        break;
      default:
        break;
    }

    props.updateFormErrors(newFormErrors);
  };

  return (
    <CategoryPageDumb
      newEvent={props.newEvent}
      event={props.event}
      formErrors={props.formErrors}
      addCard={props.addEmptyCategoryCard}
      handleChange={handleChange}
    />
  );
};

const mapStateToProps = (state: AppState) => ({
  event: state.eventCrud.event,
  formErrors: state.eventCrud.formErrors,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    addEmptyCategoryCard: () => dispatch(addEmptyCategoryCard()),
    updateEvent: (event: EventCrud) => dispatch(updateEvent(event)),
    updateFormErrors: (errors: EventFormErrors) => dispatch(updateFormErrors(errors)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPageSmart);
