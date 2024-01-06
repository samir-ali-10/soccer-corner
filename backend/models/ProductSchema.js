const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  code: String,
  model : String,
  league : String,
  kit : String,
  collectionName: String,
  price: Number,
  size: String,
  sizes: Array,
  quantity: Number,
  description: String,
  // image: String,
});



const ProductModel = mongoose.model("Products", ProductSchema);


module.exports = ProductModel;
