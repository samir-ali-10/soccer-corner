const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");

router.get("/api/products", ProductController.getProducts);
router.post("/api/products", ProductController.postAddProduct);

module.exports = router;
