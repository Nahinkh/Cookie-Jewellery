import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "../context/AppContext";

const Trending = () => {
    const {products,navigate}=useAppContext()
    const trendingOnly=products.filter((product)=>product.isTrending===true) 
  return (
    <div className="px-14 mb-10 mt-24 flex flex-col items-center gap-12 justify-center md:h-[700px]" data-aos="fade-up">
      <div className=" flex flex-col  justify-center items-end w-max">
        <h1 className="font-heading text-3xl sm:text-4xl  md:text-5xl text-action font-semibold">
          Trending Now
        </h1>
        <div className="w-36 h-0.5 rounded-2xl bg-Secondary mt-1"></div>
      </div>
      <div className="mt-10 w-full">
      {
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {trendingOnly.slice(0,8).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      }
      </div>
      <button
      onClick={()=>{
        navigate('/all-products')
        scrollTo(0,0)
      }}
          type="button"
          className="  bg-action text-white cursor-pointer text-sm px-5 py-2.5 rounded font-medium mt-14 hover:scale-105 active:scale-95 duration-300"
        >
          View All Jewelry 
        </button>
    </div>
  );
};

export default Trending;
