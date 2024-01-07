const ProductModel = require("../models/ProductSchema");
const NameOfCollection = require("../models/NavBarSchema");
const Cart = require("../models/CartSchema");
const LeagueNames = require('../models/LeagueSchema')
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

exports.getLeagueNames = (req , res , next) => {
  LeagueNames.find()
  .then(leagueNames => {
    res.json(leagueNames)
    console.log(leagueNames)
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

  const existingProduct = await ProductModel.findOne({ code });

  if (existingProduct) {
    console.log('Product is already exist ');
    return res.json("product already exist")
  }

  const existingCollectionName = await NameOfCollection.findOne({ Name: collectionName });

  if (existingCollectionName) {
    console.log('collectionName is already exist');
  }
   else {
    // If collectionName does not exist, add it to the collection
    const newNameOfCollection = new NameOfCollection({
      Name: collectionName,
    });
    await newNameOfCollection.save();
    console.log('New collectionName added:', newNameOfCollection);
  }



  const existingLeagueName = await LeagueNames.findOne({ leagueName: league });

  if (existingLeagueName) {
    console.log('league is already exist');
  }
   else {
    const newLeagueName = new LeagueNames({
      leagueName: league,
    });
    await newLeagueName.save();
    console.log('New league added:', newLeagueName);
  }




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
    await product.save();
    console.log('New product added:', product);
};



exports.postProductsOnCart = async (req, res, next) => {
  const code = req.params.code;
  const existingProduct = await ProductModel.findOne({ code });


  if (existingProduct) {
    const productInCart = await Cart.findOne({ code });

    if (!productInCart) {
      const productData = {
        code: existingProduct.code,
        model: existingProduct.model,
        league: existingProduct.league,
        kit: existingProduct.kit,
        collectionName: existingProduct.collectionName,
        price: existingProduct.price,
        size: existingProduct.size,
        quantity: existingProduct.quantity,
        description: existingProduct.description,
      };

      const cartProduct = new Cart(productData);
      await cartProduct.save();
      console.log('Product saved:', existingProduct);
      res.json('Product saved');
      return cartProduct;
    } else {

      const quantityChange = req.body.increase ? 1 : -1; // Increase by 1 or decrease by 1
      productInCart.quantity += quantityChange;
      await productInCart.save();
      console.log('Product already exists in the cart');
      res.json('Product already exists in the cart');   
    }
  }
else {
  console.log('Product not found in DB');
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


exports.deleteProductFromCart = (req , res , next) => {
  const code = req.params.code;
  Cart.findOneAndDelete({ code })
    .then((result) => {
      res.json("PRODUCT DELETED SUCCESSFULLY!");
      console.log("PRODUCT DELETED SUCCESSFULLY!");
    })
    .catch((err) => {
      console.log(err);
    });
}

exports.deleteAllProductsFromCart = (req , res , next) => {
  Cart.deleteMany()
  .then((result) => {
    res.json("PRODUCTS DELETED SUCCESSFULLY!");
    console.log("PRODUCTS DELETED SUCCESSFULLY!");
  })
  .catch((err) => {
    console.log(err);
  });
}


