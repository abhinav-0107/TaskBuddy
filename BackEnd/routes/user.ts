import express from "express";
import bodyParser from "body-parser";
import { USERS } from "../db/index.js";
import jwt from "jsonwebtoken";
import { authenticateJwt, SECRET } from "../middlewares/auth.js";
import cors from "cors";
import { credentialsInput } from "@abhinav_0107/common"

const router = express.Router();

router.use(cors());
router.use(bodyParser.json());


function generateJwt(payload: object) {
  const token: string = jwt.sign(payload, SECRET, { expiresIn: "1h" });
  return token;
}

router.get("/me", authenticateJwt, async (req, res) => {
  const user = await USERS.findOne({ _id: req.headers["userId"] });
  if (user) {
    res.json({ username: user.username });
  } else {
    res.status(403).json({ message: "User not Logged In!" });
  }
});

router.post("/signup", async (req, res) => {
  const parsedInput = credentialsInput.safeParse(req.body);

  if (!parsedInput.success) {
    res.json({
      error: parsedInput.error,
    });
    return;
  }

  const username = parsedInput.data.username;
  const password = parsedInput.data.password;

  const userExist = await USERS.findOne({ username });

  if (userExist) {
    res.status(403).json({ message: "User already exist!" });
  } else {
    const userToSave = new USERS({ username, password });
    await userToSave.save();
    res.send({
      message: "Signup successful!",
      token: generateJwt({ _id: userToSave._id }),
    });
  }
});

router.post("/login", async (req, res) => {
  const parsedInput = credentialsInput.safeParse(req.body);
  if (!parsedInput.success) {
    res.json({
      error: parsedInput.error,
    });
    return;
  }

  const username = parsedInput.data.username;
  const password = parsedInput.data.password;

  const userExist = await USERS.findOne({
    username,
    password,
  });

  if (userExist) {
    res.json({
      message: "Login successful!",
      token: generateJwt({ _id: userExist._id }),
    });
  } else {
    res.json({ message: "Invalid username or password" });
  }
});

export default router;
