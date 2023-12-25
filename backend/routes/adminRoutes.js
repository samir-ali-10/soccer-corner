const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");

router.get("/api/getProducts", ProductController.getProducts);
router.post("/adminSecret/addProducts", ProductController.postAddProduct); // add new Products
// router.get("/products/:productId", productController.getSingleProduct); // fetch single product

module.exports = router;
