import React, { Suspense } from "react";
import logo from "./logo.svg";
import "./App.css";
// loading component for suspense fallback - needed for internationalization, leave it in the App as a wrapper component
const Loader = () => (
  <div className="App">
    <img src={logo} className="App-logo" alt="logo" />
    <div>loading...</div>
  </div>
);

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </Suspense>
    </div>
  );
}

export default App;
