import axios from 'axios';
import React,{useState,useEffect} from 'react'

const CategoryAPI = () => 
{
    const [category,setCategory]=useState([]);
     const[callback,setCallBack]=useState(false);

    useEffect(()=>{
    const getCategories=async ()=>
    {
  const res=await axios.get('/api/category');
  console.log("Responce from category api",res.data.categories);
  setCategory(res.data.categories)
    }
    getCategories();
    },[callback])
  return{
      category:[category,setCategory],
      callback:[callback,setCallBack]
  }
}

export default CategoryAPI