import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import { categories } from "../assets/assests";
import { Helmet } from "react-helmet-async";

const ProductDetails = () => {
  const { products, navigate, addToCart, cartItems } = useAppContext();
  console.log("Cart Items:", cartItems);
  const { id } = useParams();

  const product = products.find((item) => id === item._id);

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [color, setColor] = useState(product?.color?.length ? [product.color[0]] : []);
  const [size, setSize] = useState(product?.size?.length ? [product.size[0]] : []);
console.log("Raw size:", product?.size);
console.log("Initialized size:", size);

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
        <Helmet>
          <title>{product.productName} | Cookie Jewellery</title>
          <meta
            name="description"
            content={`Discover the exquisite ${product.productName} from Cookie Jewellery. Perfect for any occasion, this piece combines elegance and style.`}
          />
          <link rel="canonical" href={`/product/${product._id}`} />
          <meta property="og:title" content={product.productName} />
        </Helmet>
        <div className="flex flex-col items-start justify-start w-full max-w-4xl mx-auto">
          <p>
            <Link to="/">Home</Link> /<Link to="/all-products"> Products</Link>{" "}
            /<span> {product.productCategory}</span> /
            <span className="text-pink-500"> {product.productName}</span>
          </p>
          <div className="flex flex-col md:flex-row gap-20  mt-4 mb-10">
            <div className="flex flex-col-reverse gap-3">
              <div className=" flex gap-3">
                {product?.image?.map((image, index) => (
                  <div
                    key={index}
                    onClick={() => setThumbnail(image)}
                    className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer"
                  >
                    <img src={image} alt={`Thumbnail ${index + 1}`} />
                  </div>
                ))}
              </div>

              <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden hover:scale-125 duration-150 cursor-pointer">
                <img
                  src={thumbnail}
                  alt={product.productName}
                  className="w-3xl h-[450px] object-fit"
                />
              </div>
            </div>
            <div className="text-sm w-full md:w-1/2">
              <h1 className="text-3xl font-medium">{product.productName}</h1>

              <div className="mt-6">
                <p className="text-gray-500/70 line-through">
                  BDT {product.productPrice} TK
                </p>
                <p className="text-2xl font-medium text-action">
                  BDT{" "}
                  {product?.offerPrice
                    ? product.offerPrice
                    : product.productPrice}{" "}
                  TK
                </p>
              </div>

              <p className="text-base font-medium mt-6">Available Color</p>
              <ul className="list-none ml-4 text-gray-500/70 mt-2 flex flex-wrap gap-3">
                {product?.color?.map((col, index) => (
                  <li key={index} className="text-sm">
                    <label class="flex gap-3 items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="hidden peer"
                        onChange={(e) => {
                          const value = e.target.value;
                          if (e.target.checked) {
                            setColor([...color, value]);
                          } else {
                            setColor(color.filter((c) => c !== value));
                          }
                        }}
                        checked={color.includes(col)}
                        value={col}
                      />
                      <span
                        class={`w-5 h-5 border border-blue-600 rounded-full relative flex items-center justify-center peer-checked:after:content-[''] peer-checked:after:w-2.5 peer-checked:after:h-2.5 peer-checked:after:bg-blue-600 peer-checked:border-blue-600 peer-checked:after:rounded-full peer-checked:after:absolute`}
                      ></span>
                      <span class="text-gray-700 select-none">{col}</span>
                    </label>
                  </li>
                ))}
              </ul>
              <p className="text-base font-medium mt-6">Available Size</p>
              <ul className="list-none ml-4 text-gray-500/70 mt-2 flex flex-wrap gap-3">
                {product?.size?.map((siz, index) => (
                  <li key={index} className="text-sm mt-2">
                    <label class="flex gap-3 items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="hidden peer"
                        onChange={(e) => {
                          const value = e.target.value;
                          if (e.target.checked) {
                             setSize((prev) => [...prev, value]);
                          } else {
                            setSize(size.filter((s) => s !== value));
                          }
                        }}
                        checked={size.includes(siz)}
                        value={siz}
                      />
                      <span
                        class={`w-5 h-5 border border-blue-600 rounded-full relative flex items-center justify-center peer-checked:after:content-[''] peer-checked:after:w-2.5 peer-checked:after:h-2.5 peer-checked:after:bg-blue-600 peer-checked:border-blue-600 peer-checked:after:rounded-full peer-checked:after:absolute`}
                      ></span>
                      <span class="text-gray-700 select-none">{siz}</span>
                    </label>
                  </li>
                ))}
              </ul>

              <p className="text-base font-medium mt-6">About Product</p>
              <ul className="list-disc ml-4 text-gray-500/70">
                {product?.productDescription?.map((desc, index) => (
                  <li key={index} className="text-sm ">
                    {desc}
                  </li>
                ))}
              </ul>

              <div className="flex items-center mt-10 gap-4 text-base">
                <button
                  onClick={() => addToCart(product, color, size)}
                  className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => {
                    addToCart(product);
                    navigate("/cart");
                  }}
                  className="w-full py-3.5 cursor-pointer font-medium bg-pink-500 text-white hover:bg-pink-600 transition"
                >
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
