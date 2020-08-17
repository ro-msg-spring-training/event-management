import React, { Suspense } from "react";
import "./App.css";
import MapWrapper from "./components/LocationPage/Map";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ThemeProvider } from "@material-ui/core/styles";
import themeDark from "./styles/theme";
import Map from "./components/LocationPage/Map";
import { Test } from "./components/LocationPage/Test";

const Loader = () => (
  <div className="App">
    <div>loading...</div>
  </div>
);
function App() {
  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <Test />
      </Suspense>
    </div>
  );
}

export default App;

// loading component for suspense fallback - needed for internationalization, leave it in the App as a wrapper component
