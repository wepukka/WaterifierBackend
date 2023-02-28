const mongoose = require("mongoose");

const users = mongoose.Schema({
  username: String,
  password: String,
});

module.exports = mongoose.model("user", users);
