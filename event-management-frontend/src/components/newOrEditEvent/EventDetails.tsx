import React, { useState, useEffect } from 'react';
import Header from '../Header';
import { Button, makeStyles, CircularProgress, Container } from '@material-ui/core';
import { Route, Switch, BrowserRouter, Link } from 'react-router-dom';
import Overview from '../Overview';
import Tickets from '../Tickets';
import Images from '../Images';
import Location from '../Location';
import { loadEvent, deleteEvent, addEvent } from '../../actions/HeaderActions';
import { connect } from 'react-redux';
import Test from './Test';
import DrawerComponent from './DrawerComponent';

const useStyles = makeStyles({
  container: {
    display: "flex"
  }
});

interface Event {
  title: string,
  subtitle: string,
  status: string,
  highlighted: boolean,
  location: string,
  startDateandTime: string,
  endDateandTime: string,
  maxPeople: number | string,
}

const event: Event = {
  title: "",
  subtitle: "",
  status: "",
  highlighted: false,
  location: "",
  startDateandTime: "",
  endDateandTime: "",
  maxPeople: 0,
}

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

//TODO REDUX aici se intampla
function EventDetails({ match, admin, fetchEventF, deleteEventF, addEventF, fetchEvent }: Props) {
  const classes = useStyles();

  let newEvent = match.path === "/newEvent" ? true : false;

  useEffect(() => {//called once when component mountes and once when it unmounts
    newEvent === true ? console.log("new") : fetchEventF(match.params.id)
  }, [fetchEventF, match.params.id, newEvent])

  let saveEvent = (): void => {
    // console.log(event);
    //TODO save in backend
    console.log("save");
  }

  let deleteEvent = (): void => {
    console.log("delete");
  }


  const [open, setOpen] = useState(false);
  let openDrawer = (): void => {
    setOpen(true);
  }

  let closeDrawer = (): void => {
    setOpen(false);
  }

  // console.log(match.params);
  let id = match.params.id

  if (fetchEvent.loading) {
    return (
      <Container maxWidth="sm">
        <CircularProgress />
      </Container>
    );
  }

  let title = fetchEvent.product.name;

  return (
    <>

      <Header saveEvent={saveEvent} deleteEvent={deleteEvent} title={title} admin={true} openDrawer={openDrawer} />
      {/* <div className="center"> */}

      {/* <DrawerComponent open={open} closeDrawer={closeDrawer} eventId={id}/> */}

      {/* <DrawerComponent open={open} closeDrawer={closeDrawer} eventId={id}>
        <Route exact path='/overview' render={props => <Overview match={props.match} admin={true} />}></Route>
        <Route exact path='/location' render={props => <Location match={props.match} />}></Route>
        <Route exact path='/tickets' render={props => <Tickets match={props.match} />}></Route>
        <Route exact path='/images' render={props => <Images match={props.match} />}></Route>
      </DrawerComponent> */}

      {/* <BrowserRouter
        basename="/events"
      >
        <DrawerComponent open={open} closeDrawer={closeDrawer} eventId={id}>
          <Route exact path='/overview' render={props => <Overview match={props.match} admin={true} />}></Route>
          <Route exact path='/location' render={props => <Location match={props.match} />}></Route>
          <Route exact path='/tickets' render={props => <Tickets match={props.match} />}></Route>
          <Route exact path='/images' render={props => <Images match={props.match} />}></Route>
        </DrawerComponent>
      </BrowserRouter> */}


      <BrowserRouter
        basename="/events"
      >
        <DrawerComponent open={open} closeDrawer={closeDrawer} eventId={id} />
        <Switch>
          <Route exact path='/overview/:id' render={props => <Overview match={props.match} admin={true} />}></Route>
          <Route exact path='/location/:id' render={props => <Location match={props.match} />}></Route>
          <Route exact path='/tickets/:id' render={props => <Tickets match={props.match} />}></Route>
          <Route exact path='/images/:id' render={props => <Images match={props.match} />}></Route>
        </Switch>
      </BrowserRouter>


      {/* <Switch>
        <Route exact path='/overview/:id' render={props => <Overview match={props.match} admin={true} />}></Route>
        <Route exact path='/newEvent/overview' render={props => <Overview match={props.match} admin={true} />}></Route>
        <Route exact path='/tickets/:id' render={props => <Tickets match={props.match} />}></Route>
        <Route exact path='/images/:id' render={props => <Images match={props.match} />}></Route>
      </Switch> */}

      {/* <Switch>
        <Route exact path="/overview/:id" render={props => <Overview match={props.match} admin={true}/>} />
      </Switch>
      </div> */}
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
