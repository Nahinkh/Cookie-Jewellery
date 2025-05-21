import React from "react";
import { useAppContext } from "../context/AppContext";

const NewArrivals = () => {
  const { products, navigate } = useAppContext();
  const newArrivalsOnly = products.filter(
    (product) => product.isNewArrival === true
  );
  return (
<div className="px-4 md:px-10 lg:px-14 mb-10 mt-24 flex flex-col gap-6 justify-center items-center" data-aos="fade-up">
  <div className="flex flex-col justify-center items-center w-full">
    <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-action font-medium text-center">
      New Arrivals
    </h1>
  </div>

  {/* Top Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10 w-full">
    {newArrivalsOnly.slice(0, 2).map((item) => (
      <div
        key={item._id}
        className="w-full h-[350px] hover:scale-105 duration-300 cursor-pointer relative group"
      >
        <img
          src={item.image[0]}
          className="w-full h-[350px] object-cover"
          alt=""
        />
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center group-hover:bg-black/50 duration-300">
          <div className="flex-col gap-2 justify-center items-center inset-0 hidden group-hover:flex">
            <h1 className="text-white text-xl sm:text-2xl font-semibold text-center">
              {item.productName}
            </h1>
            <button
              onClick={() => {
                navigate(
                  `/all-products/${item.productCategory.toLowerCase()}/${item._id}`
                );
                scrollTo(0, 0);
              }}
              className="text-white text-sm px-5 py-2.5 rounded font-medium mt-2 hover:scale-105 active:scale-95 duration-300 border-2 border-action"
            >
              View Product
            </button>
          </div>
        </div>
      </div>
    ))}

    {/* Banner Image */}
    <div className="col-span-1 sm:col-span-2 relative group cursor-pointer">
      <img
        src="https://cdn.pixabay.com/photo/2016/02/02/15/54/jewellery-1175530_1280.jpg"
        className="w-full h-[350px] object-cover hover:scale-105 duration-300 rounded-tr-3xl"
        alt=""
      />
      <div className="absolute hidden top-0 left-0 w-full h-full group-hover:flex flex-col gap-2 justify-center items-center group-hover:bg-black/50 duration-300 rounded-tr-3xl">
        <h1 className="text-white text-xl sm:text-2xl text-center font-heading">
          <span className="text-action">Shine Brighter with Our Signature </span>
          Collection
        </h1>
        <button
          onClick={() => {
            navigate(`/all-products`);
            scrollTo(0, 0);
          }}
          className="text-white text-sm px-5 py-2.5 rounded font-medium mt-2 hover:scale-105 active:scale-95 duration-300 border-2 border-action"
        >
          Shop Now
        </button>
      </div>
    </div>
  </div>

  {/* Bottom Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
    {/* Banner Image 2 */}
    <div className="col-span-1 sm:col-span-2 relative group cursor-pointer">
      <img
        src="https://cdn.pixabay.com/photo/2015/05/26/09/48/chain-784422_960_720.jpg"
        className="w-full h-[350px] object-cover hover:scale-105 duration-300 rounded-bl-3xl"
        alt=""
      />
      <div className="absolute hidden top-0 left-0 w-full h-full group-hover:flex flex-col gap-2 justify-center items-center group-hover:bg-black/50 duration-300 rounded-bl-3xl">
        <h1 className="text-white text-xl sm:text-2xl text-center font-heading">
          <span className="text-action">Sparkle Every Day with Timeless Elegance </span>
          Collection
        </h1>
        <button
          onClick={() => {
            navigate(`/all-products`);
            scrollTo(0, 0);
          }}
          className="text-white text-sm px-5 py-2.5 rounded font-medium mt-2 hover:scale-105 active:scale-95 duration-300 border-2 border-action"
        >
          Shop Now
        </button>
      </div>
    </div>

    {/* Remaining Product Cards */}
    {newArrivalsOnly.slice(3, 5).map((item) => (
      <div
        key={item._id}
        className="w-full h-[350px] hover:scale-105 duration-300 cursor-pointer relative group"
      >
        <img
          src={item.image[0]}
          className="w-full h-[350px] object-cover"
          alt=""
        />
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center group-hover:bg-black/50 duration-300">
          <div className="flex-col gap-2 justify-center items-center inset-0 hidden group-hover:flex">
            <h1 className="text-white text-xl sm:text-2xl font-semibold text-center">
              {item.productName}
            </h1>
            <button
              onClick={() => {
                navigate(
                  `/all-products/${item.productCategory.toLowerCase()}/${item._id}`
                );
                scrollTo(0, 0);
              }}
              className="text-white text-sm px-5 py-2.5 rounded font-medium mt-2 hover:scale-105 active:scale-95 duration-300 border-2 border-action"
            >
              View Product
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default NewArrivals;
