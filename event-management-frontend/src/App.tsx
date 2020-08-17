import React, { Suspense } from 'react';
import './App.css';
import logo from "./logo.svg";
import { createMuiTheme, MuiThemeProvider, makeStyles, Paper } from '@material-ui/core';
import { Provider } from 'react-redux';
import store from './store/store';
import Main from './components/Main';

// loading component for suspense fallback - needed for internationalization, leave it in the App as a wrapper component
const Loader = () => (
  <div className="App">
    <img src={logo} className="App-logo" alt="logo" />
    <div>loading...</div>
  </div>
);

const themeDark = createMuiTheme({
  palette: {
    primary: {
      main: '#1E5FA4', //blue
      light: '#21C6F3', //light blue
      dark: '#133C55' //dark blue
    },
    secondary: {
      light: '#f9c929', //light yellow
      main: '#FFFFFF', //pure white
      dark: '#f2ac0a', //dark yellow
      contrastText: '#ED4D6E' //paradise pink
    },
    background: {
      default: '#FFFFFF', //white
    },
    text: {
      primary: '#133C55', //dark blue
    },
  }
});

const useStyles = makeStyles({
  paper: {
    width: "100%",
    minHeight: "100vh",
    background: 'linear-gradient(45deg, #21C6F3 50%, #1E5FA4 90%)',
    // background: '#FFFFFF', 
  },
});

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <Provider store={store}>
          <MuiThemeProvider theme={themeDark}>
            <Paper className={classes.paper}>
              <Main />
            </Paper>
          </MuiThemeProvider>
        </Provider>
      </Suspense>
    </div >
  );
}

export default App;
