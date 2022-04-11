import React from 'react'
import { Link } from 'react-router-dom'

const ProductsItem = ({data}) => {

  return (
    
    <div className="border w-[300px] h-[500px] shadow-md shadow-slate-500 mr-10 mb-10">
          <img src={data.images.url} className="w-full h-[250px] block object-cover" />
          <div>
            <h2 className="w-full text-ellipsis overflow-hidden whitespace-nowrap capitalize  cursor-pointer font-bold text-lg">Product Title</h2>
            <span className="text-rose-600">{data.price}</span><br></br>
            <span className="w-full overflow-hidden ">{data.description}</span>
            
          </div>

          <div className="w-full mt-3 flex justify-between ">
            <Link to="#" className="w-2/4 border text-center p-2 mx-1 bg-sky-700 rounded-sm text-white font-medium"> Buy</Link>
            <Link to={`/details/${data._id}`} className="w-2/4 border text-center p-2 mx-1 bg-emerald-600 rounded-sm text-white font-medium">View</Link>
          </div>
        </div>



  )
}

export default ProductsItem