const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')

const bcrypt = require('bcryptjs')
const User = require('../models/UserSchema')
const Reviews = require('../models/ReviewSchema')


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
        console.log('user already exist');
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
        name: name,
        zone: zone,
        area: area,
        phoneNumber: phoneNumber,
        address: address,
        cart : []
      });
  
      // Save the user to the database
      await user.save();
  
      console.log('User saved:', user);
      res.status(201).json({ message: 'User created successfully.'});
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
    }
  };
  exports.logIn = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        // Find the user by email
        const user = await User.findOne({ email: email });

        if (!user) {
            const error = new Error('A user with this email could not be found');
            console.log('user not found');
            error.statusCode = 404; // Not Found
            throw error;
        }
        // compare password with the hashed one 
        const isEqual = await bcrypt.compare(password, user.password);

        if (!isEqual) {
            const error = new Error('Wrong password!');
            console.log('wrong password');
            error.statusCode = 401; // Unauthorized
            throw error;
        }

        // Generate a JWT token for the authenticated user
        const token = jwt.sign({
            email: user.email,
            userId: user._id
        }, 'somesupersecretsecret', { expiresIn: '1h' });

        // Send the token and userId to the client
        res.status(200).json({ token: token, userId: user._id });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        // res.status(err.statusCode).json({ error: err.message });
    }
  };
exports.getReviews = (req ,res,next) => {
  Reviews.find()
  .then(reviews => {
    res.json(reviews)
  }).catch(err => {
    console.log(err);
  })
};


exports.postReviews = (req , res , next) => {
  const name = req.body.name;
  const message = req.body.message;

  const Review = new Reviews({
    name : name,
    message : message,
  })
  Review.save();

}
