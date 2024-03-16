const mongoose = require('mongoose')
const schema = mongoose.Schema;


const OrderSchema = new schema({
    name : String,
    phone : String,
    area : String,
    zone : String,
    address : String,
    note : String,
    productsOrdered : [{
        code : String,
        images : String,
        size : String,
        quantity : String,
        price : Number,
        status : String,
    }],


})

const Order = mongoose.model('Orders' , OrderSchema );

module.exports = Order;