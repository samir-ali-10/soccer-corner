const ProductModel = require("../models/ProductSchema");
const NameOfCollection = require("../models/NavBarSchema");



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


  

  const product = new ProductModel({
    code: code,
    model : model,
    league : league,
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
};



// => EDIT

exports.editProduct = (req , res , next) => {
  const code = req.params.code;
  const UpdatedModel = req.body.model;
  const Updatedleague = req.body.league;
  const UpdatedCollectionName = req.body.collectionName;
  const UpdatedPrice = req.body.price;
  const UpdatedSize = req.body.size;
  const UpdatedQuantity = req.body.quantity;
  const UpdatedDescription = req.body.description;
  // const UpdatedImage = req.body.file;

  ProductModel.findOneAndUpdate({code} , {
    model : UpdatedModel,
    league : Updatedleague,
    collectionName: UpdatedCollectionName,
    price: UpdatedPrice,
    quantity: UpdatedQuantity,
    size: UpdatedSize,
    description: UpdatedDescription,
  })
  .then(newProduct => {
    res.json(newProduct);
    console.log(newProduct);
    console.log('PRODUCT EDITED');
  })
  .catch(err => {
    console.log(err);
  })

}


// => DELETE


exports.deleteSingleProduct = (req , res , next ) => {
  const code = req.params.code;
  ProductModel.findOneAndDelete({code})
  .then((result) => {
    res.json('PRODUCT DELETED SUCCESSFULLY!')
    console.log('PRODUCT DELETED SUCCESSFULLY!');
  })
  .catch(err => {
    console.log(err);
  })
}

exports.deleteAllProducts = (req , res , next) => {
  ProductModel.deleteMany()
  .then((result) => {
    res.json('PRODUCTS DELETED SUCCESSFULLY!')
    console.log('PRODUCTS DELETED SUCCESSFULLY!');
  })
  .catch(err => {
    console.log(err);
  })
}




// exports.postNewCollectionName = (req , res , next) => {
//   const collectionName = req.params.collectionName; 
//   const collectionArray = new CollectionName();

//   collectionArray.collectionNames.push(collectionName);
//   collectionArray.save()
//   .then(collectionName => {
//     res.json(collectionName)
//     console.log('collection is added');
//   }).catch(err => {
//     console.log(err);
//   });
// }


