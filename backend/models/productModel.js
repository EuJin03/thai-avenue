import mongoose from "mongoose";

const sizeSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    size: [sizeSchema],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
