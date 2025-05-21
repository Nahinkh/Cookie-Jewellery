import { useAppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";

const ProductCategory = () => {
  const { products } = useAppContext();
  const { category } = useParams();
  const filteredProducts = products.filter(
    (product) => product.productCategory.toLowerCase() === category
  );

  return (
    <div className="mt-16 px-16 mb-10">
      <div className="flex flex-col items-end w-max">
        <p className="text-2xl font-medium uppercase text-gray-800">
          {category}
        </p>
        <div className="w-16 h-0.5 bg-primary rounded-full mt-0.5"></div>
      </div>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-10">
          {filteredProducts.map((product, idx) => (
            <ProductCard key={idx} product={product} />
          ))}
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
