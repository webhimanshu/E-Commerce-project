import React, { useContext } from "react";
import { GlobalState } from "../../App";
import { Link } from "react-router-dom";
const Headers = () => {
const state= useContext(GlobalState);

  return (
    
    <div className="w-4/5 h-14 border shadow-sm shadow-slate-500 flex items-center  justify-between px-14 m-auto">
    <div className="flex">    
    <img src="./images/menu.svg" width={25} className="hidden"/>
     <h1 className="text-xl font-medium">Devoid Shop</h1>
     </div>
<div className="flex">    
<ul className="">
       <li className="inline-block py-4 mx-2"><Link to="/">Products</Link></li>
       <li className="inline-block py-4 mx-2" > <Link to="/login">Login</Link></li>
       <li className="inline-block py-4 mx-2"><Link to="/register">Register</Link></li>

   <li className="inline-block ">
     <img src="/images/times.svg" width={20} className="hidden"/>
   </li>
     </ul>
     <div className="">
       <span className="relative top-1 left-6  bg-pink-600 rounded px-1">0</span>
       <Link to="/cart">
       <img src="/images/cart.svg" width={25} className="relative -top-[7px]"/>
       </Link>
     </div>
 </div>
   
    </div>
  );
};

export default Headers;
