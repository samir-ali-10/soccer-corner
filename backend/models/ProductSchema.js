const mongoose = require('mongoose')
const schema = mongoose.Schema;



const productSchema = new schema({
    code: String,
    model : String,
    league : String,
    kit : String,
    BrandName : String,
    collectionName: String,
    price: Number,
    size: String,
    type: String,
    sale : Number,
    newCollection : String,
    quantity: {
      type : Number,  
      default : 1,
    }, 
    description: String,
    images : String,
    availableSizes : Array,
})


const ProductModel = mongoose.model("Products", productSchema);


module.exports = ProductModel;
