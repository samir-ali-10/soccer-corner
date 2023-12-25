const ProductModel = require("../models/ProductSchema");

exports.getProducts = (req, res, next) => {
  ProductModel.find()
    .then((products) => {
      res.json(products); // returning a json api
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postAddProduct = (req, res, next) => {
  const code = req.body.code;
  const name = req.body.name;
  const price = req.body.price;
  const size = req.body.size;
  const quantity = req.body.quantity;
  const description = req.body.description;
  const image = req.body.file;
  const product = new ProductModel({
    code: code,
    name: name,
    price: price,
    quantity: quantity,
    size: size,
    description: description,
    image: image,
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
