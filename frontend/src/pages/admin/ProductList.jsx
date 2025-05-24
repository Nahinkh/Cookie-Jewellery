import React, { use, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import DeleteConfirmToast from "../../component/DeleteConfirmToast";

const ProductList = () => {
  const { products, navigate, axios, fetchProducts } = useAppContext();

  const handleDelete = async (id) => {
    try {
      DeleteConfirmToast({
        onConfirm: async () => {
          const { data } = await axios.delete(`/api/product/delete/${id}`);
          if (data.success) {
            toast.success(data.message);
            fetchProducts();
          } else {
            toast.error(data.message);
          }
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateStock = async (id, inStock) => {
    console.log(id, inStock);
    try {
      const { data } = await axios.patch("/api/product/updateStock", {
        id,
        inStock,
      });
      console.log(data);
      if (data.success) {
        toast.success(data.message);
        fetchProducts();
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Use the useEffect hook to fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex-1 py-10 flex flex-col justify-between">
      <div className="w-full md:p-10 p-4">
        <h2 className="pb-4 text-lg font-medium">All Products</h2>

        {/* Desktop Table */}
        <div className="hidden md:block">
          <div className="flex flex-col items-center max-w-6xl w-full overflow-hidden rounded-md bg-white border border-gray-300">
            <div className="w-full overflow-x-auto">
              <div className="min-w-[900px]">
                <table className="min-w-full table-fixed">
                  <thead className="text-gray-900 text-sm text-left bg-white sticky top-0 z-10">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Product</th>
                      <th className="px-4 py-3 font-semibold">Category</th>
                      <th className="px-4 py-3 font-semibold">Selling Price</th>
                      <th className="px-4 py-3 font-semibold">In Stock</th>
                      <th className="px-4 py-3 font-semibold">Actions</th>
                    </tr>
                  </thead>
                </table>
                <div className="max-h-[400px] overflow-y-auto">
                  <table className="min-w-full table-fixed">
                    <tbody className="text-sm text-gray-600">
                      {products.map((product, index) => (
                        <tr key={index} className="border-t border-gray-300">
                          <td className="px-4 py-3 flex items-center space-x-3">
                            <span className="text-lg">{index + 1}</span>
                            <img
                              src={product.image[0]}
                              alt="product"
                              className="w-16 h-16 object-cover border rounded"
                            />
                            <span className="font-medium">
                              {product.productName}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            {product.productCategory}
                          </td>
                          <td className="px-4 py-3">
                            ${product.offerPrice || product.productPrice}
                          </td>
                          <td className="px-4 py-3">
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                readOnly
                                onClick={() =>
                                  handleUpdateStock(
                                    product._id,
                                    !product.inStock
                                  )
                                }
                                className="sr-only peer"
                                checked={product.inStock}
                              />
                              <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-green-600 transition-colors duration-200"></div>
                              <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                            </label>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  navigate(`/admin/product-list/${product._id}`)
                                }
                                className="bg-green-600 text-white px-4 py-2 rounded hover:scale-105 transition cursor-pointer"
                              >
                                Update
                              </button>
                              <button
                                onClick={() => handleDelete(product._id)}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:scale-105 transition cursor-pointer"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {products.map((product, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm"
            >
              <div className="flex items-center space-x-4 mb-3">
                <img
                  src={product.image[0]}
                  alt="product"
                  className="w-16 h-16 object-cover border rounded"
                />
                <div>
                  <p className="font-semibold">{product.productName}</p>
                  <p className="text-sm text-gray-500">
                    {product.productCategory}
                  </p>
                </div>
              </div>
              <p className="text-sm mb-2">
                <strong>Price:</strong> $
                {product.offerPrice || product.productPrice}
              </p>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm font-medium">In Stock:</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked={product.inStock}
                  />
                  <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-green-600 transition-colors duration-200"></div>
                  <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                </label>
              </div>
              <div className="flex justify-between mt-2 space-x-2">
                <button
                  onClick={() => navigate(`/admin/product-list/${product._id}`)}
                  className="flex-1 bg-green-600 text-white text-sm px-4 py-2 rounded hover:scale-105 transition"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="flex-1 bg-red-500 text-white text-sm px-4 py-2 rounded hover:scale-105 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
