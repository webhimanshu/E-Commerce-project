import React, { useContext ,useState} from "react";
import { GlobalState } from "../../App";
import { Link ,useNavigate} from "react-router-dom";
import axios from "axios";
const Headers = () => {

const[show,setShow]=useState(false);
  const state = useContext(GlobalState);
  console.log("state in header", state);
  const [isLogged, setIsLogged] = state.userAPI.isLogged;
  const [isAdmin, setIsAdmin] = state.userAPI.isAdmin;
  const[token,setToken]=state.token;
  const[cart,setCart]=state.userAPI.cart;
   const navigate=useNavigate();

   const handleLogout= async ()=>{
    await axios.get('/user/logout');
     localStorage.clear();
     setIsAdmin(false); 
     setIsLogged(false);
     setToken(false)
     navigate("/")
     setCart([]);
   }



  const adminRouter = () => {
    return (
      <>
        <li className="inline-block py-4 mx-2">
          <Link to="/create_product">Create Product</Link>
        </li>
        <li className="inline-block py-4 mx-2">
          <Link to="/categories">Categories</Link>
        </li>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <>
        <li className="inline-block py-4 mx-2">
          <Link to="/history">History</Link>
        </li>
        <li className="inline-block py-4 mx-2">
          <Link to="/"  onClick={handleLogout}>Log Out</Link>
        </li>
      </>
    );
  };

  return (


<div className="w-full h-14 border shadow-sm shadow-slate-500 flex items-center  justify-between px-14 m-auto">
      <div className="flex">
        <img src="./images/menu.svg" width={25} className="hidden" />
        <h1 className="text-xl font-medium">
          <Link to="/"> {isAdmin ? "Admin" : "Devoid Shop"}</Link>
        </h1>
      </div>
      <div className="flex">
        <ul className="">
          <li className="inline-block py-4 mx-2">
            <Link to="/">{isAdmin ? "Products" : "Shop"}</Link>
          </li>


          {isAdmin && adminRouter()}
          {isLogged ? (
            loggedRouter()
          ) : (
            <>
              <li className="inline-block py-4 mx-2">
                {" "}
                <Link to="/login">Login</Link>
              </li>
              <li className="inline-block py-4 mx-2">
                <Link to="/register">Register</Link>
              </li>
            </>
          )}





          <li className="inline-block ">
            <img src="/images/times.svg" width={20} className="hidden" />
          </li>
        </ul>



        {isAdmin ? (
          ""
        ) : (
          <div className="">
            <span className="relative top-1 left-6  bg-pink-600 rounded px-1">
            {cart.length}
            </span>
            <Link to="/cart">
              <img
                src="/images/cart.svg"
                width={25}
                className="relative -top-[7px]"
              />
            </Link>
          </div>
        )}



      </div>
    </div>
  );
};

export default Headers;
