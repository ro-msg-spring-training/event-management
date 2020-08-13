import React, { Suspense } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Container } from "@material-ui/core";
import Header from "./components/Header";
import Main from './components/Main';

// loading component for suspense fallback - needed for internationalization, leave it in the App as a wrapper component
const Loader = () => (
  <div className="App">
    <img src={logo} className="App-logo" alt="logo" />
    <div>loading...</div>
  </div>
);

// This component will be rendered by our <Router>
const App = () => {
  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
      <Container>
        <Header />
        <Main />
      </Container>
      </Suspense>
    </div>
  );
}

export default App