import React from 'react';
import './App.css';
import RegistrationPage from './components/RegistrationPage';
import Amplify from 'aws-amplify';
import config from './config'


Amplify.configure({
  Auth: {
    mandatorySignId: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  }
});

function App() {
  return (
    <div className="App">
      <RegistrationPage/>
    </div>
  );
}

export default App;
