const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const Routes = require("./routes/routes");
const bodyParser = require('body-parser')


app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.use(Routes);

app.use( '/uploads' , express.static('uploads'))

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

