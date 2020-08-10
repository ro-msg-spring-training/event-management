import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './homePage/Home'
import EventList from "./eventListPage/listSection/EventListSmart";

// The Main component renders one of the three provided
// Routes (provided that one matches). The /events
// route will match any pathname that starts
// with /events. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/events' component={EventList}/>
        </Switch>
    </main>
)

export default Main
