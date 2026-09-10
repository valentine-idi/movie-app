const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 2, maxLength: 50 },
  phone: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 15,
    unique: true,
  },
  isGold: { type: Boolean, required: true },
  Date: { type: Date, default: Date.now() },
});

const Customers = mongoose.model("Customer", customerSchema);

function validateObj(customer) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    phone: Joi.string().min(10).max(15).required(),
    isGold: Joi.boolean().required(),
  });

  return schema.validate(customer);
}

module.exports.Customers = Customers;
module.exports.validateObj = validateObj;
