const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { Users, validateUser } = require("../models/users");
const auth = require("../middlewares/auth");

router.get("/me", auth, async (req, res) => {
  try {
    const { _id, name, email } = await Users.findById(req.user.userId);
    res.send({
      user: {
        _id,
        name,
        email,
      },
    });
  } catch (error) {}
});

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  try {
    let user = await Users.findOne({ email: req.body.email });
    if (user) return res.status(400).send({ message: "User already exists" });

    user = new Users(req.body);

    const { _id, email, isAdmin } = await user.save();

    res.send({
      message: "User created successfully",
      user: {
        _id,
        email,
        isAdmin,
      },
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

module.exports = router;
