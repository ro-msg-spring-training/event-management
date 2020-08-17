import React from "react";
import "./App.css";
import MapWrapper from "./components/LocationPage/Map";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ThemeProvider } from "@material-ui/core/styles";
import themeDark from "./styles/theme";
import Map from "./components/LocationPage/Map";
import { Test } from "./components/LocationPage/Test";
function App() {
  return (
    <ThemeProvider theme={themeDark}>
      <Provider store={store}>
        <Test />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
