import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../../App";
import Loader from "../../utils/Loader/Loader";
import ProductsItem from "../../utils/productsItem/ProductsItem";
import Filter from "./Filter";
import LoadMore from "./LoadMore";

const Products = () => {
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const [isAdmin,setIsAdmin]=state.userAPI.isAdmin;
  const addCart=state.userAPI.addCart;
  return (
    <>
        <Filter/>
      <div className="w-4/5  m-auto h-auto flex  flex-wrap pt-7 justify-between">
        {
          products.map((data)=>{
            return <ProductsItem data={data} key={data._id} isAdmin={isAdmin} addCart={addCart}/>
          })
        }

      </div>
      <LoadMore/>
      {products.length===0 && <Loader/>}
    </>
  );
};

export default Products;
