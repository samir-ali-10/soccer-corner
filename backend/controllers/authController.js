const  { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs')
const User = require('../models/UserSchema')



exports.signUp = async (req , res , next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        const error = new Error('validation Failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const zone = req.body.zone;
    const area = req.body.area;
    const phoneNumber = req.body.phoneNumber;
    const address = req.body.address;


    const existUser = await User.findOne({email : email})
    if (existUser) {
        console.log('user already exist');
        res.json('user already exist')
    } else {
    bcrypt.hash(password , 12)
    .then(hashedPw => {
        const user = new User({
            email : email,
            password : hashedPw,
            confirmPassword: hashedPw,
            name : name,
            zone : zone,
            area : area,
            phoneNumber : phoneNumber,
            address : address,
        });
        user.save();
    }).then(result => {
        res.status(201).json({message : 'User created!' , userId : result._id })
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
    }
}

// exports.logIn = (req , res , next) => {
//     const email = req.body.email;
//     const password = req.body.password;
//     let loadedUser;
//     User.findOne({email : email})
//     .then(user => {
//         if (!user) {
//             const error = new Error('A user with this email could not be found')
//         }
//         loadedUser = user;
//          return bcrypt.compare(password , user.password);
//     })
//     .then()
//     .catch(err => {
//         if (!err.statusCode) {
//             err.statusCode = 500;
//         }
//         next(err);
//     })

// }