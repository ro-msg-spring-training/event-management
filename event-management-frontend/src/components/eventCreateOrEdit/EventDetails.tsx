import React, { useEffect, useState } from 'react';
import { CircularProgress, Container } from '@material-ui/core';
import { loadEvent, deleteEvent, addEvent } from '../../actions/HeaderActions';
import { connect } from 'react-redux';
import Header from './HeaderSmartSaveAndDelete';
import Stepper from './Stepper';
import { useHistory } from 'react-router-dom';
import AlertDialog from './AlertDialog';
import Overview from '../OverviewSmart';
import Images from '../Images';
import Tickets from '../Tickets';
import Location from '../Location';

interface Event {
  title: string,
  subtitle: string,
  status: string,
  highlighted: boolean,
  description: string,
  location: string,
  startDateandTime: string,
  endDateandTime: string,
  maxPeople: number | string,
}

// const event: Event = {
//   title: "",
//   subtitle: "",
//   status: "",
//   highlighted: false,
//   description:"",
//   location: "",
//   startDateandTime: "",
//   endDateandTime: "",
//   maxPeople: 0,
// }

interface IProductBase {
  name: string,
  category: string,
  image: string,
  description: string,
}

export interface IProductDetailsReady extends IProductBase {
  id: number,
  price: number
}

interface Props {
  match: any,
  admin: boolean,
  fetchEventF: (id: string) => void,
  deleteEventF: (id: string) => void,
  addEventF: (event: IProductDetailsReady) => void,
  fetchEvent: {
    loading: boolean,
    product: IProductDetailsReady,
    error: string
  },
}

//TODO ec2-54-154-96-2.eu-west-1.compute.amazonaws.com:8080 in loc de localhost

const initialEvent = {
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
  const [open, setOpen] = React.useState(false);

  // //-------------------
  const [finalEventOverview, setFinalEventOverview] = useState(initialEvent);
  const [statusOverview, setStatusOverview] = useState("active");
  const [checkBoxStateOverview, setCheckboxStateOverview] = React.useState({
    highlighted: false,
  });
  // //-------------------

  useEffect(() => {//called once when component mountes and once when it unmounts
    newEvent === true ? console.log("new") : fetchEventF(match.params.id)
  }, [fetchEventF, match.params.id, newEvent])

  let saveEvent = (): void => {
    console.log("save");
    console.log(finalEventOverview);
    console.log(statusOverview);
    console.log(checkBoxStateOverview.highlighted);
    // history.push('/');
  }

  let deleteEvent = (): void => {
    console.log("delete");

    if (newEvent === true) {
      console.log("popup");
      setOpen(true);
    } else {
      deleteEventF(match.params.id);
      history.push('/');
    }
  }

  const overviewComponent =
    <Overview
      event={fetchEvent.product}
      newEvent={newEvent}
      admin={admin}
      finalEventOverview={finalEventOverview}
      setFinalEventOverview={setFinalEventOverview}
      statusOverview={statusOverview}
      setStatusOverview={setStatusOverview}
      checkBoxStateOverview={checkBoxStateOverview}
      setCheckboxStateOverview={setCheckboxStateOverview}
    />
  const locationComponent = <Location />
  const ticketsComponent = <Tickets/>
  const imagesComponent = <Images/>


  if (fetchEvent.loading) {
    return (
      <Container maxWidth="sm">
        <CircularProgress />
      </Container>
    );
  }

  let title = newEvent === false ? fetchEvent.product.name : "NEW EVENT";
  return (
    <>
      <Header saveEvent={saveEvent} deleteEvent={deleteEvent} admin={admin} title={title} />
      <Stepper
        overviewComponent={overviewComponent}
        locationComponent={locationComponent}
        ticketsComponent={ticketsComponent}
        imagesComponent={imagesComponent}
      />
      <AlertDialog open={open} setOpen={setOpen} />
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
    addEventF: (event: IProductDetailsReady) => dispatch(addEvent(event))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);
