const mongoose = require("mongoose");
const url = process.env.MONGO_URL;

mongoose
  .connect(url)
  .then(() => {
    console.log("Connection suceesfull");
  })
  .catch((err) => {
    console.log("Connection failed", err);
  });
