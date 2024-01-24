const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  email: String,
  password: String,
  base64data: String,
  socketID: String,
});

const Users = mongoose.model("users", usersSchema);

module.exports = Users;
