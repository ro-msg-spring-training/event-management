import React, { useLayoutEffect, useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './homePage/Home'
import EventList from "./eventListPage/listSection/EventListSmart";
import Header from './header/Header';
import EventDetails from './eventCreateOrEdit/EventDetails';
import { PrivateRoute } from './PrivateRoute';

// The Main component renders one of the three provided
// Routes (provided that one matches). The /events
// route will match any pathname that starts
// with /events. The / route will only match
// when the pathname is exactly the string "/"

const Main = () => {
    return (
            <div>
                <Header />
                <main>
                    <Switch>
                        <Route exact path='/admin/events/:id'
                               render={props => <EventDetails match={props.match} admin={true} />} />
                        <Route exact path='/admin/events' component={EventList} />
                        <Route exact path='/admin/newEvent'
                               render={props => <EventDetails match={props.match} admin={true} />} />
                        <Route exact path='/admin' component={Home} />
                    </Switch>
                </main>
            </div>
        );
}


export default Main