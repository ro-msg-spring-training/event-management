import React from 'react';
import './App.css';
import { createMuiTheme, MuiThemeProvider, makeStyles, Paper } from '@material-ui/core';
import { Provider } from 'react-redux';
import store from './store/store';
import Main from './components/Main';

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
    <Provider store={store}>
      <MuiThemeProvider theme={themeDark}>
        <Paper className={classes.paper}>
          <div className="App">
            <Main/>
          </div>
        </Paper>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
