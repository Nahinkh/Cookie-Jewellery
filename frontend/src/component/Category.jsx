import React from "react";
import { useAppContext } from "../context/AppContext";
import { categories } from "../assets/assests";

const Category = () => {
    const {navigate} =useAppContext()
  

  return (
    <>
    <div className="mt-20 px-4 lg:px-16 mb-10 hidden md:grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2.5" data-aos="fade-up">
      {categories.slice(0,3).map((category, index) => (
        <div key={index}  onClick={()=>{navigate(`/all-products/${category.path.toLocaleLowerCase()}`);scrollTo(0,0)}} className={`bg-[#E5E4E1] flex justify-center items-center relative group cursor-pointer col-span-${category.span}`}>
          <img
            src={category.image}
            alt="" 
            className="object-cover overflow-hidden h-[200px] w-full"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-action/50 group-hover:bg-black/20 flex justify-center items-center transition-all duration-300 ease-in-out">
            <h1 className="text-white text-2xl font-semibold text-wrap text-center">{category.title}</h1>
          </div>
        </div>
      ))}
      {categories.slice(3,6).map((category, index) => (
        <div key={index}  onClick={()=>{navigate(`/all-products/${category.path.toLocaleLowerCase()}`);scrollTo(0,0)}} className={`bg-[#E5E4E1] flex justify-center items-center relative group cursor-pointer col-span-${category.span}`}>
          <img
            src={category.image}
            alt="" 
            className="object-cover overflow-hidden h-[200px] w-full"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-action/50 group-hover:bg-black/20 flex justify-center items-center transition-all duration-300 ease-in-out">
            <h1 className="text-white text-2xl font-semibold text-wrap text-center">{category.title}</h1>
          </div>
        </div>
      ))}
    </div>
    <div className="px-4 lg:px-16 mb-10 md:hidden grid grid-cols-2 gap-2.5 mt-20">
      {categories.slice(0,3).map((category, index) => (
        <div key={index}  onClick={()=>{navigate(`/all-products/${category.path.toLocaleLowerCase()}`);scrollTo(0,0)}} className={`bg-[#E5E4E1] flex justify-center items-center relative group cursor-pointer`}>
          <img
            src={category.image}
            alt="" 
            className="object-cover overflow-hidden h-[200px] w-full"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-action/50 group-hover:bg-black/20 flex justify-center items-center transition-all duration-300 ease-in-out">
            <h1 className="text-white text-2xl font-semibold text-wrap text-center">{category.title}</h1>
          </div>
        </div>
      ))}
      {categories.slice(3,6).map((category, index) => (
        <div key={index}  onClick={()=>{navigate(`/all-products/${category.path.toLocaleLowerCase()}`);scrollTo(0,0)}} className={`bg-[#E5E4E1] flex justify-center items-center relative group cursor-pointer`}>
          <img
            src={category.image}
            alt="" 
            className="object-cover overflow-hidden h-[200px] w-full"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-action/50 group-hover:bg-black/20 flex justify-center items-center transition-all duration-300 ease-in-out">
            <h1 className="text-white text-2xl font-semibold text-wrap text-center">{category.title}</h1>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default Category;
