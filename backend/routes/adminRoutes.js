const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");

// => GET
router.get("/api/products", ProductController.getProducts); // get all products
router.get("/api/products/:code", ProductController.getSingleProductByCode); // get single product
// router.get("/api/products/:collection", ProductController.getCollection); // get collection
// => POST
router.post("/api/products", ProductController.postAddProduct);

module.exports = router;
