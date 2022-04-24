import React,{useContext} from 'react'
import { GlobalState } from '../../../App';
import { Link } from 'react-router-dom';
const OrderHistory = () =>
 {
   const state=useContext(GlobalState);
   const [history,setHistory]=state.userAPI.history;
   console.log(history)
  return (
    <div className='w-4/5 border m-auto relative overflow-x-auto shadow-md sm:rounded-lg'>
     <h2 className=' text-center uppercase text-lg font-medium'>History</h2>

     <h4 className=' text-center  uppercase text-lg font-medium'>You  have {history.length} Orders</h4>
    <table className='w-full text-sm text-left ' >
     <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
        <tr className=''>
        <th className='px-6 py-3 ' scope="col">
          Payment Id
        </th>
        <th className='px-6 py-3 ' scope="col">
          Date of Purchased
        </th>

        <th>


        </th>

        </tr>
     </thead>
 <tbody>

   {

     history.map(items=>(
      <tr key={items._id} className="bg-white border-b ">
        
         <td className='px-6 py-4 '>{items.paymentID}</td>
         <td className='px-6 py-4'> {new Date(items.createdAt).toLocaleDateString()}</td>
         <td className='px-6 py-4'><Link to={`/history/${items._id}`} className="underline text-blue-700">View</Link></td>  
      </tr> 

     ))
   }
 </tbody>

    </table>

    </div>
  )
}

export default OrderHistory