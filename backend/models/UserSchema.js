const mongoose = require('mongoose')
const schema = mongoose.Schema;


const userSchema = new schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type: String,
        required: true
    },
    password : {
        type : String,
        required : true
    },
    confirmPassword : {
        type : String ,
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
    },

})


const user = mongoose.model('User' , userSchema)

module.exports = user