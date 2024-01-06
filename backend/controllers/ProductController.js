const ProductModel = require("../models/ProductSchema");
const NameOfCollection = require("../models/NavBarSchema");
const Cart = require("../models/CartSchema");

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

exports.getProductsOnCart = (req, res, next) => {
  Cart.find()
    .then((products) => {
      res.json(products);
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

exports.getByLeague = (req, res, next) => {
  const league = req.params.league;
  ProductModel.find({ league })
    .then((product) => {
      res.json(product);
      console.log(product);
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


exports.getCollectionAndModel = (req , res, next) => {
  const collectionName = req.params.collectionName;
  const model = req.params.model;  
  ProductModel.find({ model , collectionName})
  .then(products => {
    res.json(products)
    console.log(products);
  })
  .catch(err => { 
    console.log(err);
  })
}


exports.getCollectionAndSize = (req , res, next) => {
  const collectionName = req.params.collectionName;
  const size = req.params.size;
  ProductModel.find({ size , collectionName})
  .then(products => {
    res.json(products)
    console.log(products);
  })
  .catch(err => { 
    console.log(err);
  })
}


exports.getCollectionAndModelAndSize = (req , res, next) => {
  const collectionName = req.params.collectionName;
  const size = req.params.size;
  const model = req.params.model;
  ProductModel.find({model , size , collectionName})
  .then(products => {
    res.json(products)
    console.log(products);
  })
  .catch(err => { 
    console.log(err);
  })
}


exports.getCollectionsNames = (req , res , next ) => {

  NameOfCollection.find()
  .then(collectionNames => {
    res.json(collectionNames)
    console.log(collectionNames)
  }).catch(err => {
    console.log(err);
  })
}



// => POST

exports.postAddProduct = async (req, res, next) => {
  const code = req.body.code;
  const model = req.body.model;
  const league = req.body.league;
  const kit = req.body.kit;
  const collectionName = req.body.collectionName;
  const price = req.body.price;
  const size = req.body.size;
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  const quantity = req.body.quantity;
  const description = req.body.description;
  // const image = req.body.file;

  const existingCollectionName = await NameOfCollection.findOne({ Name: collectionName});

  if (existingCollectionName) {
    console.log('NavBar already exists. No action taken.');
  } else {
    const newNameOfCollection = new NameOfCollection({
      Name: collectionName,
    });
    newNameOfCollection.save();
    console.log('New NavBar added:', newNameOfCollection);
  }

  const existingProduct = await ProductModel.find({ code : code});
  if(existingProduct) {
    console.log('product exist');
  } else {
    const product = new ProductModel({
      code: code,
      model : model,
      league : league,
      kit : kit,
      collectionName: collectionName,
      price: price,
      quantity: quantity,
      size: size,
      sizes : sizes,
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
  }


  


};

exports.postProductsOnCart = async (req, res, next) => {
  const code = req.params.code;

  const existingProductInDB = await ProductModel.find({code})
  if (existingProductInDB) {
    const cartProduct = new Cart(existingProductInDB);
    await cartProduct.save();
    res.json('product saved')
    console.log('product saved :' , existingProductInDB);
    return cartProduct;
  } else {
    throw new Error('product not found in DB')
  }

  const existingProductInCart = await Cart.find({ code });
  if (existingProductInCart) {
    console.log("Product already exists");
  } else {
    ProductModel.find({ code })
      .then((product) => {
        const newProductToCart = new Cart(product);
        newProductToCart.save();
        console.log('product saaved');
        res.json(product)
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

// => EDIT

exports.editProduct = (req, res, next) => {
  const code = req.params.code;
  const UpdatedCode = req.body.code;
  const UpdatedModel = req.body.model;
  const Updatedleague = req.body.league;
  const UpdatedKit = req.body.kit;
  const UpdatedCollectionName = req.body.collectionName;
  const UpdatedPrice = req.body.price;
  const UpdatedSize = req.body.size;
  const UpdatedQuantity = req.body.quantity;
  const UpdatedDescription = req.body.description;
  // const UpdatedImage = req.body.file;

  ProductModel.findOneAndUpdate(
    { code },
    {
      code: UpdatedCode,
      model: UpdatedModel,
      league: Updatedleague,
      kit : UpdatedKit,
      collectionName: UpdatedCollectionName,
      price: UpdatedPrice,
      quantity: UpdatedQuantity,
      size: UpdatedSize,
      description: UpdatedDescription,
    }
  )
    .then((newProduct) => {
      res.json(newProduct);
      console.log(newProduct);
      console.log("PRODUCT EDITED");
    })
    .catch((err) => {
      console.log(err);
    });
};

// => DELETE

exports.deleteSingleProduct = (req, res, next) => {
  const code = req.params.code;
  ProductModel.findOneAndDelete({ code })
    .then((result) => {
      res.json("PRODUCT DELETED SUCCESSFULLY!");
      console.log("PRODUCT DELETED SUCCESSFULLY!");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteAllProducts = (req, res, next) => {
  ProductModel.deleteMany()
    .then((result) => {
      res.json("PRODUCTS DELETED SUCCESSFULLY!");
      console.log("PRODUCTS DELETED SUCCESSFULLY!");
    })
    .catch((err) => {
      console.log(err);
    });
};

