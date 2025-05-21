import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({ product }) => {
  const { navigate, addToCart } = useAppContext();
  return (
    <div className=" min-w-72 max-w-72 w-full bg-white  rounded-b-md border border-gray-300/30 shadow-md hover:shadow-lg transition duration-200 ease-in-out">
      <div
        onClick={() => {
          navigate(
            `/all-products/${product.productCategory.toLowerCase()}/${
              product._id
            }`
          );
          scrollTo(0, 0);
        }}
        className="group  cursor-pointer flex items-center justify-center"
      >
        <img
          className="group-hover:scale-105 transition object-cover h-60 w-full"
          src={product?.image[0]}
          alt={product?.productName}
        />
      </div>
      <div className="text-gray-500/60 text-sm mt-2  px-3 py-4">
        <div className="flex flex-col items-start justify-start h-20">
          <p>{product?.productCategory}</p>
          <p className="text-Secondary font-medium text-lg text-wrap w-full">
            {product?.productName}
          </p>
        </div>

        <div className="flex items-center justify-between mt-3 ">
          <p className="md:text-lg text-base font-medium text-action">
            BDT{" "}
            {product?.offerPrice ? product.offerPrice : product.productPrice}{" "}
            <span className="text-gray-500/60 md:text-sm text-xs line-through">
              BDT {product?.productPrice}
            </span>
          </p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="flex items-center text-lg justify-center gap-1 text-action  hover:bg-action hover:text-white   md:w-[80px] w-[64px] h-[34px] rounded font-medium cursor-pointer duration-200 ease-in-out"
          >
            <span className="text-xl">+</span>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
