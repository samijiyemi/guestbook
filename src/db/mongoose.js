const mongoose = require("mongoose");
const path = require("path");

const filePath = path.join(__dirname, "../", "/config", "dev.env");

require("dotenv").config({ path: filePath });

mongoose.connect(process.env.MONGODB_URI, (err, data) => {
  if (err) {
    return console.error("unable to connect the database");
  }
  console.log("database connected");
});

module.exports = mongoose;
