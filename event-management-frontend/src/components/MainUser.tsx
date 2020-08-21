import React from 'react'
import { Switch, Route } from 'react-router-dom'
import HomeUser from './homePageUser/HomeUser'
import Header from './header/Header';

const MainUser = () => {
        return (
            <div>
                <Header />
                <main>
                    <Switch>
                        <Route exact path='/user' component={HomeUser} />
                    </Switch>
                </main>
            </div>
        );
}

export default MainUser