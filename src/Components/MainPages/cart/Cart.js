import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../../App";
import PayPal from './PayPal.js';
const Cart = () => {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userAPI.cart;
  const [token]=state.token;
  const [total, setTotal] = useState(1);
  const [callback,setCallBack]=state.userAPI.callback;
  console.log("Cart is ", cart);

  useEffect(() => {

  



    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);

      setTotal(total);
    };

    getTotal();
  }, [cart]);
 
   const addCart=async (cart)=>{
 await axios.patch('/user/addtocart',{cart},{
   headers:{Authorization:token}
 })

   }


  const increment = (id) => {
    cart.forEach((element) => {
      if (element._id === id) {
        element.quantity += 1;
      }
    });
    setCart([...cart]);
    addCart(cart);
  };

  const decrement = (id) => {
    cart.forEach((element) => {
      if (element._id === id) {
        element.quantity === 1
          ? (element.quantity = 1)
          : (element.quantity -= 1);
      }
    });
    setCart([...cart]);
    addCart(cart);
  };
 const removeProduct=id=>{
  if(window.confirm("Do you want to delete this product")){
    cart.forEach((item,index)=>{
     if(item._id===id){
      cart.splice(index,1);
     }
    });
    setCart([...cart]);
    addCart(cart);
  }
 }

 const tranSuccess= async (payment)=>
 {
 
  console.log(payment);
 
  const{paymentID,address}=payment;
 
  await axios.post('/api/payment',{cart,paymentID,address},{
  headers:{Authorization:token}
});

setCart([]);
addCart([]);
setCallBack(!callback);
window.alert("You have successfully placed an order");
}

  if (cart.length === 0)
    return <h1 className="text-center text-3xl mt-4">Cart Empty</h1>;

  return (
    <div className="w-4/5 border  m-auto">
      {cart.map((product) => (
        <div className=" w-full border m-auto flex" key={product._id}>
          <img
            src="/images/camila.jpg"
            className="w-full m-5 h-[450px] object-cover block max-w-sm"
          />
          <div className=" mt-5">
            <div className="flex w-[650px] justify-between">
              <h2 className="uppercase font-medium text-blue-800 tracking-wider text-xl">
                {product.title}
              </h2>
              <h6 className="font-medium text-3xl text-red-600 relative -top-5 cursor-pointer" onClick={()=>removeProduct(product._id)}>
                X
              </h6>
            </div>
            <span className="">${product.price * product.quantity}</span>
            <p className="">{product.description}</p>
            <p className="">{product.content}</p>
            <p className="">Sold :{product.sold}</p>
            <div className="flex items-center mt-3">
              <button
                className="w-10 border h-10 text-3xl "
                onClick={() => decrement(product._id)}
              >
                -
              </button>
              <span className="font-medium text-lg leading-3  text-red-600 mx-3">
                {product.quantity}
              </span>
              <button
                className="w-10 border h-10 text-3xl"
                onClick={() => increment(product._id)}
              >
                +
              </button>
            </div>
            <Link
              to="/cart"
              className="bg-btn-color text-white uppercase inline-block mt-3 py-3 px-6"
            >
              Buy Now
            </Link>
          </div>
        </div>
      ))}
      <div className="flex justify-between mt-3">
        <h3 className="text-red-500 font-medium text-lg">Total : {total}</h3>
        <PayPal   total={total} tranSuccess={tranSuccess}/>
      </div>
    </div>
  );
};

export default Cart;
