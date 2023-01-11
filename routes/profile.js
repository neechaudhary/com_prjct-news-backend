const express = require("express");
const router = express.Router();
const UsersSchema = require("./../models/users_schema");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Get Profile
router.get("/", async (req, res) => {

  //Check user have token or not
  const token = req.cookies.auth_token || req.body.token || req.headers["x-auth-token"];

  if (token === undefined || token === null || token === "") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  try {
    const user = await UsersSchema.findOne({ _id: decoded.id });
    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
