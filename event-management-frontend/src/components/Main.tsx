import React, { useLayoutEffect, useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './homePage/Home'
import EventList from "./eventListPage/listSection/EventListSmart";
import Header from './header/Header';
import EventDetails from './eventCreateOrEdit/EventDetails';
import { PrivateRoute } from './PrivateRoute';

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
            <>
                <Header />
                <main>
                    <Switch>
                        <PrivateRoute admin exact path='/admin' component={Home} />
                        <PrivateRoute admin exact path='/admin/events' component={EventList} />
                        <PrivateRoute exact path='/admin/events/:id'
                            render={(props: any) => <EventDetails match={props.match} admin={true} />} /> 
                        <PrivateRoute exact path='/admin/newEvent'
                            render={(props: any) => <EventDetails match={props.match} admin={true} />} />
                    </Switch>
                </main>
            </>
        );
    } else {
        return (
            <div>
                <Header />
                <main>
                    <Switch>
                        <PrivateRoute admin exact path='/admin' component={Home} />
                        <PrivateRoute admin exact path='/admin/events' component={EventList} />
                        <PrivateRoute admin exact path='/admin/events/:id'
                            render={(props: any) => <EventDetails match={props.match} admin={true} />} />
                        <PrivateRoute admin exact path='/admin/newEvent'
                            render={(props: any)  => <EventDetails match={props.match} admin={true} />} />
                    </Switch>
                </main>
            </div>
        );
    }
}

export default Main