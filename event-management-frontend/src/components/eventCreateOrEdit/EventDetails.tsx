import React, { useEffect, useState } from 'react';
import { CircularProgress, Container, Paper, makeStyles } from '@material-ui/core';
import { loadEvent, deleteEvent, addEvent } from '../../actions/HeaderEventCrudActions';
import { connect } from 'react-redux';
import Header from './headerEditAndDelete/HeaderCrudSmart';
import Stepper from './Stepper';
import { useHistory } from 'react-router-dom';
import AlertDialog from './AlertDialog';
import Overview from './overviewSection/OverviewSmart';
import Tickets from '../Tickets';
import { EventCrud } from '../../model/EventCrud';
import { useTranslation } from "react-i18next";
import ImagesSectionSmart from './imagesSection/ImagesSectionSmart';
import { EventImage } from '../../model/EventImage';
import MapWrapper from './locationSection/Map'


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
  startHour: "",
  endHour: "",
  maxPeople: 0,
  picturesUrlSave: [],
  picturesUrlDelete: [],
  maxNoTicketsPerUser: 0,
  noTicketEvent: true 
}

interface Props {
  match: any,
  admin: boolean,
  fetchEventF: (id: string) => void,
  deleteEventF: (id: string) => void,
  addEventF: (event: EventCrud, images: EventImage[]) => void,
  fetchEvent: {
    loading: boolean,
    event: EventCrud,
    error: string,
    images: EventImage[]
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

const useStyles = makeStyles({
  paper: {
    width: "100%",
    minHeight: "100vh",
    background: 'linear-gradient(45deg, #21C6F3 50%, #1E5FA4 90%)',
    // background: '#FFFFFF', 
  },
});

function EventDetails({ match, admin, fetchEventF, deleteEventF, addEventF, fetchEvent }: Props) {
  const history = useHistory();
  const classes = useStyles();
  const { t } = useTranslation();

  let newEvent = match.path === "/admin/newEvent" ? true : false;

  const [open, setOpen] = useState(false);
  const [msgUndo, setMsgUndo] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogDescription, setDialogDescription] = useState("");

  //-------| Overview states |------------
  const [finalEventOverview, setFinalEventOverview] = useState(initialEventOverview);
  const [statusOverview, setStatusOverview] = useState("active");
  const [checkBoxStateOverview, setCheckboxStateOverview] = useState(false);
  //--------------------------
  const [idLocation, setidLocation] = useState("");

  useEffect(() => {
    newEvent === false && fetchEventF(match.params.id)
  }, [fetchEventF, match.params.id, newEvent])

  const verifyDateAndTimePeriods = (): boolean => {
    if (!(new Date(finalEventOverview.startDate) > new Date(finalEventOverview.endDate)) &&
      !(new Date(finalEventOverview.startDate) < new Date(finalEventOverview.endDate))
    ) {
      if (finalEventOverview.startTime >= finalEventOverview.endTime) {
        setMsgUndo(t("welcome.popupMsgTryAgain"));
        setDialogTitle(t("welcome.popupMsgErrTitle"));
        setDialogDescription(t("welcome.popupMsgTimeErrDescription"));
        setOpen(true);
        return false;
      }
    } else if (new Date(finalEventOverview.startDate) > new Date(finalEventOverview.endDate)) {
      setMsgUndo(t("welcome.popupMsgTryAgain"));
      setDialogTitle(t("welcome.popupMsgErrTitle"));
      setDialogDescription(t("welcome.popupMsgDateErrDescription"));
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

      setMsgUndo(t("welcome.popupErrMsgUnderstood"));
      setDialogTitle(t("welcome.popupMsgErrTitle"));
      setDialogDescription(t("welcome.popupErrMsgDescription"));
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
      finalEventOverview.maxPeople === 0) && newEvent
    ) {
      setMsgUndo(t("welcome.popupErrMsgUnderstood"));
      setDialogTitle(t("welcome.popupMsgErrTitle"));
      setDialogDescription(t("welcome.popupErrMsgNotFilled"));
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
      event.title = finalEventOverview.title;
      event.subtitle = finalEventOverview.subtitle;
      event.maxPeople = finalEventOverview.maxPeople;
      event.description = finalEventOverview.description;
      event.startDate = finalEventOverview.startDate;
      event.endDate = finalEventOverview.endDate;
      event.startHour = finalEventOverview.startTime;
      event.endHour = finalEventOverview.endTime;
      event.highlighted = checkBoxStateOverview;
      event.status = statusOverview;
    }
  };

  let saveEvent = (): void => {
    //TODO check if save for edit or for new event

    handleSaveOverviewEvent();

    // =================

    newEvent && addEventF(event, fetchEvent.images)

  }

  let deleteEvent = (): void => {

    if (newEvent === true) {
      setMsgUndo(t("welcome.popupMsgCancelUndo"));
      setDialogTitle(t("welcome.popupMsgCancelTitle"));
      setDialogDescription(t("welcome.popupMsgCancelDescription"));
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
  const locationComponent = <MapWrapper
    locationStatus={idLocation}
    setlocationStatus={setidLocation}
  />
  const ticketsComponent = <Tickets />
  const imagesComponent = <ImagesSectionSmart />


  if (fetchEvent.loading) {
    return (
      <Container maxWidth="lg">
        <CircularProgress />
      </Container>
    );
  }

  let title = newEvent === false ? fetchEvent.event.title : t("welcome.newEventTitle");
  return (
    <Paper className={classes.paper}>
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
    </Paper>
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
    addEventF: (event: EventCrud, images: EventImage[]) => dispatch(addEvent(event, images)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);
