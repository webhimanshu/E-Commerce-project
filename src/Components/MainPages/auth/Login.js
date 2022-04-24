import axios from "axios";
import React, { useState ,useContext} from "react";
import { Link ,useNavigate} from "react-router-dom";
import { GlobalState } from "../../../App";
const Login = () => {

  const context = useContext(GlobalState);
  const navigate=useNavigate();
  const [token,setToken]=context.token;
  
  const [state, setstate] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setstate({ ...state, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res= await axios.post("/user/login", { ...state });
      
     
         setToken(res.data.accessToken)
       localStorage.setItem("firstLogin", true);
    
       navigate("/")
    } catch (err) {
      window.alert(err.response.data.msg);
    }
    
  };
  return (
    <div className="border w-4/5  m-auto flex justify-center items-center h-[400px]">
    <form onSubmit={handleSubmit} className="border w-[300px] h-[200px] px-3 ">
      <input
        type="text"
        placeholder="Enter Your Email"
        name="email"
        value={state.email}
        onChange={handleChange}
        className="focus:outline-none border w-full px-2 mt-4 py-2"
      /><br></br>
      <input
        type="password"
        placeholder="Enter Your Password"
        name="password"
        value={state.password}
        onChange={handleChange}
        className="focus:outline-none border w-full px-2 mt-4 py-2"
      />
      <div className="w-full mt-3 flex justify-between">
        <button type="submit" className="w-2/4 border text-center p-2 mx-1 bg-sky-700 rounded-sm text-white font-medium">Login</button>
        <Link to="/register" className="w-2/4 border text-center p-2 mx-1 bg-emerald-600 rounded-sm text-white font-medium">Register </Link>
      </div>
    </form>

</div>
  );
};

export default Login;
