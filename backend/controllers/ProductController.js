// const Product = require("../models/ProductModel");
const ProductModel = require("../models/ProductSchema");

exports.getProducts = (req, res, next) => {
  ProductModel.find()
    .then((products) => {
      res.json(products); // returning a json api
    })
    .catch((err) => {
      console.log(err);
    }); // on this function i want to send products as json data in api and send to samir
};

// exports.postAddProduct = (req, res, next) => {
//   // function to add new products
//   const code = req.body.code;
//   const name = req.body.name;
//   const price = req.body.price;
//   const size = req.body.size;
//   const quantity = req.body.quantity;
//   const description = req.body.description;
//   const file = req.body.file;
//   const product = new Product({
//     code: code,
//     name: name,
//     price: price,
//     size: size,
//     quantity: quantity,
//     description: description,
//     file: file,
//   });
//   product
//     .save()
//     .then((products) => {
//       console.log("Product saved");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// exports.getSingleProduct = (req, res, next) => {
//   const prodId = req.params.productId; // ********************** want to define params
//   Product.findById(prodId)
//     .then((product) => {
//       res.json(product);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
