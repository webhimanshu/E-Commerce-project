import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../App";
import { useParams, Link } from "react-router-dom";
import ProductsItem from "../../utils/productsItem/ProductsItem";
const DetailsProducts = () => {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const [detailproduct, setDetailsProduct] = useState([]);
  const addCart=state.userAPI.addCart;
  useEffect(() => {
    if (params.id) {
     
      products.forEach(
        (product) => {
          if (product._id === params.id) setDetailsProduct(product);
        },
       
      );
    }
  },[params.id,products]);

  if (detailproduct.length === 0) return null;

  return (
      <>
    <div className=" w-4/5 border m-auto flex">
      <img src="/images/camila.jpg"  className="w-full m-5 h-[450px] object-cover block max-w-sm"/>
      <div className=" mt-5">
      <div className="flex w-[650px] justify-between">
        <h2 className="uppercase font-medium text-blue-800 tracking-wider text-xl">{detailproduct.title}</h2>
        <h6 className="font-medium text-lg leading-3">#Id: {detailproduct.product_id}</h6>
      </div>
      <span className="">${detailproduct.price}</span>
      <p className="">{detailproduct.description}</p>
      <p className="">{detailproduct.content}</p>
      <p className="">Sold :{detailproduct.sold}</p>
      <Link to="/cart" className="bg-btn-color text-white uppercase inline-block mt-3 py-3 px-6" onClick={()=>addCart(detailproduct)}>Buy Now</Link>
      </div>
    </div>
    
    <div className=" w-4/5 m-auto  text-center">
    <h2 className="font-medium text-xl mt-3">Some Related Products</h2>
    <div className="flex flex-wrap py-4 px-5">
        {
            products.map(data=>{
                return data.category===detailproduct.category ?<ProductsItem key={data._id} data={data}/>:null
               
            })
        }
    </div>
    </div>
    </>
    
  );
};

export default DetailsProducts;
