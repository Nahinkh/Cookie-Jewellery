import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";

const ProductDetails = () => {
  const { products, navigate,addToCart } = useAppContext();
  
  const { id } = useParams();

  const product = products.find((item) => id === item._id);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);


  useEffect(() => {
    if (products.length > 0) {
      let productCopy = products.slice();
      productCopy = productCopy.filter(
        (item) => item.productCategory === product.productCategory
      );
      setRelatedProducts(productCopy.slice(0, 4));
    }
  }, [products]);

    useEffect(() => {
    setThumbnail(product?.image[0] ? product.image[0] : null);
  }, [product]);

  return (
    product && (
      <div className=" w-full px-6 mt-16 mb-10 lg:px-16 mx-auto ">
        <div className="flex flex-col items-start justify-start w-full max-w-4xl mx-auto">
            <p>
          <span>Home</span> /<span> Products</span> /
          <span> {product.productCategory}</span> /
          <span className="text-pink-500"> {product.productName}</span>
        </p>
        <div className="flex flex-col md:flex-row gap-20  mt-4 mb-10">
          <div className="flex flex-col-reverse gap-3">
            <div className=" flex gap-3">
              {product.image.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setThumbnail(image)}
                  className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer"
                >
                  <img  src={image} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>

            <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden hover:scale-125 duration-150 cursor-pointer">
              <img src={thumbnail} alt={product.productName} className="w-3xl h-[450px] object-fit" />
            </div>
          </div>
          <div className="text-sm w-full md:w-1/2">
            <h1 className="text-3xl font-medium">{product.productName}</h1>

            <div className="mt-6">
              <p className="text-gray-500/70 line-through">
               BDT {product.productPrice}
              </p>
              <p className="text-2xl font-medium">BDT {product.offerPrice? product.offerPrice  :product.productPrice}</p>
              <span className="text-gray-500/70">(inclusive of all taxes)</span>
            </div>

            <p className="text-base font-medium mt-6">About Product</p>
            <ul className="list-disc ml-4 text-gray-500/70">
              <li>{product.productDescription}</li>
            </ul>

            <div className="flex items-center mt-10 gap-4 text-base">
              <button
              onClick={()=>addToCart(product)}
              className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition">
                Add to Cart
              </button>
              <button
                onClick={() => {
                  addToCart(product);
                  navigate("/cart");
                }}
              className="w-full py-3.5 cursor-pointer font-medium bg-pink-500 text-white hover:bg-pink-600 transition">
                Buy now
              </button>
            </div>
          </div>
        </div>
        </div>
        {/* -------------------Related Products---------------------------- */}
        <div className="flex flex-col items-center mt-16">
          <div className="flex flex-col items-center w-max">
            <p className="text-3xl font-semibold">Related Products</p>
            <div className="w-20 h-0.5 bg-primary rounded-full mt-2"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-10 ">
            {relatedProducts
              .filter((product) => product.productCategory)
              .map((product, idx) => (
                <ProductCard key={idx} product={product} />
              ))}
          </div>
          <button
            onClick={() => {
              navigate("/all-products");
              scrollTo(0, 0);
            }}
            className="mx-auto cursor-pointer px-12 my-16 py-2.5 border rounded text-primary hover:bg-primary/10 transition "
          >
            See more
          </button>
        </div>
      </div>
    )
  );
};

export default ProductDetails;
