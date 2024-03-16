const mongoose = require('mongoose')
const schema = mongoose.Schema;


const archiveSchema = new schema({
    name : String,
    phone : String,
    area : String,
    zone : String,
    productsOrdered : [{
        code : String,
        size : String,
        quantity : String,
        price : Number, 
    }],
})

const Archive  = mongoose.model('Archive' , archiveSchema)

module.exports = Archive;