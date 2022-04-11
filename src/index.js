import React, { createContext } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { DataProvider } from "./GlobalState";

ReactDOM.render(
  <React.StrictMode>

      <App />
   
  </React.StrictMode>,
  document.getElementById("root")
);
