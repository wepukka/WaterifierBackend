const express = require("express");
const authRouter = express.Router();
const authController = require("../Controllers/auth.controller");
const { verifyAccessToken } = require("../Middleware/verifyAccessToken");
const userSchema = require("../Models/userSchema");

authRouter.use(express.json());
authRouter.use(express.urlencoded());

authRouter.post("/register/", async (req, res) => {
  const USER_TAKEN = "Username not available!";
  const user = await authController.userExists(req.body.username);
  if (user) {
    return res.send({ message: USER_TAKEN, success: false });
  }
  const hash = authController.generateHash(req.body.password);

  await new userSchema({
    username: req.body.username,
    password: hash,
    weight: 0,
    height: 0,
  })
    .save()
    .then(() => {
      res.status(200).send({
        success: true,
        token: authController.generateAccessToken(req.body.username),
        username: req.body.username,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Data base error",
        success: false,
      });
    });
});

authRouter.post("/login/", async (req, res) => {
  const INVALID_LOGIN = "Invalid username or password!";
  const user = await authController.userExists(req.body.username);

  if (!user) {
    return res.send({ message: INVALID_LOGIN, success: false });
  }

  const validPassword = await authController.passwordIsValid(
    req.body.password,
    user.password
  );

  return validPassword
    ? res.status(200).send({
        token: authController.generateAccessToken(req.body.username),
        success: true,
        username: user.username,
      })
    : res.send({
        message: INVALID_LOGIN,
        success: false,
      });
});

authRouter.post("/authenticate", verifyAccessToken, async (req, res) => {
  res.status(200).send({
    user: req.user,
    success: true,
  });
});

module.exports = authRouter;
