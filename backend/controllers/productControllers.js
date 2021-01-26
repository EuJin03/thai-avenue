import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc Fetch all products
// @route GET /api/products
// @access Public route
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();

  res.json(products);
});

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public route
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.status(201).json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc Fetch product of a category
// @route GET /api/products/:category
// @access Public route
const getProductByCategory = asyncHandler(async (req, res) => {
  const products = await Product.find({ category: req.params.category });

  if (!products) throw new Error("Something went wrong");
  res.status(201).json(products);
});

// desc Create a new product
// @route POST /api/products
// @access Private access
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Green Curry",
    image: "/resources/green-curry.png",
    description: "very good food",
    category: "chicken",
    size: [
      {
        name: "standard",
        price: 999.99,
      },
      {
        name: "large",
        price: 9999.99,
      },
    ],
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// desc Update product
// @route PUT /api/products/:id
// @access Private access
const updateProduct = asyncHandler(async (req, res) => {
  const { name, image, description, category, size } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.image = image;
    product.description = description;
    product.category = category;
    product.size = size;

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not Found");
  }
});

// desc delete product
// @route DELETE /api/products/:id
// @access private admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json("Product removed");
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
  getProducts,
  getProductById,
  getProductByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
};
