import axios from 'axios'
import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../../App'
const ProductsItem = ({data,isAdmin,addCart}) => {

const state= useContext(GlobalState);
const [token,setToken]=state.token;
const[callback,setCallBack]=state.productsAPI.callback;
  const deleteHandle= async (id)=>{
   try{
const destroyImg=await axios.post('/api/destroy',{public_id:data.images.public_id},{
  headers:{Authorization:token}
});


const res=await axios.delete(`/api/products/${id}`,{
  headers:{Authorization:token}
});

setCallBack(!callback);

window.alert(res.data.msg);

}
catch(err){
     window.alert(err.response.data.msg)
   }


 
 }



  return (
    
    <div className="border w-[300px] h-[500px] shadow-md shadow-slate-500 mr-10 mb-10">

           { isAdmin  && <input type="checkbox"   checked={data.checked} className="absolute w-6 h-6"/> }
    
          <img src={data.images.url} className="w-full h-[250px] block object-cover" />
          <div>
            <h2 className="w-full text-ellipsis overflow-hidden whitespace-nowrap capitalize  cursor-pointer font-bold text-lg">Product Title</h2>
            <span className="text-rose-600">{data.price}</span><br></br>
            <span className="w-full overflow-hidden ">{data.description}</span>
            
          </div>

          <div className="w-full mt-3 flex justify-between ">
           {
           isAdmin ?<>
           <Link to="#" className="w-2/4 border text-center p-2 mx-1 bg-sky-700 rounded-sm text-white font-medium" onClick={()=>deleteHandle(data._id)}> Delete</Link>
            <Link to={`/edit_product/${data._id}`} className="w-2/4 border text-center p-2 mx-1 bg-emerald-600 rounded-sm text-white font-medium">Edit</Link>
         

           </>
           :
           <>
           <Link to="#" className="w-2/4 border text-center p-2 mx-1 bg-sky-700 rounded-sm text-white font-medium" onClick={()=>addCart(data)}> Buy</Link>
            <Link to={`/details/${data._id}`} className="w-2/4 border text-center p-2 mx-1 bg-emerald-600 rounded-sm text-white font-medium">View</Link>
         
           </>

           }
           
           
          </div>
        </div>



  )
}

export default ProductsItem