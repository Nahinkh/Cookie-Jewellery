import React, { use, useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import ProductCard from "../component/ProductCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Helmet } from "react-helmet-async";

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
  <div className="mt-16 mb-10 px-6 md:px-10 lg:px-16 flex flex-col w-full">
    <Helmet>
    <title>All Products | Cookie Jewellery</title>
    <meta name="description" content="Explore our complete collection of exquisite jewellery at Cookie Jewellery. Find the perfect piece to complement your style." />
    <link rel="canonical" href="/all-products" />
    </Helmet>
  <div className="flex flex-col items-start sm:items-end w-full">
    <p className="text-2xl font-medium uppercase text-gray-800">
      All Products
    </p>
    <div className="w-16 h-0.5 bg-primary rounded-full mt-0.5"></div>
  </div>

  <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 mt-10 gap-6">
    {filteredProducts
      .filter((product) => product.productCategory)
      .map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
  </div>
    <div className="md:hidden">
    <Swiper
      spaceBetween={14}
      slidesPerView={1.2}
      breakpoints={{
        480: { slidesPerView: 1.5 },
        640: { slidesPerView: 2 },
      }}
    >
      {filteredProducts.map((product) => (
        <SwiperSlide key={product._id}>
          <ProductCard product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
</div>
  );
};

export default AllProduct;
