import React from 'react';
import { Container } from "@material-ui/core";
import Header from "./components/Header";
import Main from './components/Main';

// This component will be rendered by our <Router>
const App = () => {
  return (
      <Container>
        <Header />
        <Main />
      </Container>
  );
}

export default App