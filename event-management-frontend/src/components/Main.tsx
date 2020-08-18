import React, { useLayoutEffect, useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './homePage/Home'
import EventList from "./eventListPage/listSection/EventListSmart";
import { Container } from '@material-ui/core';
import Header from './header/Header';
import EventDetails from './eventCreateOrEdit/EventDetails';
import { PrivateRoute } from './PrivateRoute';

// The Main component renders one of the three provided
// Routes (provided that one matches). The /events
// route will match any pathname that starts
// with /events. The / route will only match
// when the pathname is exactly the string "/"
//TODO: i18n for all story admin page
const Main = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useLayoutEffect(() => {
        function updateSize() {
            setWidth(window.innerWidth);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    if (width <= 600) {
        return (
            <Container>
                <Header />
                <main>
                    <Switch>
                        <PrivateRoute admin exact path='/admin' component={Home} />
                        <PrivateRoute admin exact path='/admin/events' component={EventList} />
                        <PrivateRoute admin exact path='/admin/events/:id'
                            render={(props: any) => <EventDetails match={props.match} admin={true} />} />
                        <PrivateRoute admin exact path='/admin/newEvent'
                            render={(props: any) => <EventDetails match={props.match} admin={true} />} />
                    </Switch>
                </main>
            </Container>
        );
    } else {
        return (
            <div>
                <Header />
                <main>
                    <Switch>
                        <Route exact path='/admin' component={Home} />
                        <Route exact path='/admin/events' component={EventList} />
                        <Route exact path='/admin/events/:id'
                            render={props => <EventDetails match={props.match} admin={true} />} />
                        <Route exact path='/admin/newEvent'
                            render={props => <EventDetails match={props.match} admin={true} />} />
                    </Switch>
                </main>
            </div>
        );
    }
}

export default Main