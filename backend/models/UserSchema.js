const mongoose = require('mongoose')
const schema = mongoose.Schema;


const userSchema = new schema({
    
    name : String,
    email : String,
    password : String,
    confirmPassword : String ,
    zone : String,
    area : String,
    phoneNumber : String,
    address : String, 
    cart :  Array,
})


const user = mongoose.model('User' , userSchema)

module.exports = user