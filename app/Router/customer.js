const express = require("express");
const router = express.Router();
const { Customer } = require("../Model/customer");

router.get("/", async (req, res) => {
  const customer = await Customer.find().sort({ name: 1 });
  res.send(customer);
});

router.post("/", async (req, res) => {
  const customer = new Customer({
    name: req.body.name,
    Phone: req.body.Phone,
    isGold: req.body.isGold,
  });
  await customer.save();
  res.send(customer);
});

router.put("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).send("User not found");
  (customer.name = req.body.name),
    (customer.phone = req.body.phone),
    (customer.isGold = req.body.isGold);
  await customer.save();
  res.send(customer);
});

router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndRemove({ _id: req.params.id });
  if (!customer) return res.status(404).send("User not found");
  res.send(customer);
});

module.exports = router;
