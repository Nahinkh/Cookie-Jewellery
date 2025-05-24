import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Order = () => {
  const { orders,axios,fetchOrders } = useAppContext();
  console.log("Orders:", orders);
   // assuming you already have this
const handleStatusChange = async (orderId, orderStatus) => {
  try {
    console.log("Status changed:", orderStatus);
    // // Update backend
    const {data}=await axios.patch(`/api/order/update/${orderId}`, {
      orderStatus: orderStatus,
    });
    if (data.success) {
      toast.success(data.message);
      fetchOrders(); // Refresh the order list after updating status
    }
  } catch (error) {
    console.error("Failed to update order status:", error);
  }
}

  return (
    <div className="flex-1 py-10 flex flex-col justify-between no-scrollbar">
      <div className="w-full md:p-10 p-4">
        <h2 className="pb-4 text-lg font-medium">Order List</h2>

        {/* Desktop Table */}
        <div className="hidden md:block">
          <div className="flex flex-col items-center max-w-6xl w-full overflow-hidden rounded-md bg-white border border-gray-300 max-h-[400px] overflow-y-auto">
            <table className="w-full table-auto">
              <thead className="text-gray-900 text-sm text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold">Product</th>
                  <th className="px-4 py-3 font-semibold">Quantity</th>
                  <th className="px-4 py-3 font-semibold">Total Price</th>
                  <th className="px-4 py-3 font-semibold">Address</th>
                  <th className="px-4 py-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {orders.map((order, i) => (
                  <tr
                    key={i}
                    className="border-t border-gray-200 odd:bg-gray-100 even:bg-pink-100"
                  >
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
                    <td className="px-4 py-3">
                      <select
                        value={order.orderStatus}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        className={`block w-full px-3 py-2 text-sm rounded-md shadow-sm focus:outline-none focus:ring-2
    ${
      order.orderStatus === "pending"
        ? "bg-yellow-100 text-yellow-800 border-yellow-400 focus:ring-yellow-400"
        : order.orderStatus === "completed"
        ? "bg-green-100 text-green-800 border-green-400 focus:ring-green-400"
        : "bg-red-100 text-red-800 border-red-400 focus:ring-red-400"
    }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4 max-h-[400px] overflow-y-auto">
          {orders.map((order, i) => (
            <div
              key={i}
              className="border border-gray-300 rounded-md p-4 shadow-sm even:bg-pink-100 odd:bg-white"
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
              <p className="text-sm">
                <strong>Quantity:</strong> {order.items.length}
              </p>
              <p className="text-sm">
                <strong>Total:</strong> {order.amount}
              </p>
              <div className="mt-2 text-sm space-y-1">
                <p>
                  <strong>Name:</strong> {order.name}
                </p>
                <p>
                  <strong>Email:</strong> {order.email}
                </p>
                <p>
                  <strong>Phone:</strong> {order.phone}
                </p>
                <p>
                  <strong>Address:</strong> {order.address}
                </p>
                <p>
                  <strong>Payment:</strong>{" "}
                  {order.paymentMethod && "Cash on Delivery"}
                </p>
                <p>
                  <strong>Ordered:</strong>{" "}
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Order;
