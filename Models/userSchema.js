const mongoose = require("mongoose");

const users = mongoose.Schema({
  username: String,
  password: String,
  email: String,
});

module.exports = mongoose.model("user", users);
