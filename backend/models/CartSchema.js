const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    code: String,
    model : String,
    league : String,
    kit : String,
    collectionName: String,
    price: Number,
    size: String,
    quantity: Number,
    selectedQuantity : Number, 
    description: String,
    // image: String,
  });
  
  const Cart = mongoose.model('Cart' , CartSchema)
  module.exports = Cart;