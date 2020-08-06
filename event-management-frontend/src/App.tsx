import React from 'react';
import './App.css';
import Stepper from './components/Stepper';
import { createMuiTheme, MuiThemeProvider, makeStyles, Paper } from '@material-ui/core';
import Header from './components/Header';

const themeDark = createMuiTheme({
  palette: {
    primary: {
      main: "#F2B705", //yellow
      light: "#6BB7D0" //light blue
    },
    background: {
      default: "#133C55", //dark blue
      paper: "#F4F5F9",
    },
    text: {
      primary: "#ffffff"
    },
    divider: "#555555",
  }

});

const useStyles = makeStyles({
  paper: {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: '#133C55' //dark blue
  },
});

//yellow: F2B705
//off white: F4F5F9
// light blue: 6BB7D0
//dark blue: 133C55


function App() {
  const eventName = "eventname";

  const classes = useStyles();
  return (
    <MuiThemeProvider theme={themeDark}>
      <Paper className={classes.paper}>
        <div className="App">
          <Header eventName={eventName} />
          <Stepper />
        </div>
      </Paper>
    </MuiThemeProvider>
  );
}

export default App;
