const mongoose = require("mongoose");
//    constructor(quantity, productPrice, productTitle, productImage, sum) {

const ordersSchema = mongoose.Schema(
  {
    cartItems: [
      {
        quantity: {
          type: Number,
          required: true,
        },
        productPrice: {
          type: Number,
          required: true,
        },
        productTitle: {
          type: String,
          required: true,
        },
        productImage: {
          type: String,
          required: true,
        },
        sum: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    orderDate: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
  },
  { timestamp: true }
);

const Orders = mongoose.model("Orders", ordersSchema);

module.exports = Orders;
