import React from 'react';
import logo from './logo.svg';
import './App.css';
import FilterSectionSmart from './components/eventListPage/filterSection/FilterSectionSmart';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

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

function App() {
  return (
    <ThemeProvider theme={themeDark}>
      <Provider store={store}>
        <FilterSectionSmart />
      </Provider>
    </ThemeProvider>


    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
