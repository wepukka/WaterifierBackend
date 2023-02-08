const express = require("express");
const defaultRouter = express.Router();

defaultRouter.get("/", async (req, res) => {
  res.send({ message: "Default " });
});

module.exports = defaultRouter;
