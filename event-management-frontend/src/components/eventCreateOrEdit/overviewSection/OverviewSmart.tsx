import React, {  useEffect } from 'react';
import OverviewDumb from './OverviewDumb';
import { EventCrud } from '../../model/EventCrud';

interface EventObjectProps {
  title: string,
  subtitle: string,
  description: string,
  startDate: string,
  startTime: string,
  endDate: string,
  endTime: string,
  maxPeople: number,
  formErrors: {
    title: string,
    subtitle: string,
    description: string,
    startDate: string,
    endDate: string,
    startTime: string,
    endTime: string,
    maxPeople: string,
  }
}

interface CheckboxProps {
  highlighted: boolean
}

interface EventProps {
  newEvent: boolean,
  event: EventCrud,
  admin: boolean,
  finalEventOverview: EventObjectProps,
  setFinalEventOverview: any,
  statusOverview: string,
  setStatusOverview: any,
  checkBoxStateOverview: CheckboxProps,
  setCheckboxStateOverview: any,
  setOpen: any,
  setMsgUndo: any,
  setDialogTitle: any,
  setDialogDescription: any,
}

function OverviewSmart(props: EventProps) {
  let today = new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0]
  const dateAndTime = today.split("T");
  const currDate = dateAndTime[0];
  const currTime = dateAndTime[1];

  const updateFields = (): void => {
    //TODO set new event with old event
    props.setFinalEventOverview({
      ...props.finalEventOverview,
      title: props.event.title,
      subtitle: props.event.subtitle,
      description: props.event.description,
    });
  }

  //TODO get rid of useEffect warning
  //----------------------------------------------if we come from /users/:id => first instantiate the event 
  useEffect(() => {
    if (props.newEvent === false) updateFields();
  }, [])

  const handleChangeCheckboxState = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setCheckboxStateOverview({ ...props.checkBoxStateOverview, [event.target.name]: event.target.checked });
  };

  const compareDates = function (date1: Date, date2: Date) {
    if (date1 > date2) return 1;
    else if (date1 < date2) return -1;
    else return 0;
  }

  const handleChange = (e: any): void => {
    e.preventDefault();
    const { name, value } = e.target;

    // TODO asta modifica field-urile din event, trebe facut pt toate care nu sunt in errorForms
    props.setFinalEventOverview((prevEvent: any) => {
      let newEvent = Object.assign({}, prevEvent);
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
          newEvent.startTime = value;
          break;
        case "endDate":
          newEvent.endDate = value;
          break;
        case "endTime":
          newEvent.endTime = value;
          break;
        case "maxPeople":
          newEvent.maxPeople = value;
          break;
        default:
          break;
      }

      return newEvent;
    });

    let formErrors = { ...props.finalEventOverview.formErrors };

    let startDate = new Date(props.finalEventOverview.startDate);
    let endDate = new Date(props.finalEventOverview.endDate);

    switch (name) {
      case "title":
        formErrors.title =
          value.length < 3 ? "minimum 3 characters required" : "";
        break;
      case "subtitle":
        formErrors.subtitle =
          value.length < 3 ? "minimum 3 characters required" : "";
        break;
      case "description":
        formErrors.description =
          value.length < 3 ? "minimum 3 characters required" : "";
        break;
      case "startDate":
        let start = new Date(value);
        formErrors.startDate = compareDates(new Date(currDate), start) === 1 ? "start date must be in the future" : ""
        break;
      case "endDate":
        let end = new Date(value);
        formErrors.endDate = compareDates(end, startDate) === -1 ? "end date must be after start date" : ""
        break;
      case "startTime":
        formErrors.startTime = compareDates(startDate, endDate) === 0 ? "if the event takes place in a single day, you need to select the end time after start time" : ""
        break;
      case "endTime":
        formErrors.endTime = compareDates(startDate, endDate) === 0 ? "if the event takes place in a single day, you need to select the end time after start time" : ""
        break;
      case "maxPeople":
        formErrors.maxPeople =
          Number(value) < 2 ? "minimum of 2 people required" : "";
        break;
      default:
        break;
    }

    props.setFinalEventOverview((prevEvent: any) => {
      let newEvent = Object.assign({}, prevEvent);
      newEvent.formErrors = formErrors;
      return newEvent;
    });

    console.log(props.finalEventOverview.formErrors)
  };

  const handleEnterKey = (e: any): void => {
    if (e.keyCode === 13) {
      e.preventDefault();
      console.log("ENTER");
    }
  }

  //TODO get rid of all console.logs
  return (
    <>
      <OverviewDumb
        newEvent={props.newEvent}
        event={props.event}
        admin={props.admin}
        handleEnterKey={handleEnterKey}
        handleChange={handleChange}
        formErrors={props.finalEventOverview.formErrors}
        highlighted={props.checkBoxStateOverview.highlighted}
        handleChangeCheckboxState={handleChangeCheckboxState}
        setStatus={props.setStatusOverview}
        // handleSubmit={handleSubmit}
        status={props.statusOverview}
        currDate={currDate}
        currTime={currTime}
      />
    </>
  );
}

export default OverviewSmart;
