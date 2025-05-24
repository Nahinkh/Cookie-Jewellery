import { useAppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import { SwiperSlide,Swiper } from "swiper/react";

const ProductCategory = () => {
  const { products } = useAppContext();
  const { category } = useParams();
  const filteredProducts = products.filter(
    (product) => product.productCategory.toLowerCase() === category
  );

  return (
    <div className="mt-16 mb-10 px-6 md:px-10 lg:px-16 flex flex-col w-full">
      <div className="flex flex-col items-end w-max">
        <p className="text-2xl font-medium uppercase text-gray-800">
          {category}
        </p>
        <div className="w-16 h-0.5 bg-primary rounded-full mt-0.5"></div>
      </div>
      {filteredProducts.length > 0 ? (
        <div>
          <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 mt-10 gap-6">
            {filteredProducts.map((product, idx) => (
              <ProductCard key={idx} product={product} />
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
              {filteredProducts.map((product, idx) => (
                <SwiperSlide key={idx}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-2xl font-medium text-gray-800">
            No Products Found
          </p>
          <div className="w-16 h-0.5 bg-primary rounded-full mt-0.5"></div>
        </div>
      )}
    </div>
  );
};

export default ProductCategory;
