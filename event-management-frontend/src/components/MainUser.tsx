import React from 'react'
import { Switch, Route } from 'react-router-dom'
import HomeUser from './homePageUser/HomeUser'
import Header from './header/Header';
import BuyTicketsSecondPageSmart from './userBuyTicketsPage/secondPage/BuyTicketsSecondPageSmart';

const MainUser = () => {
    return (
        <div>
            <Header />
            <main>
                <Switch>
                    <Route exact path='/user' component={HomeUser} />
                    <Route exact path='/user/reserveTickets/secondPage/:id'
                        render={props => <BuyTicketsSecondPageSmart match={props.match} />} />
                </Switch>
            </main>
        </div>
    );
}

export default MainUser