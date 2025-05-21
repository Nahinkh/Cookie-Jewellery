import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";

const Order = () => {
  const { orders } = useAppContext();
 
  return (
   <div className="flex-1 py-10 flex flex-col justify-between no-scrollbar">
  <div className="w-full md:p-10 p-4">
    <h2 className="pb-4 text-lg font-medium">Order List</h2>

    {/* Desktop Table */}
    <div className="hidden md:block">
      <div className="flex flex-col items-center max-w-6xl w-full overflow-hidden rounded-md bg-white border border-gray-300">
        <table className="w-full table-auto">
          <thead className="text-gray-900 text-sm text-left">
            <tr>
              <th className="px-4 py-3 font-semibold">Product</th>
              <th className="px-4 py-3 font-semibold">Quantity</th>
              <th className="px-4 py-3 font-semibold">Total Price</th>
              <th className="px-4 py-3 font-semibold">Address</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {orders.map((order, i) => (
              <tr key={i} className="border-t border-gray-200">
                <td className="px-4 py-3">
                  {order.items.map((item, index) => (
                    <div key={index}>
                      <p className="font-medium">{item.productName}</p>
                      <p className="text-sm text-gray-500">
                        {item.quantity} x {item.price}
                      </p>
                    </div>
                  ))}
                </td>
                <td className="px-4 py-3">{order.items.length}</td>
                <td className="px-4 py-3">{order.amount}</td>
                <td className="px-4 py-3">
                  <div className="space-y-1 text-sm">
                    <p>{order.name}</p>
                    <p>{order.email}</p>
                    <p>{order.phone}</p>
                    <p>{order.address}</p>
                    <p>{order.paymentMethod && "Cash on Delivery"}</p>
                    <p>{new Date(order.createdAt).toLocaleString()}</p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* Mobile Cards */}
    <div className="md:hidden space-y-4">
      {orders.map((order, i) => (
        <div
          key={i}
          className="border border-gray-300 rounded-md p-4 bg-white shadow-sm"
        >
          <div className="mb-2">
            {order.items.map((item, index) => (
              <div key={index}>
                <p className="font-semibold">{item.productName}</p>
                <p className="text-sm text-gray-600">
                  {item.quantity} x {item.price}
                </p>
              </div>
            ))}
          </div>
          <p className="text-sm"><strong>Quantity:</strong> {order.items.length}</p>
          <p className="text-sm"><strong>Total:</strong> {order.amount}</p>
          <div className="mt-2 text-sm space-y-1">
            <p><strong>Name:</strong> {order.name}</p>
            <p><strong>Email:</strong> {order.email}</p>
            <p><strong>Phone:</strong> {order.phone}</p>
            <p><strong>Address:</strong> {order.address}</p>
            <p><strong>Payment:</strong> {order.paymentMethod && "Cash on Delivery"}</p>
            <p><strong>Ordered:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

  );
};

export default Order;
