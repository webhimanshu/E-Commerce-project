import React, { useContext } from "react";
import { GlobalState } from "../../../App";
const Filter = () => {
  const state = useContext(GlobalState);
  const [products, setProducts] = state.productsAPI.products;
  const [cat, setCat] = state.productsAPI.cat;
  const [sort, setSort] = state.productsAPI.sort;
  const [search, setSearch] = state.productsAPI.search;
  const [page, setPage] = state.productsAPI.page;
  const [result, setResult] = state.productsAPI.result;
  const [category, setCategory] = state.categoryAPI.category;

  const handleChange = (e) => {
    setCat(e.target.value);
    setSearch('');
  };
  return (
    <div className="w-full border  flex flex-wrap justify-between p-5">
      <div className=" ">
        <span>Filters:</span>
        <select className="border" onChange={handleChange}>
          <option value="">All Products</option>
          {category.map((category) => (
            <option value={"category=" + category._id} key={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <input
        type="text"
        value={search}
        placeholder="Enter your search!"
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
        className="border px-2 w-2/3 "
      />



<div className="">
        <span>Sort:</span>
        <select className="border" value={sort} onChange={(e)=>setSort(e.target.value)}>
          <option value=''>Newest</option>
          <option value='sort=oldest'>Oldest</option>
          <option value='sort=-sold'>Best sales</option>
          <option value='sort=-price'>Price:Hight-Low</option>
          <option value='sort=price'>Price:Low-High</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
