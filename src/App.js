import React from "react";
import Dashboard from "./pages/dashboard/Dashboard";
// Redux
import { Provider } from "react-redux";
import configureStore from "./configureStore";

function App() {
  return (
    <Provider store={configureStore()}>
      <div className="App">
        <Dashboard></Dashboard>
      </div>
    </Provider>
  );
}

export default App;
