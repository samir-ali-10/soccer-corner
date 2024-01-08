const mongoose = require('mongoose')
const schema = mongoose.Schema;


const userSchema = new schema({
    email : {
        type: String,
        required: true
    }, 
    name : {
        type : String,
        required : true
    },
    zone : {
        type : String ,
        required : true
    },
    area : {
        type : String ,
        required : true 
    },
    phoneNumber : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    }
    
})


const user = mongoose.model('User' , userSchema)

module.exports = user