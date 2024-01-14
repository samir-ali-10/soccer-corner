const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const authController = require('../controllers/authController')

// => PRODUCTS

router.get('/api/products/type/:type' , ProductController.getBytype)
router.get('/api/products/types' , ProductController.getTypes)
router.get("/api/products", ProductController.getProducts); // get all products
router.get("/api/products/collection/:collectionName",ProductController.getCollection); // get collection
router.get("/api/products/code/:code",ProductController.getSingleProduct); // get single product
router.get("/api/products/size/:size", ProductController.getBySize); // get by size
router.get("/api/products/collection/:collectionName/model/:model",ProductController.getCollectionAndModel); // get collection and  model 
router.get("/api/products/collection/:collectionName/size/:size",ProductController.getCollectionAndSize); // get collection and size 
router.get("/api/products/league/:league/model/:model/collection/:collectionName/size/:size",ProductController.getCollectionAndModelAndSize); // get collection , model and size 
router.get('/api/products/CollectionsNames' , ProductController.getCollectionsNames); // Get collectionsNames
router.get('/api/products/LeagueNames' , ProductController.getLeagueNames)
router.get('/api/products/league/:league' , ProductController.getByLeague) // get by league
router.get('/api/products/delete-product/:code' , ProductController.deleteSingleProduct) // delete single product 
router.get('/api/products/delete-products' , ProductController.deleteAllProducts) // delete all products
router.post('/api/products/editProduct/:code' , ProductController.editProduct); // edit Product by code
router.get('/api/products/sizes' , ProductController.getBySize); // get sizes
router.get('/api/products/:type/:brandName/:collectionName/:size' , ProductController.getTypeBrandNameCollectionNameSize); //get type brandname collectionname size
// Cart
router.get('/api/products/cart', ProductController.getProductsOnCart)
router.post('/api/products/cart/:code' , ProductController.postProductsOnCart);
router.post('/api/products/cart/increase/:code' , ProductController.increaseQuantity)
router.post('/api/products/cart/decrease/:code' , ProductController.decreaseQuantity)
router.get('/api/products/cart/delete-product/:code' , ProductController.deleteProductFromCart)
router.get('/api/products/cart/delete-products' , ProductController.deleteAllProductsFromCart)


// AUTHENTICATION

router.get('/api/auth/getUsers' , authController.getUsers)
router.post('/api/auth/logIn' , authController.logIn)
router.post('/api/auth/signUp' ,authController.signUp)

// REVIEWS

router.get('/api/reviews' , authController.getReviews)
router.post('/api/reviews' , authController.postReviews)
module.exports = router;
