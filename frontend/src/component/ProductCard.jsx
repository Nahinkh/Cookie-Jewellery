import { useAppContext } from "../context/AppContext";

const ProductCard = ({ product }) => {
  const { navigate, addToCart } = useAppContext();
  return (

        <div className="w-full h-full flex flex-col rounded-lg shadow bg-white overflow-hidden">
          <div
            onClick={() => {
              navigate(
                `/all-products/${product.productCategory.toLowerCase()}/${
                  product._id
                }`
              );
              scrollTo(0, 0);
            }}
            className="group cursor-pointer flex items-center justify-center"
          >
            <img
              className="group-hover:scale-105 transition-transform duration-200 ease-in-out object-cover w-full h-48 sm:h-60 rounded-t-md"
              src={product?.image[0]}
              alt={product?.productName}
            />
          </div>

          <div className="text-gray-500/60 text-sm px-3 py-4">
            <div className="flex flex-col items-start justify-start min-h-[80px]">
              <p className="capitalize">{product?.productCategory}</p>
              <p className="text-Secondary font-medium text-lg break-words line-clamp-2 w-full">
                {product?.productName}
              </p>
            </div>

            <div className="flex items-center justify-between mt-3">
              <p className="text-base sm:text-lg font-medium text-action">
                BDT{" "}
                {product?.offerPrice
                  ? product.offerPrice
                  : product.productPrice}{" "}
                <span className="text-gray-500/60 text-xs sm:text-sm line-through">
                  BDT {product?.productPrice}
                </span>
              </p>
            </div>
          </div>
        </div>
  );
};

export default ProductCard;
