const mongoose = require("mongoose");

const msgsSchema = new mongoose.Schema({
  from: String,
  msg: String,
  to: String,
  seen: String,
});

// const Users = mongoose.model("Users", usersSchema);
const Msgs = mongoose.model("msgs", msgsSchema);

module.exports = Msgs;
