
const mongoose = require("mongoose");
require("dotenv").config();
const dbURL = process.env.DB_URL;

mongoose
  .connect(dbURL)
  .then(() => {
    console.log("Mongodb atlas is connected");
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

module.exports = mongoose;
