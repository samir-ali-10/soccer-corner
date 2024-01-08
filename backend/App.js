const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const Routes = require("./routes/Routes");

app.use(cors());
app.use(express.json());

app.use(Routes);

app.use((error , req , res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({message : message , data: data});
})

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

