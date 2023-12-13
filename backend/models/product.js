const getDb = require("../util/database").getDb;

class Product {
  constructor(title, price, imageUrl) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
  }

  save() {
    const db = getDb();
    db.collection("products")
      .insertOne(this)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      }); // which collection i want & insert
  }
}

module.exports = Product;
