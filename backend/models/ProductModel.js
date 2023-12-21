const getDb = require("../util/database").getDb;

class Product {
  constructor(code, name, price, size, quantity, description, productImg) {
    this.code = code;
    this.name = name;
    this.price = price;
    this.size = size;
    this.quantity = quantity;
    this.description = description;
    this.productImg = productImg;
  }

  save() {
    const db = getDb();
    return db
      .collection("Products")
      .insertOne(this)
      .then((result) => {
        console.log(result);
      }) //
      .catch((err) => {
        console.log(err);
      }); // which collection i want & insert
  }
  static fetchAll() {
    const db = getDb();
    return db
      .getCollection("Products")
      .find()
      .then((products) => {
        console.log(products);
        return products;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findById(prodId) {
    const db = getDb();
    return db
      .collection("Products")
      .find({ _id: prodId })
      .next()
      .then((product) => {
        console.log(product);
        return product;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Product;
