import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Event from './Event';

// The Main component renders one of the three provided
// Routes (provided that one matches). The /events
// route will match any pathname that starts
// with /events. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/events' component={Event}/>
        </Switch>
    </main>
)

export default Main
