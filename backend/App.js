const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const Routes = require("./routes/Routes");
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended : false}));
app.use(cors());
app.use(express.json());

app.use(Routes);


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

