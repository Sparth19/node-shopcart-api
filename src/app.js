const express = require("express");
const userRouter = require("./router/user");
const productRouter = require("./router/product");
const orderRouter = require("./router/order");
const favoritesRouter = require("./router/favorite");
require("../src/db/mongoose");

const app = express();
app.use(express.json());
app.use(userRouter);
app.use(productRouter);
app.use(orderRouter);
app.use(favoritesRouter);

module.exports = app;
