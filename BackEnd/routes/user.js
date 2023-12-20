const express = require("express");
const bodyParser = require("body-parser");
const { USERS } = require("../db/index.js");
const jwt = require("jsonwebtoken");
const { authenticateJwt, SECRET } = require("../middlewares/auth.js");

const router = express.Router();

router.use(bodyParser.json());

function generateJwt(payload) {
  const token = jwt.sign(payload, SECRET, { expiresIn: "1h" });
  return token;
}

router.get("/me", authenticateJwt, async (req, res) => {
  const user = await USERS.findOne({ _id: req.userId });
  if (user) {
    res.json({ username: user.username });
  } else {
    res.status(403).json({ message: "User not Logged In!" });
  }
});

router.post("/signup", async (req, res) => {
  const newUser = req.body;
  const userExist = await USERS.findOne({ username: newUser.username });
  
  if (userExist) {
    res.status(403).json({ message: "User already exist!" });
  } else {
    const userToSave = new USERS(newUser);
    await userToSave.save();
    res.send({
      message: "Signup successful!",
      token: generateJwt({ _id: userToSave._id }),
    });
  }
});

router.post("/login", async (req, res) => {
  const user = req.body;
  const userExist = await USERS.findOne({
    username: user.username,
    password: user.password,
  });

  if (userExist) {
    res.json({
      message: "Login successful!",
      token: generateJwt({ _id: userExist._id }),
    });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

module.exports = router;
