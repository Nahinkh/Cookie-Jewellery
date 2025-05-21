import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import placeholder from "../../assets/placeholder.jpg";
import toast from "react-hot-toast";

const UpdateProduct = () => {
  const { id } = useParams();
 
  const { axios, navigate, products } = useAppContext();
  const product = products.find((item) => item._id === id);


  const [files, setFiles] = useState([]);
  const [productName, setProductName] = useState(
    product.productName ? product.productName : ""
  );
  const [productDescription, setProductDescription] = useState(
    product.productDescription ? product.productDescription : ""
  );
  const [productCategory, setProductCategory] = useState(
    product.productCategory ? product.productCategory : ""
  );
  const [productPrice, setProductPrice] = useState(
    product.productPrice ? product.productPrice : ""
  );
  const [offerPrice, setOfferPrice] = useState(
    product.offerPrice ? product.offerPrice : ""
  );
  const [isFeatured, setIsFeatured] = useState(
    product.isFeatured ? product.isFeatured : false
  );
  const [isNewArrival, setIsNewArrival] = useState(
    product.isNewArrival ? product.isNewArrival : false
  );
  const [isTrending, setIsTrending] = useState(
    product.isTrending ? product.isTrending : false
  );
  const [color, setColor] = useState(
    product.color ? product.color.join(" ") : ""
  );
  const [size, setSize] = useState(product.size ? product.size.join(",") : "");


  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const productData = {
        productName,
        productDescription,
        productCategory,
        productPrice,
        offerPrice,
        color: color.split(" "),
        size: size.split(","),
        inStock: true,
        isNewArrival,
        isFeatured,
        isTrending,
      };
      const formData = new FormData();
      formData.append("productData", JSON.stringify(productData));
      console.log(productData);

      for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
      }

      console.log(formData.get("productData"));
      console.log(formData.getAll("images"));
      const{data}= await axios.put(`/api/product/update/${id}`, formData);
      if(data.success){
        toast.success(data.message);
        navigate("/admin/product-list");
      }

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="py-10 flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between no-scrollbar ">
      <form
        onSubmit={onSubmitHandler}
        className="md:p-10 p-4 space-y-5 max-w-lg"
      >
        <div>
          <p className="text-base font-medium">Previous Image</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {product.image.map((itm) => (
              <label key={itm} htmlFor={`image${itm}`}>
                <img
                  className="max-w-24 cursor-pointer rounded"
                  src={itm}
                  alt="uploadArea"
                  width={100}
                  height={100}
                />
              </label>
            ))}
          </div>
        </div>
        <div>
          <p className="text-base font-medium">Select New Image</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {Array(4)
              .fill("")
              .map((_, index) => (
                <label key={index} htmlFor={`image${index}`}>
                  <input
                    onChange={(e) => {
                      const updatedFiles = [...files];
                      updatedFiles[index] = e.target.files[0];
                      setFiles(updatedFiles);
                    }}
                    accept="image/*"
                    type="file"
                    id={`image${index}`}
                    hidden
                  />
                  <img
                    className="max-w-24 cursor-pointer rounded"
                    src={
                      files[index]
                        ? URL.createObjectURL(files[index])
                        : placeholder
                    }
                    alt="uploadArea"
                    width={100}
                    height={100}
                  />
                </label>
              ))}
          </div>
        </div>
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-name">
            Product Name
          </label>
          <input
            onChange={(e) => setProductName(e.target.value)}
            value={productName}
            id="product-name"
            type="text"
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            required
          />
        </div>
        <div className="flex flex-col gap-1 max-w-md">
          <label
            className="text-base font-medium"
            htmlFor="product-description"
          >
            Product Description
          </label>
          <textarea
            onChange={(e) => setProductDescription(e.target.value)}
            value={productDescription}
            id="product-description"
            rows={4}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Type here"
          ></textarea>
        </div>
        <div className="w-full flex flex-col gap-1">
          <label className="text-base font-medium" htmlFor="category">
            Category
          </label>
          <select
            onChange={(e) => setProductCategory(e.target.value)}
            value={productCategory}
            id="category"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
          >
            <option value="">Select Category</option>
            {[
              { name: "Rings" },
              { name: "Necklace" },
              { name: "Earrings" },
              { name: "Bracelet" },
              { name: "Anklet" },
              { name: "Stainless steel" },
            ].map((item, index) => (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-5 flex-wrap">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isFeatured}
            
              onChange={() => setIsFeatured(!isFeatured)}
            />
            Featured
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isNewArrival}
              onChange={() => setIsNewArrival(!isNewArrival)}
            />
            New Arrival
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isTrending}
              onChange={() => setIsTrending(!isTrending)}
            />
            Trending
          </label>
        </div>
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="product-price">
              Product Price
            </label>
            <input
              onChange={(e) => setProductPrice(e.target.value)}
              value={productPrice}
              id="product-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
            />
          </div>
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="offer-price">
              Offer Price
            </label>
            <input
              onChange={(e) => setOfferPrice(e.target.value)}
              value={product.offerPrice}
              id="offer-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
            />
          </div>
        </div>
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="product-price">
              Product Color
            </label>
            <input
              id="product-price"
              type="text"
              placeholder="red"
              onChange={(e) => setColor(e.target.value)}
              value={color}
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            />
          </div>
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="offer-price">
              Size
            </label>
            <input
              id="offer-price"
              type="text"
              placeholder="Size"
              onChange={(e) => setSize(e.target.value)}
              value={size}
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            />
          </div>
        </div>
        <button className="px-8 py-2.5 bg-indigo-500 text-white font-medium rounded">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
