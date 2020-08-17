import React, { Suspense } from "react";
import "./App.css";
import Amplify from "aws-amplify";
import config from "./config";
import AuthWrapper from "./components/loginRegisterPages/AuthWrapper";


// loading component for suspense fallback
const Loader = () => (
  <div className="App">
    <div>loading...</div>
  </div>
);

Amplify.configure({
  Auth: {
    mandatorySignId: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  },
});

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <AuthWrapper />
      </Suspense>
    </div>
  );
}

export default App;
