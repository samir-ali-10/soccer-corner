const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");

router.get("/api/getProducts", ProductController.getProducts);

// router.post("/adminSecret/addProducts", productController.postAddProduct); // add new Products
// router.get("/api/products", productController.getProducts); // fetch data to stock
// router.get("/products/:productId", productController.getSingleProduct); // fetch single product

module.exports = router;
