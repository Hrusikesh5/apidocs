const mongoose = require("mongoose");
require("dotenv").config();
const mongoURI = process.env.mongoURL;

const connection = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = { connection };
