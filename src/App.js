import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Headers from "./Components/Headers/headers";
import Pages from "./Components/MainPages/pages";
import React, { createContext, useState, useEffect } from "react";
import ProductsAPI from "./api/ProductsAPI";

export const GlobalState = createContext();


function App() {
  const [token, setToken] = useState(false);



  const state = {
    token: [token, setToken],
    productsAPI: ProductsAPI(),
    
  };

 
 
  
  return (
    <>
      <GlobalState.Provider value={state}>
        <Router>
          <Headers></Headers>
          <Pages></Pages>
        </Router>
      </GlobalState.Provider>
    </>
  );
}

export default App;
