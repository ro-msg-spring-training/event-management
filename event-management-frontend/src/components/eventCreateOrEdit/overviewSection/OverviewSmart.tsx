import React, { useEffect } from 'react';
import OverviewDumb from './OverviewDumb';
import { EventCrud } from '../../../model/EventCrud';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { EventFormErrors } from '../../../model/EventFormErrors';
import { updateFormErrors, updateEvent } from '../../../actions/HeaderEventCrudActions';
import { FormErrors } from '../../loginRegisterPages/FormErrors';

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

interface OverviewSmartProps {
  newEvent: boolean,
  event: EventCrud,
  admin: boolean,
  finalEventOverview: EventObjectProps,
  setFinalEventOverview: any,
  statusOverview: string,
  setStatusOverview: any,
  checkBoxStateOverview: boolean,
  setCheckboxStateOverview: any,
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
  const currTime = dateAndTime[1];

  const updateFields = (): void => { props.setFinalEventOverview(props.event) }

  const updateDateAndTime = (): void => {
    props.setFinalEventOverview((prevEvent: any) => {
      let newEvent = Object.assign({}, prevEvent);
      newEvent.startDate = currDate;
      newEvent.endDate = currDate;
      newEvent.startTime = currTime;
      newEvent.endTime = currTime;
      return newEvent;
    });
  }

  useEffect(() => {
    props.newEvent === false ? updateFields() : updateDateAndTime()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChangeCheckboxState = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setCheckboxStateOverview(event.target.checked);
  };

  const compareDates = (date_1: string, date_2: string): number => {
    let date1 = new Date(date_1);
    let date2 = new Date(date_2);

    if (date1 > date2) return 1;
    else if (date1 < date2) return -1;
    else return 0;
  }

  const compareTimes = (time1: string, time2: string): number => {
    if (time1 > time2) return 1;
    else if (time1 < time2) return -1;
    else return 0;
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

  // const handleChange = (e: any): void => {
  //   e.preventDefault();
  //   const { name, value } = e.target;

  //   props.setFinalEventOverview((prevEvent: any) => {
  //     let newEvent = Object.assign({}, prevEvent);
  //     switch (name) {
  //       case "title":
  //         newEvent.title = value;
  //         break;
  //       case "subtitle":
  //         newEvent.subtitle = value;
  //         break;
  //       case "description":
  //         newEvent.description = value;
  //         break;
  //       case "startDate":
  //         newEvent.startDate = value;
  //         break;
  //       case "startTime":
  //         newEvent.startTime = value;
  //         break;
  //       case "endDate":
  //         newEvent.endDate = value;
  //         break;
  //       case "endTime":
  //         newEvent.endTime = value;
  //         break;
  //       case "maxPeople":
  //         newEvent.maxPeople = value;
  //         break;
  //       default:
  //         break;
  //     }
  //     props.updateEvent(newEvent)
  //     return newEvent;
  //   });

  //   let formErrors = { ...props.finalEventOverview.formErrors };

  //   let startDate = props.finalEventOverview.startDate;
  //   let endDate = props.finalEventOverview.endDate;
  //   let startTime = props.finalEventOverview.startTime;
  //   let endTime = props.finalEventOverview.endTime;

  //   switch (name) {
  //     case "title":
  //       formErrors.title =
  //         value.length < 3 ? t("welcome.errMsgOverviewMinCharacters") : "";
  //       break;

  //     case "subtitle":
  //       formErrors.subtitle =
  //         value.length < 3 ? t("welcome.errMsgOverviewMinCharacters") : "";
  //       break;

  //     case "description":
  //       formErrors.description =
  //         value.length < 3 ? t("welcome.errMsgOverviewMinCharacters") : "";
  //       break;

  //     case "startDate":
  //       formErrors.startDate = ""
  //       formErrors.endDate = ""
  //       formErrors.startTime = ""
  //       formErrors.endTime = ""

  //       formErrors.startDate =
  //         (compareDates(value, currDate) === -1) ?
  //           (t("welcome.errMsgOverviewFirstDayInPast")) :
  //           (compareDates(value, endDate) === 1 ?
  //             t("welcome.errMsgOverviewFirstDayAfterLast") : "")

  //       formErrors.startTime =
  //         (compareDates(value, endDate) === 0) ?
  //           (
  //             (compareTimes(startTime, endTime) !== -1) ?
  //               (t("welcome.errMsgOverviewOneDayEventStartTimeErr")) : ""
  //           ) : ""

  //       formErrors.endTime =
  //         (compareDates(value, endDate) === 0) ?
  //           (
  //             (compareTimes(startTime, endTime) !== -1) ?
  //               (t("welcome.errMsgOverviewOneDayEventEndTimeErr")) : ""
  //           ) : ""

  //       break;

  //     case "endDate":
  //       formErrors.startDate = ""
  //       formErrors.endDate = ""
  //       formErrors.startTime = ""
  //       formErrors.endTime = ""

  //       formErrors.endDate =
  //         (compareDates(startDate, value) === 1) ?
  //           (t("welcome.errMsgOverviewLastDayBeforeFirst")) : ""

  //       formErrors.startDate =
  //         (compareDates(startDate, currDate) === -1) ?
  //           (t("welcome.errMsgOverviewFirstDayInPast")) :
  //           (compareDates(startDate, value) === 1 ?
  //             t("welcome.errMsgOverviewFirstDayAfterLast") : "")

  //       formErrors.startTime =
  //         (compareDates(startDate, value) === 0) ?
  //           (
  //             (compareTimes(startTime, endTime) !== -1) ?
  //               (t("welcome.errMsgOverviewOneDayEventStartTimeErr")) : ""
  //           ) : ""

  //       formErrors.endTime =
  //         (compareDates(startDate, value) === 0) ?
  //           (
  //             (compareTimes(startTime, endTime) !== -1) ?
  //               (t("welcome.errMsgOverviewOneDayEventEndTimeErr")) : ""
  //           ) : ""

  //       break;

  //     case "startTime":
  //       formErrors.startDate = ""
  //       formErrors.endDate = ""
  //       formErrors.startTime = ""
  //       formErrors.endTime = ""

  //       formErrors.startTime =
  //         (compareDates(startDate, endDate) === 0) ?
  //           (
  //             (compareTimes(value, endTime) !== -1) ?
  //               (t("welcome.errMsgOverviewOneDayEventStartTimeErr")) : ""
  //           ) : ""

  //       formErrors.startDate =
  //         (compareDates(startDate, currDate) === -1) ?
  //           (t("welcome.errMsgOverviewFirstDayInPast")) :
  //           (compareDates(startDate, endDate) === 1 ?
  //             t("welcome.errMsgOverviewFirstDayAfterLast") : "")

  //       formErrors.endTime =
  //         (compareDates(startDate, endDate) === 0) ?
  //           (
  //             (compareTimes(value, endTime) !== -1) ?
  //               (t("welcome.errMsgOverviewOneDayEventEndTimeErr")) : ""
  //           ) : ""

  //       break;

  //     case "endTime":
  //       formErrors.startDate = ""
  //       formErrors.endDate = ""
  //       formErrors.startTime = ""
  //       formErrors.endTime = ""

  //       formErrors.endTime =
  //         (compareDates(startDate, endDate) === 0) ?
  //           (
  //             (compareTimes(startTime, value) !== -1) ?
  //               (t("welcome.errMsgOverviewOneDayEventEndTimeErr")) : ""
  //           ) : ""

  //       formErrors.startDate =
  //         (compareDates(startDate, currDate) === -1) ?
  //           (t("welcome.errMsgOverviewFirstDayInPast")) :
  //           (compareDates(startDate, endDate) === 1 ?
  //             t("welcome.errMsgOverviewFirstDayAfterLast") : "")

  //       formErrors.startTime =
  //         (compareDates(startDate, endDate) === 0) ?
  //           (
  //             (compareTimes(startTime, value) !== -1) ?
  //               (t("welcome.errMsgOverviewOneDayEventStartTimeErr")) : ""
  //           ) : ""

  //       break;

  //     case "maxPeople":
  //       formErrors.maxPeople =
  //         Number(value) < 2 ? t("welcome.errMsgOverviewMaxPpl") : "";
  //       break;


  //     default:
  //       break;
  //   }

  //   props.setFinalEventOverview((prevEvent: any) => {
  //     let newEvent = Object.assign({}, prevEvent);
  //     newEvent.formErrors = formErrors;
  //     return newEvent;
  //   });


  //   props.updateFormErrors(formErrors)
  // };

  const handleEnterKey = (e: any): void => { e.keyCode === 13 && e.preventDefault(); }
  console.log("forrrrrrrm errrrrrrors smart", props.formErrors)

  return (
    <>
      <OverviewDumb
        newEvent={props.newEvent}
        event={props.eventCrud}
        // event={props.event}
        admin={props.admin}
        handleEnterKey={handleEnterKey}
        handleChange={handleChange}
        formErrors={props.formErrors}
        //formErrors={props.finalEventOverview.formErrors}
        highlighted={props.checkBoxStateOverview}
        handleChangeCheckboxState={handleChangeCheckboxState}
        setStatus={props.setStatusOverview}
        status={props.statusOverview}
        currDate={currDate}
        currTime={currTime}
      />
    </>
  );
}

const mapStateToProps = ({ eventCrud }: any) => {
  console.log('stateul', eventCrud)
  return({
  eventCrud: eventCrud.event,
  formErrors: eventCrud.formErrors,
  error: eventCrud.error
})};

export default connect(
  mapStateToProps,
  { updateFormErrors, updateEvent }
)(OverviewSmart);
