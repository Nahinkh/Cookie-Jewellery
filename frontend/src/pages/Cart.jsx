import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Cart = () => {
  const { clearCart } = useAppContext();
  const { cartItems, cartTotalAmount, removeFromCart, navigate,shippingZone,
    setShippingZone,
    totalAmount,getShippingFee } =
    useAppContext();

    const handlePlaceOrder = () => {
    if (!shippingZone) {
      toast.error("Please select a shipping zone before placing your order.");
      return;
    }
    navigate("/order");
  };

  console.log("Cart Items:", cartItems);
  return (
    <>
     
      <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
        {/* Cart Items */}
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
              className="grid grid-cols-[2fr_1fr_1fr] text-gray-700 items-center text-sm md:text-base font-medium pt-3 border-t border-gray-200"
            >
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 border rounded overflow-hidden">
                  <img
                    src={product.image[0]}
                    alt={product.productName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold">{product.productName}</p>
                  <p className="text-sm text-gray-500">
                    Qty: {product.quantity} | Size: {product.size || "N/A"}
                  </p>
                </div>
              </div>
              <p className="text-center">
                BDT {product.offerPrice * product.quantity}
              </p>
              <button
                onClick={() => removeFromCart(product)}
                className="text-red-500 hover:underline mx-auto"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Cart Actions */}
          <div className="flex items-center justify-between mt-6 px-5">
            <button
              onClick={() => navigate("/all-products")}
              className="flex items-center gap-2 text-pink-500 hover:underline"
            >
              &larr; Continue Shopping
            </button>
            <button
              onClick={clearCart}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="max-w-[360px] w-full bg-gray-50 border border-gray-200 p-6 rounded-md shadow-sm mt-10 md:mt-0 md:ml-8">
          <h2 className="text-xl font-medium mb-4">Order Summary</h2>

          {/* Shipping Area Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Select Shipping Area
            </label>
                   <select
            value={shippingZone}
            onChange={(e) => setShippingZone(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-pink-400"
          >
            <option value="">-- Select Zone --</option>
            <option value="inside Dhaka">Inside Dhaka</option>
            <option value="outside Dhaka">Outside Dhaka</option>
          </select>
          </div>

          <div className="text-gray-700 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>BDT {Math.round(cartTotalAmount())}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping Fee:</span>
              <span className="text-blue-600">BDT {getShippingFee()}</span>
            </div>
            <div className="flex justify-between border-t pt-2 font-semibold text-base">
              <span>Total:</span>
              <span>BDT {totalAmount}</span>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="mt-6 w-full py-3 bg-pink-500 text-white rounded hover:bg-pink-600 transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
