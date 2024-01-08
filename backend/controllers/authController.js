const  { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')

const bcrypt = require('bcryptjs')
const User = require('../models/UserSchema')


exports.getUsers = (req , res, next) => {
    User.find()
    .then(users => {
        res.json(users)
    }).catch(err => {
        console.log(err);
    })
}


exports.signUp = async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = new Error('Validation Failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
      }
  
      const email = req.body.email;
  
      // Check if user with the provided email already exists
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        const error = new Error('User with this email already exists.');
        error.statusCode = 422;
        throw error;
      }
  
      const name = req.body.name;
      const password = req.body.password;
      const zone = req.body.zone;
      const area = req.body.area;
      const phoneNumber = req.body.phoneNumber;
      const address = req.body.address;
  
      // Hash the password
      const hashedPw = await bcrypt.hash(password, 12);
  
      // Create a new user
      const user = new User({
        email: email,
        password: hashedPw,
        confirmPassword: hashedPw,
        name: name,
        zone: zone,
        area: area,
        phoneNumber: phoneNumber,
        address: address,
      });
  
      // Save the user to the database
      const result = await user.save();
  
      console.log('User saved:', result);
      res.status(201).json({ message: 'User created successfully.', userId: result._id });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };

exports.logIn = (req , res , next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    User.findOne({email : email})
    .then(user => {
        if (!user) {
            const error = new Error('A user with this email could not be found')
            console.log('A user with this email could not be found');
        }
        loadedUser = user;
        bcrypt.compare(password , user.password);
    })
    .then(doMatch => {
      if (doMatch) {
        return res.redirect('/home')
      } else {
      console.log('Wrong password!');
      const error = new Error('Wrong password!')
      error.statusCode = 401;
      throw error
      }
      // const token = jwt.sign({
      //     email : loadedUser.email ,
      //     userId : loadedUser._id.toString()
      //   },'somesupersecretsecret' , {expiresIn : '1h'})
      //   res.status(200).json({token : token , userId: loadedUser._id.toString()});
    })
    .catch(err => {
      console.log(err);
      res.redirect('/')
    })

}