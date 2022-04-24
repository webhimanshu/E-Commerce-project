import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductsAPI = () => {
  const [products, setProducts] = useState([]);
  const [callback,setCallBack]=useState(false);
  const[cat,setCat]=useState('');
  const[sort,setSort]=useState('');
  const[search,setSearch]=useState('');
  const[page,setPage]=useState(1);
  const[result,setResult]=useState(0);
  

  
  let getProducts = async () => {
    const res = await axios.get(`/api/products?limit=${page*6}&${cat}&${sort}&title[regex]=${search}`);
  setProducts(res.data.products)
  setResult(res.data.result); 
  console.log(res);

  };
  useEffect(() => {
    getProducts();
  }, [callback,cat,sort,search,page]);
  return {
    products: [products, setProducts],
    callback:[callback,setCallBack],
    cat:[cat,setCat],
    sort:[sort,setSort],
    search:[search,setSearch],
    page:[page,setPage],
     result:[result,setResult]
  };
};

export default ProductsAPI;
