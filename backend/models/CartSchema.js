const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    code: String,
    model : String,
    league : String,
    kit : String,
    collectionName: String,
    price: Number,
    sale : Number,
    size: String,
    quantity: {
      type : Number,
      default : 1,
    },
    description: String,
    // image: String,
  });
  
  const Cart = mongoose.model('Cart' , CartSchema)
  module.exports = Cart;