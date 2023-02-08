const mongoose = require("mongoose");
require("dotenv").config();

module.exports = {
  name: "mongoose",
  description: "Connect to mongoDB",
  connect() {
    mongoose
      .connect(process.env.MONDO_DB_SRV, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
