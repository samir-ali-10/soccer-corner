const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
  code: String,
  name: String,
  price: Number,
  quantity: Number,
  size: String,
});

const ProductModel = mongoose.model("Products", ProductSchema);

module.exports = ProductModel;
