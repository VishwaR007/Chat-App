const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost:27017/chat-app");
mongoose.connect(
  "mongodb+srv://vishwanathramaswamy:BT6c9yBAD0A7iB02@cluster0.l0fscnd.mongodb.net/"
);

const connectDb = async () => {
  try {
    console.log("Data Base Connected");
  } catch (error) {
    console.log("DB Connection Failed");
    precess.exit(0);
  }
};

module.exports = connectDb;
