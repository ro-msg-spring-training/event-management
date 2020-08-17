import React, { useEffect, useState } from 'react';
import { CircularProgress, Container } from '@material-ui/core';
import { loadEvent, deleteEvent, addEvent } from '../../actions/HeaderEventCrudActions';
import { connect } from 'react-redux';
import Header from './headerEditAndDelete/HeaderCrudSmart';
import Stepper from './Stepper';
import { useHistory } from 'react-router-dom';
import AlertDialog from './AlertDialog';
import Overview from './overviewSection/OverviewSmart';
import Images from '../Images';
import Tickets from '../Tickets';
import Location from '../Location';
import { EventCrud } from '../../model/EventCrud';

const event: EventCrud = {
  id: "",
  title: "",
  subtitle: "",
  status: "",
  highlighted: false,
  description: "",
  observations: "",
  location: "",
  startDate: "",
  endDate: "",
  startTime: "",
  endTime: "",
  maxPeople: 0,
  images: [""],
  maxNoTicketsPerUser: 0,
}

interface Props {
  match: any,
  admin: boolean,
  fetchEventF: (id: string) => void,
  deleteEventF: (id: string) => void,
  addEventF: (event: EventCrud) => void,
  fetchEvent: {
    loading: boolean,
    event: EventCrud,
    error: string
  },
}

const initialEventOverview = {
  title: "",
  subtitle: "",
  description: "",
  startDate: "",
  startTime: "",
  endDate: "",
  endTime: "",
  maxPeople: 0,
  formErrors: {
    title: "",
    subtitle: "",
    description: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    maxPeople: "",
  }
}

function EventDetails({ match, admin, fetchEventF, deleteEventF, addEventF, fetchEvent }: Props) {
  const history = useHistory();
  let newEvent = match.path === "/newEvent" ? true : false;
  const [open, setOpen] = useState(false);
  const [msgUndo, setMsgUndo] = useState("Take me back");
  const [dialogTitle, setDialogTitle] = useState("Are you sure?");
  const [dialogDescription, setDialogDescription] = useState("By choosing to cancel you will lose the progress");

  //-------| Overview states |------------
  const [finalEventOverview, setFinalEventOverview] = useState(initialEventOverview);
  const [statusOverview, setStatusOverview] = useState("active");
  const [checkBoxStateOverview, setCheckboxStateOverview] = useState(false);
  //--------------------------

  // const [images, setImages] = useState(undefined);
  // const [,] = useState(undefined);
  // //-------------------

  useEffect(() => {//called once when component mountes and once when it unmounts
    newEvent === false && fetchEventF(match.params.id)
  }, [fetchEventF, match.params.id, newEvent])

  const verifyDateAndTimePeriods = (): boolean => {
    console.log("VERIFICATION");

    if (!(new Date(finalEventOverview.startDate) > new Date(finalEventOverview.endDate)) &&
    !(new Date(finalEventOverview.startDate) < new Date(finalEventOverview.endDate))
    ) {
      if (finalEventOverview.startTime >= finalEventOverview.endTime) {
        setMsgUndo("Try again");
        setDialogTitle("Error");
        setDialogDescription("The time period is not properly selected.\n If the event takes place in a single day, start time must be before end time.");
        setOpen(true);
        return false;
      }
    } else if (new Date(finalEventOverview.startDate) > new Date(finalEventOverview.endDate)) {
      setMsgUndo("Try again");
      setDialogTitle("Error");
      setDialogDescription("The date period is not properly selected.\n Start date must be before end date.");
      setOpen(true);
      return false;
    }
    return true;
  }

  const verifyErrorMessages = (): boolean => {
    if (
      finalEventOverview.formErrors.title.length > 0 ||
      finalEventOverview.formErrors.subtitle.length > 0 ||
      finalEventOverview.formErrors.description.length > 0 ||
      finalEventOverview.formErrors.startDate.length > 0 ||
      finalEventOverview.formErrors.endDate.length > 0 ||
      finalEventOverview.formErrors.startTime.length > 0 ||
      finalEventOverview.formErrors.endTime.length > 0 ||
      finalEventOverview.formErrors.maxPeople.length > 0
    ) {
      setMsgUndo("I understand");
      setDialogTitle("Error");
      setDialogDescription("There are fields that have not been filled correctly. In order to move forward, please offer a valid input.");
      setOpen(true);
      return false;
    }
    return true;
  }

  const verifyNullFields = (): boolean => {
    if ((
      finalEventOverview.title.length === 0 ||
      finalEventOverview.subtitle.length === 0 ||
      finalEventOverview.description.length === 0 ||
      // (
      //   finalEventOverview.startDate === finalEventOverview.endDate &&
      //   finalEventOverview.startTime === finalEventOverview.endTime
      // ) ||
      finalEventOverview.maxPeople === 0) && newEvent
    ) {
      setMsgUndo("I understand");
      setDialogTitle("Error");
      setDialogDescription("There are still fields that have not yet been filled. In order to move forward, please finish the form.");
      setOpen(true);
      return false;
    }
    return true;
  }

  const formValid = (): boolean => {
    if (true === verifyDateAndTimePeriods() && true === verifyErrorMessages() && true === verifyNullFields())
      return true;
    return false;
  };

  const handleSaveOverviewEvent = (): void => {
    if (formValid()) {
      console.log(`
        --SUBMITTING--
        Title: ${finalEventOverview.title}
        subtitle: ${finalEventOverview.subtitle}
        status: ${statusOverview}
        startDate: ${finalEventOverview.startDate}
        startTime: ${finalEventOverview.startTime}
        endTime: ${finalEventOverview.endTime}
        maxPeople: ${finalEventOverview.maxPeople}
        highlighted: ${checkBoxStateOverview}
      `);

      console.log("saved");

      //save in event
      event.title = finalEventOverview.title;
      event.subtitle = finalEventOverview.subtitle;
      event.maxPeople = finalEventOverview.maxPeople;
      event.description = finalEventOverview.description;
      event.startDate = finalEventOverview.startDate;
      event.endDate = finalEventOverview.endDate;
      event.startTime = finalEventOverview.startTime;
      event.endTime = finalEventOverview.endTime;
      event.highlighted = checkBoxStateOverview;
      event.status = statusOverview;

      console.log("EVENT: ");
      console.log(event);
    } else {
      console.error("===== FORM INVALID =====");
    }
  };

  let saveEvent = (): void => {
    //TODO instantiaza event-ul mare
    //TODO verifica daca e save pentru NEW Product sau save pentru EDIT Product 
    //TODO fa request ca sa primesti url-urile unde vor fi stocate imaginile------!!!!!!!

    handleSaveOverviewEvent();
    // history.push('/');
  }

  let deleteEvent = (): void => {

    if (newEvent === true) {
      setMsgUndo("Take me back");
      setDialogTitle("Are you sure?");
      setDialogDescription("By choosing to cancel you will lose the progress");
      setOpen(true);
    } else {
      deleteEventF(match.params.id);
      history.push('/');
    }
  }

  const overviewComponent =
    <Overview
      event={fetchEvent.event}
      newEvent={newEvent}
      admin={admin}
      finalEventOverview={finalEventOverview}
      setFinalEventOverview={setFinalEventOverview}
      statusOverview={statusOverview}
      setStatusOverview={setStatusOverview}
      checkBoxStateOverview={checkBoxStateOverview}
      setCheckboxStateOverview={setCheckboxStateOverview}
      setOpen={setOpen}
      setMsgUndo={setMsgUndo}
      setDialogTitle={setDialogTitle}
      setDialogDescription={setDialogDescription}
    />
  const locationComponent = <Location />
  const ticketsComponent = <Tickets />
  const imagesComponent = <Images />


  if (fetchEvent.loading) {
    return (
      <Container maxWidth="sm">
        <CircularProgress />
      </Container>
    );
  }

  let title = newEvent === false ? fetchEvent.event.title : "NEW EVENT";
  return (
    <>
      <Header saveEvent={saveEvent} deleteEvent={deleteEvent} admin={admin} title={title} />
      <Stepper
        overviewComponent={overviewComponent}
        locationComponent={locationComponent}
        ticketsComponent={ticketsComponent}
        imagesComponent={imagesComponent}
      />
      <AlertDialog
        open={open}
        setOpen={setOpen}
        msgUndo={msgUndo}
        dialogTitle={dialogTitle}
        dialogDescription={dialogDescription}
      />
    </>
  );
}

const mapStateToProps = (state: any) => {
  return {
    fetchEvent: state.event
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchEventF: (id: string) => dispatch(loadEvent(id)),
    deleteEventF: (id: string) => dispatch(deleteEvent(id)),
    addEventF: (event: EventCrud) => dispatch(addEvent(event))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);
