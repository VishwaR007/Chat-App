const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/chat-app");

const connectDb = async () => {
  try {
    console.log("Data Base Connected");
  } catch (error) {
    console.log("DB Connection Failed");
    precess.exit(0);
  }
};

module.exports = connectDb;
