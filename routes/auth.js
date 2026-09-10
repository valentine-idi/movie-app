const express = require("express");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const router = express.Router();
const { Users } = require("../models/users");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  try {
    const user = await Users.findOne({ email: req.body.email });
    if (!user) res.status(400).send({ message: "Invalid email or password" });

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password,
    );
    if (!isValidPassword)
      res.status(400).send({ message: "Invalid email or password" });

    const token = user.generateAuthToken();

    res.send({ message: "Login Successful", token });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

function validate(user) {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  return schema.validate(user);
}

module.exports = router;
