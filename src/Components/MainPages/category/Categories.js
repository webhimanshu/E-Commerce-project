import axios from 'axios';
import React,{useContext,useState} from 'react'
import { GlobalState } from '../../../App'
const Categories = () => {
    const state=useContext(GlobalState);
    const [category,setCategory]=state.categoryAPI.category;
    const[callback,setCallBack]=state.categoryAPI.callback;
    console.log(category)
    const[token,setToken]=state.token;
    const[cat,setCat]=useState('');
    const [onEdit,setOnEdit]=useState(false);
    const [id,setId]=useState('');


const createCategory=async(e)=>{
    e.preventDefault();
    try{
    if(onEdit){
        const res= await axios.put(`/api/category/${id}`,{name:cat},{
            headers:{Authorization:token}
        });
    }else{
        const res= await axios.post('/api/category',{name:cat},{
            headers:{Authorization:token}
        });
        window.alert(res.data.msg);
    }
     
      setOnEdit(false);
     setCallBack(!callback);
     setCat("");
    }catch(err){
        window.alert(err.response.data.msg)
    }

}
const deleteCategory=async(id)=>{
try{
const res= await axios.delete(`/api/category/${id}`,{
    headers:{Authorization:token}
});
window.alert(res.data.msg);
setCallBack(!callback)
}catch(err){
    alert(err.response.data.msg)
}
}

const editCategory=async (id ,name)=>{
setId(id);
setCat(name);
setOnEdit(true);
}
  return (
    <>
    <div className='w-4/5 m-auto  border flex justify-around my-9 '>
    <form className='w-[290px] mb-5' onSubmit={createCategory}>
        <label htmlFor='category' className='block font-bold uppercase mb-2'>Category</label>
        <input type="text" name="category" value={cat} required  className=" h-9  outline-none border-b-2 border-b-slate-600  " onChange={e=>setCat(e.target.value)}/>
        <button type='submit' className='h-[34px]   border-b-2 border-b-slate-600  w-16 bg-gray-700 text-white  ml-2'>{onEdit? "Update":"Save"}</button>
    </form>
   
    <div className=''>
{
    category.map(item=>(
        <div className='min-w-[300px] border flex  items-center justify-between p-2 mb-2  mt-2' key={item._id} >
         <p>{item.name}</p>
         <div>
         <button className='h-[34px]   border-b-2 border-b-slate-600  w-16 bg-gray-700 text-white  ml-2' onClick={()=>editCategory(item._id, item.name)}>Edit</button>
         <button className='h-[34px]   border-b-2 border-b-slate-600  w-16 bg-gray-700 text-white  ml-2' onClick={()=>deleteCategory(item._id)}>Delete</button>
         </div> 
        </div>
    ))
}
    </div>
    </div>
</>
  )
}

export default Categories