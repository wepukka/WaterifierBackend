const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
require("dotenv").config();
const crypto = require("crypto");
const userSchema = require("../Models/userSchema");

module.exports = {
  name: "authControllers",
  description: "Controllers for authentication",
  async userExists(username) {
    const user = await userSchema.find({ username: username });
    return user[0];
  },
  async passwordIsValid(plainPassword, hashedPassword) {
    // COMPARE LOGIN PASSWORD WITH DATABASE HASH
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  },
  generateHash(plainPassword) {
    // CREATE HASHED PASSWORD ON REGISTER EVENT
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(plainPassword, salt);
    return hash;
  },
  generateAccessToken(username) {
    // GENERATE ACCESS TOKEN ON LOGIN & REGISTER EVENTS
    const token = jwt.sign(
      { username: username },
      process.env.ACCESS_TOKEN_SECRET
    );
    return token;
  },
};
