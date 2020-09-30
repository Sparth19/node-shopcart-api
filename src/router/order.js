const express = require("express");
const Order = require("../model/Orders");
const router = new express.Router();
const auth = require("../middleware/auth");

//create new order
router.post("/orders/create", auth, async (req, res) => {
  try {
    console.log("in try");
    const order = new Order({
      ...req.body,
      owner: req.user._id,
    });
    console.log(order);
    await order.save();
    res.status(201).send(order);
  } catch (err) {
    res.status(400).send(err);
  }
});

//fetch all user orders
router.get("/orders/read", auth, async (req, res) => {
  try {
    const order = await Order.find({ owner: req.user._id });
    console.log(order);
    if (!order) {
      return res.status(404).send();
    }
    res.status(200).send(order);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
