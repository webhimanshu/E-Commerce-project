import React,{useContext,useState,useEffect} from 'react'
import {useParams} from 'react-router-dom';
import { GlobalState } from '../../../App';
const OrderDetails = () => {
    const state=useContext(GlobalState);
    const[history,setHistory]=state.userAPI.history;
    const[OrderDetail, setOrderDetail]=useState([]);
    const params=useParams();

    useEffect(()=>{
    if(params.id){
    history.forEach(element => {
        if(element._id===params.id)
        {
       setOrderDetail(element);
        }
    });
    }


    },[params.id]);
   

    if(OrderDetail.length===0 ) return null;
  return (
  
    <div className='w-4/5 border m-auto relative overflow-x-auto shadow-md sm:rounded-lg'>
     <table className='w-full text-sm text-left  mt-4' >
    <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
       <tr className=''>
       <th className='px-6 py-3 ' scope="col">
         Name
       </th>
       <th className='px-6 py-3 ' scope="col">
         Address
       </th>

       <th className='px-6 py-3 ' scope="col">
        Postal Code
       </th>
       <th className='px-6 py-3 ' scope="col">
        Country Code
       </th>
     

       </tr>
    </thead>
<tbody>
<tr className="bg-white border-b ">
        
        <td className='px-6 py-4 '>{OrderDetail.address.recipient_name}</td>
        <td className='px-6 py-4 '>{OrderDetail.address.line1 +" - "+OrderDetail.address.city}</td>
        <td className='px-6 py-4 '>{OrderDetail.address.postal_code}</td>
        <td className='px-6 py-4 '>{OrderDetail.address.country_code}</td>
      

        
     </tr> 
 
</tbody>

   </table>

   <table className='w-full text-sm text-left mt-3 ' >
    <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
       <tr className=''>
       <th className='px-6 py-3 ' scope="col">
       
       </th>
       <th className='px-6 py-3 ' scope="col">
        Products
       </th>
       <th className='px-6 py-3 ' scope="col">
         Quantity
       </th>

      
       <th className='px-6 py-3 ' scope="col">
        Price
       </th>
     

       </tr>
    </thead>
<tbody>
{
    OrderDetail.cart.map(items=>(

        <tr key={items._id} className="bg-white border-b ">
        <td className='p-2'><img src="/images/camila.jpg" className="w-20 h-24 object-cover"/></td>
        <td className='px-6 py-4 '>{items.title}</td>
        <td className='px-6 py-4'> {items.quantity}</td>
        <td className='px-6 py-4'>${items.price * items.quantity}</td>  
     </tr> 
    ))
}
 
</tbody>

   </table>





   </div>
  )
}

export default OrderDetails