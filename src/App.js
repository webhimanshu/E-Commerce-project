import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Headers from "./Components/Headers/headers";
import Pages from "./Components/MainPages/pages";
import React, { createContext, useState, useEffect } from "react";
import ProductsAPI from "./api/ProductsAPI";
import axios from "axios";
import UserAPI from "./api/UserAPI";
import CategoryAPI from "./api/CategoryAPI";

export const GlobalState = createContext();


function App() {
  const [token, setToken] = useState(false);




    // const refreshToken= async ()=>
    // {
     
      
    //   const res=await axios.get('/user/refresh_Token');
       
       
    //    setToken(res.data.accessToken)
       
    // }

  

// useEffect(()=>{
//   const firstLogin=localStorage.getItem('firstLogin')
//  if(firstLogin){
//   refreshToken();

//  } 
 
// },[])

  const state = {
    token: [token, setToken],
    productsAPI: ProductsAPI(),
    userAPI:UserAPI(token),
    categoryAPI:CategoryAPI() 
  };

 
 console.log("Token in app",token)
  
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
