import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";

const Cart = () => {
  const {clearCart} = useAppContext();
  const { cartItems, cartTotalAmount, removeFromCart, navigate } =
    useAppContext();
  return (
    <>
    {
      cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-3xl font-semibold">Your Cart is Empty</h1>
          <button
            onClick={() => navigate("/all-products")}
            className="mt-4 px-4 py-2 bg-pink-500 text-white rounded"
          >
            Continue Shopping
          </button>
        </div>
      ):
       <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart{" "}
          <span className="text-sm text-pink-500">{cartItems.length}</span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartItems.map((product, index) => (
          <div
            key={index}
            className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3"
          >
            <div className="flex items-center md:gap-6 gap-3">
              <div className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded">
                <img
                  className="max-w-full h-full object-cover"
                  src={product.image[0]}
                  alt={product.productName}
                />
              </div>
              <div>
                <p className="hidden md:block font-semibold">
                  {product.productName}
                </p>
                <div className="font-normal text-gray-500/70">
                  <p>
                    Size: <span>{product.size || "N/A"}</span>
                  </p>
                  <div className="flex items-center">
                    <p>Qty:{product.quantity}</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center">
              BDT {product.offerPrice * product.quantity}
            </p>
            <button
              onClick={() => removeFromCart(product)}
              className="cursor-pointer mx-auto"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0"
                  stroke="#FF532E"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        ))}

      <div className="flex items-center justify-between mt-6 px-5">
          <button
          onClick={() => navigate("/all-products")}
          className="group cursor-pointer flex items-center mt-8 gap-2 text-pink-500 font-medium"
        >
          <svg
            width="15"
            height="11"
            viewBox="0 0 15 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1"
              stroke=" #f6339a"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Continue Shopping
        </button>
          <button
          onClick={() => clearCart()}
          className="group cursor-pointer flex items-center mt-8 gap-2 bg-red-600 px-3 py-2 rounded text-white font-medium"
        >
          Clear Cart
        </button>
      </div>
      </div>

      <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
        <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
        <div className="text-gray-500 mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Price:</span>
            <span>BDT {Math.round(cartTotalAmount())}</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between text-lg font-medium mt-3">
            <span>Total Amount:</span>
            <span>BDT {Math.round(cartTotalAmount())}</span>
          </p>
        </div>

        <button
          onClick={() => navigate("/order")}
          className="w-full py-3 mt-6 cursor-pointer bg-pink-500 text-white font-medium hover:bg-pink-600 transition"
        >
          Place Order
        </button>
      </div>
    </div>
    }
   </>
  );
};

export default Cart;
