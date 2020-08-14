import { Switch, Route } from 'react-router-dom'
import React from 'react';
import EventDetails from './eventCreateOrEdit/EventDetails';

class Main extends React.Component<{}> {
  render() {
    return (
      <div className="center">
        <Switch>
          <Route exact path='/events/:id' render={props => <EventDetails match={props.match} admin={true} />}></Route>
          <Route exact path='/newEvent' render={props => <EventDetails match={props.match} admin={true} />}></Route>
        </Switch>
      </div>
    );
  }
}

export default Main;
