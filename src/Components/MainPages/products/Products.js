import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../../App";
import Loader from "../../utils/Loader/Loader";
import ProductsItem from "../../utils/productsItem/ProductsItem";

const Products = () => {
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;

  return (
    <>

      <div className="w-4/5 border m-auto h-auto flex  flex-wrap pt-7 justify-between">
        {
          products.map((data)=>{
            return <ProductsItem data={data} key={data._id}/>
          })
        }

      </div>
      {products.length===0 && <Loader/>}
    </>
  );
};

export default Products;
