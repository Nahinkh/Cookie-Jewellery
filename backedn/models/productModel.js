import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    productPrice: { type: Number, required: true },
    offerPrice: { type: Number, required: true },
    image: { type: Array, required: true },
    productDescription: { type: String, required: true },
    productCategory: { type: String, required: true },
    color: { type: Array, required: false },
    size: { type: Array, required: false },
    inStock: { type: Boolean, default: true },
    isNewArrival: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
