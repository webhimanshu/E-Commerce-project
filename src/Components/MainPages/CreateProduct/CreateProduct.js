import React, { useState, useContext ,useEffect} from "react";
import Loader from "../../utils/Loader/Loader";
import { GlobalState } from "../../../App";
import axios from "axios";
import { useParams } from "react-router-dom";
const initialState = {
  product_id: "",
  title: "",
  price: "",
  description: "",
  content: "",
  category: "",
  _id:""
};
const CreateProduct = () => {
  const state = useContext(GlobalState);
  const [product, setProduct] = useState(initialState);
  const [category, setCategory] = state.categoryAPI.category;
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token,setToken]=state.token;
  const[products,setProducts]=state.productsAPI.products;
  const param=useParams();
  const[onEdit,setOnEdit]=useState(false);
  const[callback,setCallBack]=state.productsAPI.callback;
  const styleUplload={
      display:images?"block":"none"

  }

  useEffect(()=>{
  if(param.id){
   setOnEdit(true);
 products.forEach(element => {
   
  if(element._id===param.id) {
  setProduct(element);
  setImages(element.images);

  }
});
  }else{
    setProduct(initialState);
    setImages(false);
    setOnEdit(false);
  }
  },[param.id,products])
  
  const[isAdmin,setIsAdmin]=state.userAPI.isAdmin;
  
  const handleUpload= async e=>{
      e.preventDefault();

      try{
          if(!isAdmin) return window.alert("You are not admin");

          const file=e.target.files[0];
 
          if(!file) return window.alert("File does not exist");


          if(file.size> 1024*1024)
          return window.alert("Size too large");

          if(file.type !=='image/jpeg' && file.type !== 'image/png')
          return window.alert("File format is incorrect");


          let formData= new FormData();
          formData.append('file',file);
          setLoading(true);
         
         const res= await axios.post('/api/upload', formData,{ 
             headers:{
                 'Content-Type':'multipart/form-data',
             Authorization:token
            }
         })
         setLoading(false);
         console.log(res)
         setImages(res.data);         
      }catch(err){
    
        window.alert(err.response.data.msg);
      
      }
  }


  const handleDestroy= async ()=>{
  try
  {
    setLoading(true)
    await axios.post('/api/destroy',{public_id: images.public_id},{
      headers:{Authorization:token}
    });
    setLoading(false)
    setImages(false)
   
  }catch(err){
    window.alert(err.response.data.msg)
  }
  }

  const handleChange=(e)=>{
    const{name,value}=e.target;
    setProduct({...product,[name]:value});
  }

  const handleSubmit=async (e)=>{
   e.preventDefault();
    try{
    if(!images) return window.alert("No image Selected");
     
    
    if(onEdit){
      const res= await axios.put(`/api/products/${product._id}`,{...product,images},{
        headers:{Authorization:token}
       
    
    
     });
     console.log(res);
     window.alert(res.data.msg)
     
    }else{
      const res= await axios.post('/api/products',{...product,images},{
        headers:{Authorization:token}
       
    
    
     });
    
     window.alert(res.data.msg)
    }
    

 
   
  setProduct(initialState);
  setImages(false);
       
}
    catch(err){
      window.alert(err.response.data.msg);
    }
   
  }
  return (
    <div className="w-full border  flex justify-around flex-wrap ">
      <div className="h-[500px]  w-[400px]  border p-4 m-5 relative">
      <div className="w-full h-full border absolute top-0 left-0" >
        {

          loading ? 
          
            <Loader/>  
          
          :
         <>
        <img
            src={images ? images.url : "" }
            style={styleUplload}
            alt="image"
            className="w-full h-full block object-cover"
          />
 
        
          </>      
        }   

        {
         images 
         ?
         <span className="absolute -top-3 -right-3 bg-white border border-slate-400 rounded-full px-[10px] py-[4px] cursor-pointer font-medium text-red-600 text-lg"  onClick={handleDestroy}>
            X
          </span> : ""

        }  
       
</div>



      </div>

      <form className="max-w-[500px] min-w-[290px]  w-full my-2 mx-8 " onSubmit={handleSubmit}>

          <div className="w-full my-2 ">
          <label htmlFor="file">Select image</label>
          <input type="file" name="file"  onChange={handleUpload} className="border w-full"  />

          </div>
        

        <div className="w-full my-2">
        <label htmlFor="product_id">Product Id</label>
          <input
            type="text"
            name="product_id"
            value={product.product_id}
            required
            className="w-full min-w-[40px] border py-2"
            disabled={onEdit}
            onChange={handleChange}
          />
        </div>

        <div className="w-full my-2">
          <label htmlFor="title">Title</label>
          <input type="text" name="title" value={product.title} required  className="w-full min-w-[40px] border py-2" onChange={handleChange}/>
        </div>

        <div className="w-full my-2">
          <label htmlFor="price">Price</label>
          <input type="Number" name="price" value={product.price} required className="w-full min-w-[40px] border py-2" onChange={handleChange}/>
        </div>

        <div className="w-full my-2">
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            name="description"
            value={product.description}
            rows="3"
            required
            className="border w-full py-2"
            onChange={handleChange}
          />
        </div>

        <div className="w-full my-2">
          <label htmlFor="content">Content</label>
          <textarea
            type="text"
            name="content"
            value={product.content}
            required
            rows="3"
            className="border w-full py-2"
            onChange={handleChange}
          />
        </div>

        <div className="w-full my-2">
          <label htmlFor="categories">Categories</label>
          <select name="category" value={product.category} className="border" onChange={handleChange}>
            <option value="">Please select a category</option>
            {category.map((item) => (
              <option value={item._id} key={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-[150px] h-[40px] bg-stone-700 text-white uppercase font-semibold"
        >
          
          {onEdit?"Update":"Save"}
         
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
