const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const authController = require('../controllers/authController')

// => PRODUCTS IN HOME & STOCK

router.get('/api/products/type/:type' , ProductController.getBytype)
router.get('/api/products/types' , ProductController.getTypes)
router.get("/api/products", ProductController.getProducts); // get all products
router.get("/api/products/collection/:collectionName",ProductController.getCollection); // get collection
router.get("/api/products/league/:league/model/:model/collection/:collectionName/size/:size",ProductController.getCollectionAndModelAndSize); // get collection , model and size 
router.get("/api/products/code/:code",ProductController.getSingleProduct); // get single product
router.get("/api/products/size/:size", ProductController.getBySize); // get by size
router.get("/api/products/collection/:collectionName/model/:model",ProductController.getCollectionAndModel); // get collection and  model 
router.get("/api/products/collection/:collectionName/size/:size",ProductController.getCollectionAndSize); // get collection and size 
router.get('/api/products/CollectionsNames' , ProductController.getCollectionsNames); // Get collectionsNames
router.get('/api/products/LeagueOrBrandNames' , ProductController.getLeagueOrBrand) // get leagueOrBrand
router.get('/api/products/league/:league' , ProductController.getByLeague) // get by league
router.get('/api/products/delete-product/:code' , ProductController.deleteSingleProduct) // delete single product 
router.get('/api/products/delete-products' , ProductController.deleteAllProducts) // delete all products
router.post('/api/products/editProduct/:code' , ProductController.editProduct); // edit Product by code
router.get('/api/products/sizes' , ProductController.getSizes); // get sizes
router.get('/api/products/models' , ProductController.getModels) // get models 
router.get('/api/products/:type/:brandName' ,ProductController.getByTypeAndBrandName); // Get by type and brandname 
router.get('/api/products/:type/:brandName/:collectionName' , ProductController.getTypeBrandNameCollectionName); // Get by type , brandname and collectionName
router.get('/api/products/:type/:brandName/:collectionName/:model' , ProductController.getTypeBrandNameCollectionNameModel); // Get by type , brandname  , collectionName and Model
router.get('/api/products/:type/:brandName/:collectionName/:model/:size' , ProductController.getTypeBrandNameCollectionNameModelSize) // Get by type , brandname , collectionname , model and Size 
// Cart
router.get('/api/ProductsOncart', ProductController.getProductsOnCart)
router.post('/api/PostOncart/:code' , ProductController.postProductsOnCart);
router.post('/api/increaseQuantity/:code' , ProductController.increaseQuantity)
router.post('/api/decreaseQuantity/:code' , ProductController.decreaseQuantity)
router.get('/api/deleteproductFromCart/:code' , ProductController.deleteProductFromCart)
router.get('/api/deleteproductsFromCart' , ProductController.deleteAllProductsFromCart)

// New Orders
router.get('/api/orders' , ProductController.getOrders) // orders API
router.post('/api/postOrder' , ProductController.postOrder) // post products on cart and Client info in the orders
router.get('/api/deleteOrder/:orderId' , ProductController.deleteOrder) // delete one order
router.get('/api/deleteAllOrders' , ProductController.deleteAllOrders)  // delete all orders

// Archive
router.get('/api/archive' , ProductController.getArchive) // archive API
router.post('/api/postToArchive/:productId' , ProductController.postToArchive) // post from orders to archive
router.get('/api/archive/deleteOrderFromArchive/:orderId' ,ProductController.deleteOrderFromArchive) // delete order from archive
router.get('/api/archive/deleteAllOrdersFromArchive' , ProductController.deleteAllOrdersFromArchive) // delete orders from archive
// router.post('/api/postAllToArchive' , ProductController.postAllToArchive) // post all orders to archive 


// AUTHENTICATION

// router.get('/api/auth/getUsers' , authController.getUsers);
// router.post('/api/auth/logIn' , authController.logIn)
// // router.post('/api/auth/logOut' , authController.logOut) // logout API
// router.post('/api/auth/signUp' ,authController.signUp)

// REVIEWS

router.get('/api/reviews' , authController.getReviews)
router.post('/api/reviews' , authController.postReviews)
module.exports = router;
