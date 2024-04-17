const types = require("../models/TypesSchema");
const NameOfCollection = require("../models/NavBarSchema");
const Cart = require("../models/CartSchema");
const LeagueOrBrand = require("../models/LeagueOrBrandSchema");
const ProductModel = require("../models/ProductSchema");
const Size = require("../models/SizeSchema");
const Model = require("../models/ModelSchema");
const Archive = require('../models/ArchiveSchema');
const Order = require("../models/NewOrdersSchema");
// => GET

exports.getTypes = (req, res, next) => {
  types
    .find()
    .then((types) => {
      res.json(types);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getModels = (req, res) => {
  Model.find()
    .then((models) => {
      res.json(models);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getSizes = (req, res) => {
  Size.find()
    .then((size) => {
      res.json(size);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getByTypeAndBrandName = (req, res) => {
  const type = req.params.type;
  const brandName = req.params.brandName;

  ProductModel.find({type : type , BrandName : brandName})
  .then(products => {
    res.json(products)
  })
  .catch(err => {
    console.log(err);
  })


}


exports.getTypeBrandNameCollectionName = (req, res) => {
  const type = req.params.type;
  const brandName = req.params.brandName;
  const collectionName = req.params.collectionName;

  ProductModel.find({
    type: type,
    BrandName: brandName,
    collectionName: collectionName,
  })
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getTypeBrandNameCollectionNameModel = (req, res) => {
  const type = req.params.type;
  const brandName = req.params.brandName;
  const collectionName = req.params.collectionName;
  const model = req.params.model;

  ProductModel.find({
    type: type,
    BrandName: brandName,
    collectionName: collectionName,
    model : model
  })
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getTypeBrandNameCollectionNameModelSize = (req, res) => {
  const type = req.params.type;
  const brandName = req.params.brandName;
  const collectionName = req.params.collectionName;
  const model = req.params.model;
  const size = req.params.size;

  ProductModel.find({
    type: type,
    BrandName: brandName,
    collectionName: collectionName,
    model : model,
    size : size
  })
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      console.log(err);
    });
};







exports.getBytype = (req, res, next) => {
  const type = req.params.type;
  ProductModel.find({ type })
    .then((product) => {
      res.json(product);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
  ProductModel.find()
    .then((products) => {
      res.json(products);
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

exports.getOrders = (req , res , next) => {
  Order.find()
  .then((products) => {
    res.json(products);
  }).catch((err) => {
    console.log(err);
  });
}
exports.postOrder = async (req , res , next) => {
  const name = req.body.name;
  const zone = req.body.zone;
  const area = req.body.area;
  const phone = req.body.phone;
  const address = req.body.address;
  const note = req.body.note;

  function generateOrderNumber() {
    // Logic to generate a unique order number
    // For example, you can use a combination of current timestamp and a random number
    return Date.now().toString() + Math.floor(Math.random() * 1000);
  }
  const orderNumber = generateOrderNumber();



  const productsInCart = await Cart.find({});

  if (productsInCart.length === 0) {
      console.log('cart is empty');
      return res.status(400).json('cart is empty')
  }

    const ProductsData =  productsInCart.map(item => ({
      code : item.code,
      image : item.image,
      size : item.size,
      quantity  : item.quantity,
      price : item.price
    }))

  const order = new Order({
    orderId : orderNumber,
    name : name,
    area : area,
    zone : zone,
    phone : phone,
    address : address,
    note : note,
    productsOrdered : ProductsData
  })

  await order.save();

  console.log('order saved ', order);

  await Cart.deleteMany({});

} 

exports.deleteOrder = (req , res , next) => {

  const orderId = req.params.orderId;

  Order.findOneAndDelete({ orderId: orderId })
  .then((result) => {
    res.json('order deleted successfully')
    console.log('order deleted successfully');
  })
  .catch(err => {
    console.log(err);
  })
}

exports.deleteOneProductFromNewOrder = async (req , res , next) => {
  const productId = req.params.productId
  const orderId = req.params.orderId
  const order = await Order.findOne({ orderId : orderId })
  order.productsOrdered = order.productsOrdered.filter(prod => prod._id.toString() !== productId);
  await order.save();
  console.log('product deleted succesfully');

}

exports.deleteAllOrders = (req , res , next) => {

  Order.deleteMany()
  .then(result => {
    res.json('orders deleted successfully');
    console.log('orders deleted successfully');
  })
  .catch(err => {
    console.log(err);
  })
}

exports.returnsStatus = async (req , res, next) => {
  const productId = req.params.productId;
  const orderId = req.params.orderId
  const existOrderInArchive =  await Archive.findOne({ orderId : orderId });  
  const productSelected =  existOrderInArchive.productsOrdered.find(prod => prod._id.toString() === productId); 
    productSelected.status = 'returns'; 
    await existOrderInArchive.save();
    console.log('product status is now returns');
}

exports.moneyCollectedStatus = async (req , res, next) => {
  const productId = req.params.productId;
  const orderId = req.params.orderId
  const existOrderInArchive =  await Archive.findOne({ orderId : orderId });  
  const productSelected =  existOrderInArchive.productsOrdered.find(prod => prod._id.toString() === productId); 
    productSelected.status = 'moneyCollected'; 
    await existOrderInArchive.save();
    console.log('product status is now moneyCollected');
}

exports.deliveredStatus = async (req , res, next) => {
  const productId = req.params.productId;
  const orderId = req.params.orderId
  const existOrderInArchive =  await Archive.findOne({ orderId : orderId });  
  const productSelected =  existOrderInArchive.productsOrdered.find(prod => prod._id.toString() === productId); 
    productSelected.status = 'delivered'; 
    await existOrderInArchive.save();
    console.log('product status is now delivered');
}

exports.outForDeliveryStatus = async (req , res, next) => {
  const productId = req.params.productId;
  const orderId = req.params.orderId
  const existOrderInArchive =  await Archive.findOne({ orderId : orderId });  
  const productSelected =  existOrderInArchive.productsOrdered.find(prod => prod._id.toString() === productId); 
    productSelected.status = 'outForDelivery'; 
    await existOrderInArchive.save();
    console.log('product status is now outForDelivery');
}



exports.getArchive = (req , res , next) => {
  Archive.find()
  .then((products) => {
    res.json(products);
  }).catch((err) => {
    console.log(err);
  });
}

exports.postToArchive = async (req , res , next ) => {
  
const orderId = req.params.orderId;
const existProductInArchive = await Archive.findOne({ orderId : orderId })
const productInOrders = await Order.findOne({ orderId :  orderId })

  if (existProductInArchive) {
    console.log('order already exist in archive ');
    return res.json("order already exist in archive");

  }
  const productToArchive = new Archive({
    orderId : productInOrders.orderId,
    name : productInOrders.name ,
    phone : productInOrders.phone,
    area : productInOrders.area ,
    zone : productInOrders.zone ,
    productsOrdered : productInOrders.productsOrdered
  })
 await productToArchive.save();
 console.log('order saved in archive' , productToArchive);
}

exports.postAllToArchive = async (req, res, next) => {
  try {
    // Retrieve all orders from the order collection
    const ordersInOrdersCollection = await Order.find();

    // Iterate through each order and save it to the archive collection
    for (const order of ordersInOrdersCollection) {
      const orderId = order.orderId;

      // Check if the order with the given orderId already exists in the archive
      const existOrderInArchive = await Archive.findOne({ orderId: orderId });

      if (existOrderInArchive) {
        console.log(`order already exists in archive`);
        continue; // Skip to the next order
      }

      // Create a new Archive entry using details from the order in orders
      const orderToArchive = new Archive({
        orderId : order.orderId,
        name: order.name,
        phone: order.phone,
        area: order.area,
        zone: order.zone,
        productsOrdered: order.productsOrdered,
      });

      // Save the new Archive entry
      await orderToArchive.save();

      console.log(`order ${orderId} saved in archive`);
    }

    console.log('All orders saved in archive');
    return res.json('All  orders saved in archive');
  } catch (error) {
    console.error('Error in postAllToArchive:', error.message);
    return res.status(500).json('Internal Server Error');
  }
};

exports.deleteOneProductFromOrderInArchive = async (req , res , next) => {
  const productId = req.params.productId
  const orderId = req.params.orderId
  const order = await Archive.findOne({ orderId : orderId })
  order.productsOrdered = order.productsOrdered.filter(prod => prod._id.toString() !== productId);
  await order.save();
  console.log('product deleted succesfully');

}

exports.deleteOrderFromArchive = (req , res, next) => {
  const orderId = req.params.orderId;
  Archive.findOneAndDelete({ orderId : orderId })
  .then(result => {
    res.json('order from archive deleted successfully')
    console.log('order from archive deleted successfully');
  })
  .catch(err => {
    console.log(err);
  })
}

exports.deleteAllOrdersFromArchive = (req , res , next) => {
  Archive.deleteMany()
  .then(result => {
    res.json('orders from archive deleted successfully');
    console.log('orders from archive deleted successfully');
  })
  .catch(err => {
    console.log(err);
  })
}



exports.getCollection = (req, res, next) => {
  const collectionName = req.params.collectionName;
  ProductModel.find({ collectionName })
    .then((products) => {
      res.json(products);
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
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCollectionAndModel = (req, res, next) => {
  const collectionName = req.params.collectionName;
  const model = req.params.model;
  ProductModel.find({ model, collectionName })
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCollectionAndSize = (req, res, next) => {
  const collectionName = req.params.collectionName;
  const size = req.params.size;
  ProductModel.find({ size, collectionName })
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCollectionAndModelAndSize = (req, res, next) => {
  const collectionName = req.params.collectionName;
  const size = req.params.size;
  const model = req.params.model;
  ProductModel.find({ model, size, collectionName })
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCollectionsNames = (req, res, next) => {
  NameOfCollection.find()
    .then((collectionNames) => {
      res.json(collectionNames);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getLeagueOrBrand = (req, res, next) => {
  LeagueOrBrand.find()
    .then((LeagueOrBrandNames) => {
      res.json(LeagueOrBrandNames);
    })
    .catch((err) => {
      console.log(err);
    });
};

// => POST

exports.postAddProduct = async (req, res, next) => {
  const code = req.body.code;
  const model = req.body.model;
  const BrandName = req.body.BrandName;
  const league = req.body.league;
  const kit = req.body.kit;
  const type = req.body.type;
  const newCollection = req.body.newCollection;
  const sale = req.body.sale;
  const collectionName = req.body.collectionName;
  const price = req.body.price;
  const size = req.body.size;
  const quantity = req.body.quantity;
  const description = req.body.description;
  let availableSizes = req.body.availableSizes;
  availableSizes = availableSizes.split(',');

  // => CHECK IF PRODUCT EXIST

  const existingProduct = await ProductModel.findOne({ code });
  if (existingProduct) {  
    console.log("Product is already exist ");
    return res.json("product already exist");
  }

  // => CHECK IF THE COLLECTIONNAME EXIST

  const existingCollectionName = await NameOfCollection.findOne({
    Name: collectionName,
  });

  if (existingCollectionName) {
    console.log("collectionName is already exist");
  } else {
    const newNameOfCollection = new NameOfCollection({
      Name: collectionName,
    });
    await newNameOfCollection.save();
    console.log("New collectionName added:", newNameOfCollection);
  }

  // =>  CHECK IF THE LEAGUENAME EXIST
  const existingLeague = await LeagueOrBrand.findOne({ leagueOrBrand : league });

  if (existingLeague) {
    console.log("league is already exist");
  } else {
    const newLeague = new LeagueOrBrand({
      leagueOrBrand: league,
    });
    await newLeague.save();
    console.log("New league added:", newLeague);
  }

    // =>  CHECK IF THE BRANDNAME EXIST
    const existingBrandName = await LeagueOrBrand.findOne({ leagueOrBrand : BrandName });
  
    if (existingBrandName) {
      console.log("BrandName is already exist");
    } else {
      const newBrandName = new LeagueOrBrand({
        leagueOrBrand: BrandName,
      });
      await newBrandName.save();
      console.log("New Brandname added:", newBrandName);
    }



  // => CHECK IF THE SIZE EXIST
  const existingSize = await Size.findOne({ size: size });

  if (existingSize) {
    console.log("size is already exist");
  } else {
    const NewSize = new Size({
      size: size,
    });
    await NewSize.save();
    console.log("New size added:", NewSize);
  }

  // => CHECK IF THE MODEL EXIST

  const existingModel = await Model.findOne({ model: model });

  if (existingModel) {
    console.log("model is already exist");
  } else {
    const NewModel = new Model({
      model: model,
    });
    await NewModel.save();
    console.log("New model added:", NewModel);
  }

  const product = new ProductModel({
    code: code,
    model: model,
    league: league,
    kit: kit,
    newCollection: newCollection,
    collectionName: collectionName,
    BrandName: BrandName,
    type: type,
    sale: sale,
    price: price,
    quantity: quantity,
    size: size,
    description: description,
    availableSizes : availableSizes
  });

  if (req.files) {
    let path = "";
    req.files.forEach(function (files, index, arr) {
      path = path + files.path + ",";
    });
    path = path.substring(0, path.lastIndexOf(","));
    product.images = path;
  } else {
    console.log("no image provided");
  }

  await product.save();
  console.log("New product added:", product);
};

exports.increaseQuantity = async (req, res) => {
  const code = req.params.code;

  try {
    const productInCart = await Cart.findOne({ code: code });
    const productInDB = await ProductModel.findOne({ code: code });

    if (productInCart && productInDB) {
      if (productInDB.quantity > 0) {
        productInCart.quantity += 1; // Increase quantity in the cart by 1 (or any desired value)
        productInDB.quantity -= 1; // Decrease quantity in the database by 1 (or any desired value)

        await productInCart.save();
        await productInDB.save();

        console.log('Product quantity increased:', productInCart);
        return res.json("Product quantity increased");
      } else {
        console.log("Product is out of stock");
        return res.status(400).json("Product is out of stock");
      }
    } else {
      console.log("Product not found in the cart or DB");
      return res.status(404).json("Product not found in the cart or DB");
    }
  } catch (error) {
    console.error("Error increasing quantity:", error.message);
    return res.status(500).json("Internal Server Error");
  }
};

exports.decreaseQuantity = async (req, res) => {
  const code = req.params.code;

  try {
    const productInCart = await Cart.findOne({ code: code });
    const productInDB = await ProductModel.findOne({ code: code });

    if (productInCart && productInDB) {
      if (productInCart.quantity > 0) {
        productInCart.quantity -= 1; // Decrease quantity in the cart by 1 (or any desired value)
        productInDB.quantity += 1; // Increase quantity in the database by 1 (or any desired value)

        await productInCart.save();
        await productInDB.save();

        console.log('Product quantity decreased:', productInCart);
        return res.json("Product quantity decreased");
      } else {
        console.log("Product quantity in cart is already 0");
        return res.status(400).json("Product quantity in cart is already 0");
      }
    } else {
      console.log("Product not found in the cart or DB");
      return res.status(404).json("Product not found in the cart or DB");
    }
  } catch (error) {
    console.error("Error decreasing quantity:", error.message);
    return res.status(500).json("Internal Server Error");
  }
};

exports.postProductsOnCart = async (req, res, next) => {
  try {
    const code = req.params.code;
    const selectedSize = req.body.selectedSize;
    const existingProduct = await ProductModel.findOne({ code });

    if (!existingProduct) {
      console.log("Product not found in DB");
      return res.status(404).json("Product not found in DB");
    }

    if (existingProduct.quantity <= 0) {
      console.log("Product is out of stock");
      return res.status(400).json("Product is out of stock");
    }

    const productInCart = await Cart.findOne({ code });

    if (!productInCart) {
      const productData = {
        code: existingProduct.code,
        model: existingProduct.model,
        league: existingProduct.league,
        kit: existingProduct.kit,
        BrandName: existingProduct.BrandName,
        collectionName: existingProduct.collectionName,
        price: existingProduct.price,
        size: selectedSize ,
        sale: existingProduct.sale,
        quantity: 1,
        description: existingProduct.description,
      };

      const cartProduct = new Cart(productData);
      await cartProduct.save();

      existingProduct.quantity -= 1;
      await existingProduct.save();

      console.log("Product saved:", existingProduct);
      return res.json("Product saved");
    } else {
      console.log("Product already exists in the cart");
      return res.json("Product already exists in the cart");
    }
  } catch (error) {
    console.error("Error posting product on cart:", error.message);
    return res.status(500).json("Internal Server Error");
  }
};

// => EDIT

exports.editProduct = (req, res, next) => {
  const code = req.params.code;
  const UpdatedCode = req.body.code;
  const UpdatedModel = req.body.model;
  const Updatedleague = req.body.league;
  const UpdatedBrandName = req.body.BrandName;
  const UpdatedKit = req.body.kit;
  const UpdatedType = req.body.type;
  const UpdatedSale = req.body.sale;
  const UpdatedCollectionName = req.body.collectionName;
  const UpdatedPrice = req.body.price;
  const UpdatedSize = req.body.size;
  const UpdatedQuantity = req.body.quantity;
  const UpdatedDescription = req.body.description;
  let UpdatedAvailableSizes = req.body.availableSizes;
  UpdatedAvailableSizes = UpdatedAvailableSizes.split(',');

  ProductModel.findOneAndUpdate(
    { code },
    {
      code: UpdatedCode,
      model: UpdatedModel,
      league: Updatedleague,
      kit: UpdatedKit,
      collectionName: UpdatedCollectionName,
      BrandName: UpdatedBrandName,
      sale: UpdatedSale,
      price: UpdatedPrice,
      type: UpdatedType,
      quantity: UpdatedQuantity,
      size: UpdatedSize,
      description: UpdatedDescription,
      availableSizes : UpdatedAvailableSizes,
    }
  )
    .then((newProduct) => {
      res.json(newProduct);
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

exports.deleteProductFromCart = (req, res, next) => {
  const code = req.params.code;
  Cart.findOneAndDelete({ code })
    .then((result) => {
      res.json("PRODUCT DELETED SUCCESSFULLY!");
      console.log("PRODUCT DELETED SUCCESSFULLY!");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteAllProductsFromCart = (req, res, next) => {
  Cart.deleteMany()
    .then((result) => {
      res.json("PRODUCTS DELETED SUCCESSFULLY!");
      console.log("PRODUCTS DELETED SUCCESSFULLY!");
    })
    .catch((err) => {
      console.log(err);
    });
};
