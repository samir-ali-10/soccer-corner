const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const adminRoutes = require("./routes/adminRoutes");

app.use(cors());
app.use(express.json());

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

app.use(adminRoutes);
