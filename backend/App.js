const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const session = require('express-session')
const MongoStoreSession = require('connect-mongodb-session')(session);
const mongoStore = new MongoStoreSession({
  uri : 'mongodb+srv://yossifdiaa4:Facebook4@cluster0.veahqoj.mongodb.net/shop?retryWrites=true&w=majority',
  collection : 'sessions',
});
const Routes = require("./routes/Routes");
const bodyParser = require('body-parser');
const upload = require('./middleware/upload')
const ProductController = require('./controllers/ProductController')

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(session({secret: 'supersupersecret' , resave : false , saveUninitialized : false , store : mongoStore }));
app.use(Routes);
app.post("/api/products", upload.array('image') , ProductController.postAddProduct);

mongoose
  .connect(
    "mongodb+srv://yossifdiaa4:Facebook4@cluster0.veahqoj.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(3001);
  })
  .catch((err) => {
    console.log(err);
  });

