const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 2, maxLength: 70 },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: "Please enter a valid email address",
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 6,
    maxLength: 255,
  },

  isAdmin: {
    type: Boolean,
  },
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = 10;
  this.password = await bcrypt.hash(this.password, salt);

  this.isAdmin = false;
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { userId: this._id, admin: this.isAdmin },
    process.env.JWT_SECRET,
  );
};

const Users = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().required().min(2).max(70),
    email: Joi.string().email().required().trim(),
    password: Joi.string().required().trim().min(6).max(255),
  });

  return schema.validate(user);
}

module.exports.Users = Users;
module.exports.validateUser = validateUser;
