import React from 'react'
import { Switch, Route } from 'react-router-dom'
import HomeUser from './homePageUser/HomeUser'
import Header from './header/Header';
import TicketListSmart from "./userTicketsPage/listSection/TicketListSmart";
import UserEventsPage from './userEventListPage/UserEventsPage';

const MainUser = () => {
        return (
            <div>
                <Header />
                <main>
                    <Switch>
                        <Route exact path='/user' component={HomeUser} />
                        <Route exact path='/user/tickets' component={TicketListSmart} />
                        <Route exact path='/user/events' component={UserEventsPage} />
                    </Switch>
                </main>
            </div>
        );
}

export default MainUser