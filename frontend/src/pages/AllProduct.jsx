import React, { use, useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import ProductCard from "../component/ProductCard";

const AllProduct = () => {
  const { products, searchQuery } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilteredProducts(
        products.filter((product) =>
          product.productName.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery, products]);
  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  return (
    <div className="mt-16 flex flex-col px-16 mb-10" data-aos="fade-up">
      <div className="flex flex-col items-end w-max">
        <p className="text-2xl font-medium uppercase text-gray-800">
          All Products
        </p>
        <div className="w-16 h-0.5 bg-primary rounded-full mt-0.5"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-10">
        {filteredProducts
          .filter((product) => product.productCategory)
          .map((product, idx) => (
            <ProductCard key={idx} product={product} />
          ))}
      </div>
    </div>
  );
};

export default AllProduct;
