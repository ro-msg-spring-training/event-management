import React, { useEffect, useState } from 'react';
import { CircularProgress, Container, Paper, makeStyles } from '@material-ui/core';
import { loadEvent, deleteEvent, addEvent, editEvent, resetStore } from '../../actions/HeaderEventCrudActions';
import { connect } from 'react-redux';
import Header from './headerEditAndDelete/HeaderCrudSmart';
import Stepper from './Stepper';
import { useHistory } from 'react-router-dom';
import AlertDialog from './AlertDialog';
import OverviewSmart from './overviewSection/OverviewSmart';
import { EventCrud } from '../../model/EventCrud';
import { useTranslation } from 'react-i18next';
import ImagesSectionSmart from './imagesSection/ImagesSectionSmart';
import { EventImage } from '../../model/EventImage';
import MapWrapper from './locationSection/Map';
import { EventFormErrors } from '../../model/EventFormErrors';
import CategoryPageSmart from './ticketsSection/CategoryPage/CategoryPageSmart';

interface Props {
  match: any;
  admin: boolean;
  fetchEventF: (id: string) => void;
  deleteEventF: (id: string) => void;
  addEventF: (event: EventCrud, images: EventImage[]) => void;
  editEventF: (event: EventCrud, images: EventImage[]) => void;
  resetStoreF: () => void;
  fetchEvent: {
    loading: boolean;
    event: EventCrud;
    error: string;
    images: EventImage[];
    formErrors: EventFormErrors;
    isDeleted: boolean;
    isSaved: boolean;
  };
}

const useStyles = makeStyles({
  paper: {
    width: '100%',
    minHeight: '93.9vh',
    background: 'linear-gradient(45deg, #21C6F3 50%, #1E5FA4 90%)',
  },
});

function EventDetails({
  match,
  admin,
  fetchEventF,
  deleteEventF,
  addEventF,
  editEventF,
  resetStoreF,
  fetchEvent,
}: Props) {
  const history = useHistory();
  const classes = useStyles();
  const { t } = useTranslation();

  let newEvent = match.path === '/admin/newEvent' ? true : false;

  const [open, setOpen] = useState(false);
  const [msgUndo, setMsgUndo] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogDescription, setDialogDescription] = useState('');

  const [idLocation, setidLocation] = useState('');

  useEffect(() => {
    if (newEvent === false) {
      fetchEventF(match.params.id);
    }
    return () => {
      resetStoreF();
    };
  }, [fetchEventF, resetStoreF, match.params.id, newEvent]);

  const verifyDateAndTimePeriods = (event: EventCrud): boolean => {
    if (
      !(new Date(event.startDate) > new Date(event.endDate)) &&
      !(new Date(event.startDate) < new Date(event.endDate))
    ) {
      if (event.startHour >= event.endHour) {
        setMsgUndo(t('welcome.popupMsgTryAgain'));
        setDialogTitle(t('welcome.popupMsgErrTitle'));
        setDialogDescription(t('welcome.popupMsgTimeErrDescription'));
        setOpen(true);
        return false;
      }
    } else if (new Date(event.startDate) > new Date(event.endDate)) {
      setMsgUndo(t('welcome.popupMsgTryAgain'));
      setDialogTitle(t('welcome.popupMsgErrTitle'));
      setDialogDescription(t('welcome.popupMsgDateErrDescription'));
      setOpen(true);
      return false;
    }
    return true;
  };

  const verifyErrorMessages = (errors: EventFormErrors): boolean => {
    if (
      errors.title.length > 0 ||
      errors.subtitle.length > 0 ||
      errors.description.length > 0 ||
      errors.startDate.length > 0 ||
      errors.endDate.length > 0 ||
      errors.startTime.length > 0 ||
      errors.endTime.length > 0 ||
      errors.maxPeople.length > 0 ||
      errors.ticketsPerUser.length > 0 ||
      errors.ticketInfo.length > 0
    ) {
      setMsgUndo(t('welcome.popupErrMsgUnderstood'));
      setDialogTitle(t('welcome.popupMsgErrTitle'));
      setDialogDescription(t('welcome.popupErrMsgDescription'));
      setOpen(true);
      return false;
    }
    for (var ticketError of errors.ticketCategoryDtoList) {
      if (
        ticketError.title.length > 0 ||
        ticketError.subtitle.length > 0 ||
        ticketError.price.length > 0 ||
        ticketError.description.length > 0 ||
        ticketError.ticketsPerCategory.length > 0
      ) {
        setMsgUndo(t('welcome.popupErrMsgUnderstood'));
        setDialogTitle(t('welcome.popupMsgErrTitle'));
        setDialogDescription(t('welcome.popupErrMsgDescription'));
        setOpen(true);
        return false;
      }
    }

    return true;
  };

  const verifyNullFields = (event: EventCrud): boolean => {
    if (
      event.title.length === 0 ||
      event.subtitle.length === 0 ||
      event.description.length === 0 ||
      event.maxPeople === 0 ||
      event.ticketCategoryDtoList.length === 0 ||
      event.ticketsPerUser === 0 ||
      event.ticketInfo.length === 0
    ) {
      setMsgUndo(t('welcome.popupErrMsgUnderstood'));
      setDialogTitle(t('welcome.popupMsgErrTitle'));
      setDialogDescription(t('welcome.popupErrMsgNotFilled'));
      setOpen(true);
      return false;
    }

    for (var category of event.ticketCategoryDtoList) {
      if (
        category.title.trim() === '' ||
        category.price === 0 ||
        category.description.trim() === '' ||
        category.ticketsPerCategory === 0
      ) {
        setMsgUndo(t('welcome.popupErrMsgUnderstood'));
        setDialogTitle(t('welcome.popupMsgErrTitle'));
        setDialogDescription(t('welcome.popupErrMsgNotFilled'));
        setOpen(true);
        return false;
      }
    }
    return true;
  };

  const formValid = (event: EventCrud, errors: EventFormErrors): boolean => {
    if (
      true === verifyDateAndTimePeriods(event) &&
      true === verifyErrorMessages(errors) &&
      true === verifyNullFields(event)
    )
      return true;
    return false;
  };

  let saveEvent = (): void => {
    if (formValid(fetchEvent.event, fetchEvent.formErrors)) {
      if (newEvent) {
        addEventF(fetchEvent.event, fetchEvent.images);
      } else {
        editEventF(fetchEvent.event, fetchEvent.images);
      }
    }
  };

  let deleteEvent = (): void => {
    if (newEvent === true) {
      setMsgUndo(t('welcome.popupMsgCancelUndo'));
      setDialogTitle(t('welcome.popupMsgCancelTitle'));
      setDialogDescription(t('welcome.popupMsgCancelDescription'));
      setOpen(true);
      resetStoreF();
    } else {
      deleteEventF(match.params.id);
    }
  };

  useEffect(() => {
    if (fetchEvent.isDeleted) {
      history.push('/admin/events');
    }
    return () => resetStoreF();
  }, [fetchEvent.isDeleted]);

  useEffect(() => {
    if (fetchEvent.isSaved) {
      history.push('/admin/events');
    }
    return () => resetStoreF();
  }, [fetchEvent.isSaved]);

  const overviewComponent = (
    <OverviewSmart
      newEvent={newEvent}
      admin={admin}
      setOpen={setOpen}
      setMsgUndo={setMsgUndo}
      setDialogTitle={setDialogTitle}
      setDialogDescription={setDialogDescription}
    />
  );
  const locationComponent = <MapWrapper locationStatus={idLocation} setlocationStatus={setidLocation} />;
  const ticketsComponent = <CategoryPageSmart newEvent={newEvent} />;
  const imagesComponent = <ImagesSectionSmart />;

  if (fetchEvent.loading) {
    return (
      <Container maxWidth="lg">
        <CircularProgress />
      </Container>
    );
  }

  let title = newEvent === false ? fetchEvent.event.title : t('welcome.newEventTitle');
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
    fetchEvent: state.eventCrud,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchEventF: (id: string) => dispatch(loadEvent(id)),
    deleteEventF: (id: string) => dispatch(deleteEvent(id)),
    addEventF: (event: EventCrud, images: EventImage[]) => dispatch(addEvent(event, images)),
    editEventF: (event: EventCrud, images: EventImage[]) => dispatch(editEvent(event, images)),
    resetStoreF: () => dispatch(resetStore()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);
