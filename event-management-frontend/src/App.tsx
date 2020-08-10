import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Amplify from 'aws-amplify'
import config from './configure'
import { Switch, Route, Redirect } from 'react-router-dom'
import ForgotPassword from './components/ForgotPassword';
import ForgotPasswordVerification from './components/ForgotPasswordVerification';
import ChangePasswordConfirm from './components/ChangePasswordConfirm';
import themeDark from './styles/theme'
import { ThemeProvider } from '@material-ui/core';



Amplify.configure({
    Auth: {
        region: config.cognito.REGION,
        userPoolId: config.cognito.USER_POOL_ID,
        userPoolWebClientId: config.cognito.APP_CLIENT_ID

    }
})

function App() {
    return (
        <div className="App">
            <ThemeProvider theme={themeDark}>
                <Switch>
                    <Route exact path='/'>
                        <Redirect to="/login" />
                    </Route>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/forgotpassword' component={ForgotPassword}></Route>
                    <Route path='/forgotpasswordverification' component={ForgotPasswordVerification}></Route>
                    <Route path='/changepasswordconfirmation' component={ChangePasswordConfirm}></Route>
                </Switch>
            </ThemeProvider>
        </div>
    );
}

export default App;
