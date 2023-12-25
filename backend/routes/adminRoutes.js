const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");

router.get("/api/products", ProductController.getProducts);
router.post("/api/products", ProductController.postAddProduct);
// router.post("/adminSecret/addProducts", ProductController.postAddProduct); // add new Products
// router.get("/products/:productId", productController.getSingleProduct); // fetch single product

module.exports = router;
