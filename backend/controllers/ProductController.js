const ProductModel = require("../models/ProductSchema");



// => GET

exports.getProducts = (req, res, next) => {
  ProductModel.find()
    .then((products) => {
      res.json(products);
      console.log(products);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCollection = (req, res, next) => {
  const collectionName = req.params.collectionName;
  ProductModel.find({ collectionName })
    .then((products) => {
      res.json(products);
      console.log(products);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getSingleProduct = (req, res, next) => {
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

exports.getBySize = (req, res, next) => {
  const size = req.params.size;
  ProductModel.find({ size })
    .then((products) => {
      res.json(products);
      console.log(products);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getByModel = (req , res, next) => {
  const model = req.params.model;
  ProductModel.find({model})
  .then(product => {
    res.json(product)
    console.log(product);
  })
  .catch(err => {
    console.log(err);
  })
}




// => POST

exports.postAddProduct = (req, res, next) => {
  const code = req.body.code;
  const model = req.body.model;
  const collectionName = req.body.collectionName;
  const price = req.body.price;
  const size = req.body.size;
  const quantity = req.body.quantity;
  const description = req.body.description;
  // const image = req.body.file;
  const product = new ProductModel({
    code: code,
    model : model,
    collectionName: collectionName,
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



// => EDIT

exports.editProduct = (req , res , next) => {
  const code = req.params.code;
  const UpdatedModel = req.body.model;
  const UpdatedCollectionName = req.body.collectionName;
  const UpdatedPrice = req.body.price;
  const UpdatedSize = req.body.size;
  const UpdatedQuantity = req.body.quantity;
  const UpdatedDescription = req.body.description;
  // const UpdatedImage = req.body.file;

  ProductModel.find({code})
    .then(product => {
      product.model = UpdatedModel;
      product.collectionName = UpdatedCollectionName;
      product.price = UpdatedPrice;
      product.size = UpdatedSize;
      product.quantity = UpdatedQuantity;
      product.description = UpdatedDescription;
      // image : UpdatedImage
      return ProductModel.save();
  }).then(newProduct => {
    res.json(newProduct);
    console.log(newProduct);
  })
  .catch(err => {
    console.log(err);
  })

}


