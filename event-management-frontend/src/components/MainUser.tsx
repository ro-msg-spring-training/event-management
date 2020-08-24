import React from 'react'
import { Switch, Route } from 'react-router-dom'
import HomeUser from './homePageUser/HomeUser'
import Header from './header/Header';
import UserEventDetailsSmart from './userEventDetailsPage/UserEventDetailsSmart';

const MainUser = () => {
    return (
        <div>
            <Header />
            <main>
                <Switch>
                    <Route exact path='/user' component={HomeUser} />
                    <Route exact path='/user/events/:id'
                        render={(props: any) => <UserEventDetailsSmart match={props.match} />} />
                </Switch>
            </main>
        </div>
    );
}

export default MainUser