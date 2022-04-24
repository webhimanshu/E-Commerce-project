import React,{useContext} from 'react'
import { GlobalState } from '../../../App'
const LoadMore = () => {
    const state=useContext(GlobalState);
    const[page,setPage]=state.productsAPI.page;
    const[result,setResult]=state.productsAPI.result;
  return (
    <div className='text-center'>
    {
        result<page*6 ? " ":
        <button onClick={()=>setPage(page+1)} className="h-[40px]  mt-2  border-b-2 border-b-slate-600   bg-gray-700 text-white px-2">Load More</button>
    }

    </div>
  )
}

export default LoadMore