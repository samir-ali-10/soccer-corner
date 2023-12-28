const ProductModel = require("../models/ProductSchema");

exports.getProducts = (req, res, next) => {
  ProductModel.find()
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      console.log(err);
    });
};

// exports.getCollection = (req, res, next) => {
//   const collection = req.params.collection;
//   ProductModel.find({ collection })
//     .then((products) => {
//       res.json(products);
//       console.log(products);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

exports.getSingleProductByCode = (req, res, next) => {
  const code = req.params.code;
  ProductModel.findOne({ code })
    .then((product) => {
      res.json(product);
      console.log(product);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postAddProduct = (req, res, next) => {
  const code = req.body.code;
  const collection = req.body.collection;
  const price = req.body.price;
  const size = req.body.size;
  const quantity = req.body.quantity;
  const description = req.body.description;
  // const image = req.body.file;
  const product = new ProductModel({
    code: code,
    collection: collection,
    price: price,
    quantity: quantity,
    size: size,
    description: description,
    // image: image,
  });
  product
    .save()
    .then((products) => {
      console.log(products);
    })
    .catch((err) => {
      console.log(err);
    });
};
