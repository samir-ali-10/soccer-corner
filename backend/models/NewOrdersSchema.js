const mongoose = require('mongoose')
const schema = mongoose.Schema;


const OrderSchema = new schema({
    Name : String,
    Phone : String,
    Area : String,
    Zone : String,
    Address : String,
    note : String,
    productsOrdered : [{
        code : String,
        images : String,
        size : String,
        quantity : String,
        price : Number,
        
    }],


})

const Order = mongoose.model('Orders' , OrderSchema );

module.exports = Order;