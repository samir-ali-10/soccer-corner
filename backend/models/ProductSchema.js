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
    sizes: Array,
    sale : Number,
    newCollection : String,
    quantity: {
      type : Number,
      default : 1,
    }, 
    description: String,
    image:  Buffer, // Binary data for the image
})


const ProductModel = mongoose.model("products", productSchema);


module.exports = ProductModel;
