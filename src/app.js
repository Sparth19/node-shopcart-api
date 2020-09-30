const express = require("express");
const userRouter = require("./router/user");
const productRouter = require("./router/product");
const orderRouter = require("./router/order");
require("../src/db/mongoose");

const app = express();
app.use(express.json());
app.use(userRouter);
app.use(productRouter);
app.use(orderRouter);

module.exports = app;
