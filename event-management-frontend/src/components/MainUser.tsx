import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from './header/Header';
import UserHomePage from './userHomePage/UserHomePage';

const MainUser = () => {
        return (
            <div>
                <Header />
                <main>
                    <Switch>
                        <Route exact path='/user' component={UserHomePage} />
                    </Switch>
                </main>
            </div>
        );
}

export default MainUser