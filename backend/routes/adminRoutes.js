const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");


// => GET

router.get("/api/products", ProductController.getProducts); // get all products
router.get("/api/products/collection/:collectionName",ProductController.getCollection); // get collection
router.get("/api/products/code/:code",ProductController.getSingleProduct); // get single product
router.get("/api/products/size/:size", ProductController.getBySize); // get by size
router.get("/api/products/collection/:collectionName/model/:model",ProductController.getCollectionAndModel); // get collection and  model 
router.get("/api/products/collection/:collectionName/size/:size",ProductController.getCollectionAndSize); // get collection and size 
router.get("/api/products/collection/:collectionName/size/:size/model/:model",ProductController.getCollectionAndModelAndSize); // get collection , model and size 
router.get('/api/products/CollectionsNames' , ProductController.getCollectionsNames); // Get collectionsNames
router.get('/api/products/LeagueNames' , ProductController.getLeagueNames)
router.get('/api/products/league/:league' , ProductController.getByLeague) // get by league
router.get('/api/products/cart', ProductController.getProductsOnCart)

// => POST
router.post("/api/products", ProductController.postAddProduct);
router.post('/api/products/cart/:code' , ProductController.postProductsOnCart);



// =>EDIT
router.post('/api/products/editProduct/:code' , ProductController.editProduct); // edit Product by code


// => DELETE

// products
router.get('/api/products/delete-product/:code' , ProductController.deleteSingleProduct) // delete single product 
router.get('/api/products/delete-products' , ProductController.deleteAllProducts) // delete all products

// Cart
router.get('/api/products/cart/delete-product/:code' , ProductController.deleteProductFromCart)
router.get('/api/products/cart/delete-products' , ProductController.deleteAllProductsFromCart)

module.exports = router;
