import React from 'react'
import { Switch, Route } from 'react-router-dom'
import EventList from "./EventList";

// The Event component matches one route depending on the full pathname
const Event = () => (
    <Switch>
        <Route exact path='/events' component={EventList}/>
    </Switch>
)

export default Event
