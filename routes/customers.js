const express = require("express");
const Joi = require("joi");
const router = express.Router();
const { validateObj, Customers } = require("../models/customer");

router.get("/", async (req, res) => {
  try {
    const customers = await Customers.find();
    res.send(customers);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const customer = await Customers.findById(req.params.id);

    if (!customer)
      return res.status(404).send({ message: "Customer doesn't exist" });

    res.send(customer);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const { error } = validateObj(req.body);
  if (error) res.status(400).send({ message: error.details[0].message });

  try {
    let customer = await Customers.findOne({ phone: req.body.phone });
    if (customer)
      return res.status(400).send({ message: "Customer already exist" });

    customer = new Customers(req.body);
    const result = await customer.save();

    res.send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const allowedUpdates = ["name", "phone"];
  const updates = {};

  for (const fields of allowedUpdates) {
    if (req.body[fields] !== undefined) updates[fields] = req.body[fields];
  }

  try {
    const updatedCustomer = await Customers.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { runValidators: true },
    );

    if (!updatedCustomer)
      res.status(404).send({ message: "Customer not found" });

    res.send(updatedCustomer);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const customer = await Customers.findByIdAndDelete(req.params.id);

    if (!customer)
      return res.status(404).send({ message: "Customer not found" });

    res.send(customer);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
