import { Switch, Route } from 'react-router-dom'
import React from 'react';
import Header from './Header';

class Main extends React.Component<{}> {
  render() {
    return (
      <div className="center">
        <Switch>
          <Route exact path='/event/:id' render={props => <Header match={props.match} admin={true}/>}></Route>
        </Switch>
      </div>
    );
  }
}

export default Main;
