import React from 'react';
import OverviewDumb from './OverviewDumb';
import { EventCrud } from '../../../model/EventCrud';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { EventFormErrors } from '../../../model/EventFormErrors';
import { updateFormErrors, updateEvent } from '../../../actions/HeaderEventCrudActions';
import { compareDates, compareTimes } from '../../../utils/CompareUtilsForOverview';

interface OverviewSmartProps {
  newEvent: boolean,
  admin: boolean,
  setOpen: any,
  setMsgUndo: any,
  setDialogTitle: any,
  setDialogDescription: any,

  eventCrud: EventCrud,
  formErrors: EventFormErrors,
  updateEvent: (event: EventCrud) => void,
  updateFormErrors: (errors: EventFormErrors) => void
}

function OverviewSmart(props: OverviewSmartProps) {
  const { t } = useTranslation();
  let today = new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0]
  const dateAndTime = today.split("T");
  const currDate = dateAndTime[0];

  const handleChangeCheckboxState = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newEvent = Object.assign({}, props.eventCrud);
    newEvent.highlighted = event.target.checked
    props.updateEvent(newEvent)
  };

  const handleChangeStatus = (newStatus: string) => {
    let newEvent = Object.assign({}, props.eventCrud);
    newEvent.status = newStatus === "true"? true: false
    props.updateEvent(newEvent)
  }

  const handleChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;

    // update event
    let newEvent = Object.assign({}, props.eventCrud);

    switch (name) {
      case "title":
        newEvent.title = value;
        break;
      case "subtitle":
        newEvent.subtitle = value;
        break;
      case "description":
        newEvent.description = value;
        break;
      case "startDate":
        newEvent.startDate = value;
        break;
      case "startTime":
        newEvent.startHour = value;
        break;
      case "endDate":
        newEvent.endDate = value;
        break;
      case "endTime":
        newEvent.endHour = value;
        break;
      case "maxPeople":
        newEvent.maxPeople = value;
        break;
      default:
        break;
    }
    props.updateEvent(newEvent)

    // update form errors
    let newFormErrors = Object.assign({}, props.formErrors)

    switch (name) {
      case "title":
        newFormErrors.title =
          value.length < 3 ? t("welcome.errMsgOverviewMinCharacters") : "";
        break;

      case "subtitle":
        newFormErrors.subtitle =
          value.length < 3 ? t("welcome.errMsgOverviewMinCharacters") : "";
        break;

      case "description":
        newFormErrors.description =
          value.length < 3 ? t("welcome.errMsgOverviewMinCharacters") : "";
        break;

      case "startDate":
        newFormErrors.startDate = ""
        newFormErrors.endDate = ""
        newFormErrors.startTime = ""
        newFormErrors.endTime = ""

        newFormErrors.startDate =
          (compareDates(value, currDate) === -1) ?
            (t("welcome.errMsgOverviewFirstDayInPast")) :
            (compareDates(value, props.eventCrud.endDate) === 1 ?
              t("welcome.errMsgOverviewFirstDayAfterLast") : "")

        newFormErrors.startTime =
          (compareDates(value, props.eventCrud.endDate) === 0) ?
            (
              (compareTimes(props.eventCrud.startHour, props.eventCrud.endHour) !== -1) ?
                (t("welcome.errMsgOverviewOneDayEventStartTimeErr")) : ""
            ) : ""

        newFormErrors.endTime =
          (compareDates(value, props.eventCrud.endDate) === 0) ?
            (
              (compareTimes(props.eventCrud.startHour, props.eventCrud.endHour) !== -1) ?
                (t("welcome.errMsgOverviewOneDayEventEndTimeErr")) : ""
            ) : ""

        break;

      case "endDate":
        newFormErrors.startDate = ""
        newFormErrors.endDate = ""
        newFormErrors.startTime = ""
        newFormErrors.endTime = ""

        newFormErrors.endDate =
          (compareDates(props.eventCrud.startDate, value) === 1) ?
            (t("welcome.errMsgOverviewLastDayBeforeFirst")) : ""

        newFormErrors.startDate =
          (compareDates(props.eventCrud.startDate, currDate) === -1) ?
            (t("welcome.errMsgOverviewFirstDayInPast")) :
            (compareDates(props.eventCrud.startDate, value) === 1 ?
              t("welcome.errMsgOverviewFirstDayAfterLast") : "")

        newFormErrors.startTime =
          (compareDates(props.eventCrud.startDate, value) === 0) ?
            (
              (compareTimes(props.eventCrud.startHour, props.eventCrud.endHour) !== -1) ?
                (t("welcome.errMsgOverviewOneDayEventStartTimeErr")) : ""
            ) : ""

        newFormErrors.endTime =
          (compareDates(props.eventCrud.startDate, value) === 0) ?
            (
              (compareTimes(props.eventCrud.startHour, props.eventCrud.endHour) !== -1) ?
                (t("welcome.errMsgOverviewOneDayEventEndTimeErr")) : ""
            ) : ""

        break;

      case "startTime":
        newFormErrors.startDate = ""
        newFormErrors.endDate = ""
        newFormErrors.startTime = ""
        newFormErrors.endTime = ""

        newFormErrors.startTime =
          (compareDates(props.eventCrud.startDate, props.eventCrud.endDate) === 0) ?
            (
              (compareTimes(value, props.eventCrud.endHour) !== -1) ?
                (t("welcome.errMsgOverviewOneDayEventStartTimeErr")) : ""
            ) : ""

        newFormErrors.startDate =
          (compareDates(props.eventCrud.startDate, currDate) === -1) ?
            (t("welcome.errMsgOverviewFirstDayInPast")) :
            (compareDates(props.eventCrud.startDate, props.eventCrud.endDate) === 1 ?
              t("welcome.errMsgOverviewFirstDayAfterLast") : "")

        newFormErrors.endTime =
          (compareDates(props.eventCrud.startDate, props.eventCrud.endDate) === 0) ?
            (
              (compareTimes(value, props.eventCrud.endHour) !== -1) ?
                (t("welcome.errMsgOverviewOneDayEventEndTimeErr")) : ""
            ) : ""

        break;

      case "endTime":
        newFormErrors.startDate = ""
        newFormErrors.endDate = ""
        newFormErrors.startTime = ""
        newFormErrors.endTime = ""

        newFormErrors.endTime =
          (compareDates(props.eventCrud.startDate, props.eventCrud.endDate) === 0) ?
            (
              (compareTimes(props.eventCrud.startHour, value) !== -1) ?
                (t("welcome.errMsgOverviewOneDayEventEndTimeErr")) : ""
            ) : ""

        newFormErrors.startDate =
          (compareDates(props.eventCrud.startDate, currDate) === -1) ?
            (t("welcome.errMsgOverviewFirstDayInPast")) :
            (compareDates(props.eventCrud.startDate, props.eventCrud.endDate) === 1 ?
              t("welcome.errMsgOverviewFirstDayAfterLast") : "")

        newFormErrors.startTime =
          (compareDates(props.eventCrud.startDate, props.eventCrud.endDate) === 0) ?
            (
              (compareTimes(props.eventCrud.startHour, value) !== -1) ?
                (t("welcome.errMsgOverviewOneDayEventStartTimeErr")) : ""
            ) : ""

        break;

      case "maxPeople":
        newFormErrors.maxPeople =
          Number(value) < 2 ? t("welcome.errMsgOverviewMaxPpl") : "";
        break;

      default:
        break;
    }

    props.updateFormErrors(newFormErrors)
  }

  const handleEnterKey = (e: any): void => { e.keyCode === 13 && e.preventDefault(); }

  return (
      <OverviewDumb
        newEvent={props.newEvent}
        event={props.eventCrud}
        admin={props.admin}
        handleEnterKey={handleEnterKey}
        handleChange={handleChange}
        formErrors={props.formErrors}
        handleChangeCheckboxState={handleChangeCheckboxState}
        setStatus={handleChangeStatus}
      />
  );
}

const mapStateToProps = ({ eventCrud }: any) => {
  return({
  eventCrud: eventCrud.event,
  formErrors: eventCrud.formErrors,
  error: eventCrud.error
  })
};

const mapDispatchToProps = (dispatch: any) => { 
  return {
    updateEvent: (event: EventCrud) => dispatch(updateEvent(event)),
    updateFormErrors: (errors: EventFormErrors) => dispatch(updateFormErrors(errors))
  }
}

export default connect( mapStateToProps, mapDispatchToProps)(OverviewSmart);
