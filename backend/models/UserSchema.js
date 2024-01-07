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
    }
    
})


const user = mongoose.model('User' , userSchema)

module.exports = user