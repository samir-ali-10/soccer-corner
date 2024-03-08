const mongoose = require('mongoose')
const schema = mongoose.Schema;


const archiveSchema = new schema({
    Code : String,
    Size : String,
    Quantity : String,
    Price : Number,
    Name : String,
    Phone : String,
    AreaZone : String,
    Status : String,
})

const Archive  = mongoose.model('Archive' , archiveSchema)

module.exports = Archive;