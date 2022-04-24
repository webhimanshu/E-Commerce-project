import React,{useContext} from 'react'
import {Routes, Route} from 'react-router-dom';
import Products from './products/Products';
import Cart from './cart/Cart';
import Login from './auth/Login';
import Register from './auth/Register'
import NotFound from '../utils/NotFound'
import DetailsProducts from './detailsProduct/DetailsProducts';
import { GlobalState } from '../../App';
import OrderHistory from './History/OrderHistory';
import OrderDetails from './History/OrderDetails';
import Categories from './category/Categories';
import CreateProduct from './CreateProduct/CreateProduct';
const Pages = () => {
const state=useContext(GlobalState);
const [isLogged,setIsLogged]=state.userAPI.isLogged;
const[isAdmin,setIsAdmin]=state.userAPI.isAdmin;
console.log(isLogged);
  return (
   <Routes>
     <Route path="/" exact element={<Products/>}/>
     <Route path="/details/:id" exact element={<DetailsProducts/>}/>
     <Route path="/login" exact element={isLogged ?<NotFound/> : <Login/>}/>
     <Route path="/register" exact element={isLogged ?<NotFound/>:<Register/>}/>
     <Route path="/categories" exact element={isAdmin ?  <Categories/>:<NotFound/>}/>
     <Route path="/create_product" exact element={isAdmin ?  <CreateProduct/>:<NotFound/>}/>
     <Route path="/edit_product/:id" exact element={isAdmin ?  <CreateProduct/>:<NotFound/>}/>
     
     <Route path="/history" exact element={ <OrderHistory/>}/>
     <Route path="/history/:id" exact element={<OrderDetails/> }/>
     
     <Route path="/cart" exact element={<Cart/>}/>
     <Route path="*" exact element={<NotFound/>}/>
     
   </Routes>
  )
}

export default Pages