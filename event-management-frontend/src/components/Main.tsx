import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './homePage/Home'
import EventList from "./eventListPage/listSection/EventListSmart";
import Header from './header/Header';
import EventDetails from './eventCreateOrEdit/EventDetails';
import { SecureRoute } from './SecureRoute';

const Main = () => {
    return (
            <div>
                <Header />
                <main>
                    <Switch>
                        <Route exact path='/admin/events/:id'
                               render={(props: any) => <EventDetails match={props.match} admin={true} />} />
                        <SecureRoute admin exact path='/admin/events' component={EventList} />
                        <Route exact path='/admin/newEvent'
                               render={(props: any) => <EventDetails match={props.match} admin={true} />} />
                        <SecureRoute admin exact path='/admin' component={Home} />
                    </Switch>
                </main>
            </div>
        );
}


export default Main