import { Switch, Route } from 'react-router-dom'
import React from 'react';
import Overview from './Overview';
import EventDetails from './newOrEditEvent/EventDetails';
import Tickets from './Tickets';
import Images from './Images';
import Location from './Location';
import Test from './newOrEditEvent/Test';

class Main extends React.Component<{}> {
  render() {
    return (
      <div className="center">
        <Switch>
          <Route exact path='/events/:id' render={props => <EventDetails match={props.match} admin={true} />}></Route>
          <Route exact path='/newEvent' render={props => <EventDetails match={props.match} admin={true} />}></Route>

          {/* <Route exact path='/overview/:id' render={props => <Overview match={props.match} admin={true} />}></Route>
          <Route exact path='/newEvent/overview' render={props => <Overview match={props.match} admin={true} />}></Route>
          <Route exact path='/location/:id' render={props => <Location match={props.match} />}></Route>
          <Route exact path='/tickets/:id' render={props => <Tickets match={props.match} />}></Route>
          <Route exact path='/images/:id' render={props => <Images match={props.match} />}></Route> */}
        </Switch>
      </div>

      // <div className="center">
      //   <Switch>
          
      //       <Route exact path='/events/:id' render={props => <EventDetails match={props.match} admin={true} />}>
      //         {/* <Drawer>
      //           <Route exact path='/overview' render={props => <Overview match={props.match} admin={true} />}></Route>
      //           <Route exact path='/location' render={props => <Location match={props.match} />}></Route>
      //           <Route exact path='/tickets' render={props => <Tickets match={props.match} />}></Route>
      //           <Route exact path='/images' render={props => <Images match={props.match} />}></Route>
      //         </Drawer> */}
      //       </Route>
      //       {/* <Route exact path='/events/new' render={props => <EventDetails match={props.match} admin={true} />}>
      //         <Drawer>
      //           <Route exact path='/overview' render={props => <Overview match={props.match} admin={true} />}></Route>
      //           <Route exact path='/location' render={props => <Location match={props.match} />}></Route>
      //           <Route exact path='/tickets' render={props => <Tickets match={props.match} />}></Route>
      //           <Route exact path='/images' render={props => <Images match={props.match} />}></Route>
      //         </Drawer>
      //       </Route> */}
      
      //   </Switch>
      // </div>
    );
  }
}

export default Main;
