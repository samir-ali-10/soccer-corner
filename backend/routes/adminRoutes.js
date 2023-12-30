const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");

// => GET
router.get("/api/products", ProductController.getProducts); // get all products
router.get("/api/products/collection/:collectionName",ProductController.getCollection); // get collection
router.get("/api/products/code/:code",ProductController.getSingleProduct); // get single product
router.get("/api/products/size/:size", ProductController.getBySize); // get by size
router.get("/api/products/model/:model",ProductController.getByModel); // get by model


// => POST
router.post("/api/products", ProductController.postAddProduct);



// =>EDIT
router.post('/api/products/edit-product/:code' , ProductController.editProduct); // edit Product by code


// => DELETE
router.get('/api/products/delete-product/:code' , ProductController.deleteSingleProduct) // delete single product 
router.get('/api/products/delete-products' , ProductController.deleteAllProducts) // delete all products


module.exports = router;
