import express from "express";
import upload from "../Middleware/Upload.js";

import {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "../Controller/ProductController.js";

import isAuthorized from "../Middleware/isAuthorized.js";

const ProductRoute = express.Router();

// Create Product
ProductRoute.post("/create", isAuthorized,upload.single("image"), createProduct);

// Get All Products
ProductRoute.get("/all", isAuthorized, getAllProducts);

// Get Single Product
ProductRoute.get("/single/:id", isAuthorized, getSingleProduct);

// Update Product
ProductRoute.put("/update/:id", isAuthorized,upload.single("image"), updateProduct);

// Delete Product
ProductRoute.delete("/delete/:id", isAuthorized, deleteProduct);

export default ProductRoute;
