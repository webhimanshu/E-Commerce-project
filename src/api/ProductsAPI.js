import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductsAPI = () => {
  const [products, setProducts] = useState([]);
  let getProducts = async () => {
    const res = await axios.get("/api/products");
  setProducts(res.data.products)
   
  };
  useEffect(() => {
    getProducts();
  }, []);
  return {
    products: [products, setProducts],
  };
};

export default ProductsAPI;
