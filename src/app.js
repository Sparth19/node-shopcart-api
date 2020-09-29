const express = require("express");
const userRouter = require("./router/user");
const productRouter = require("./router/product");
require("../src/db/mongoose");

const app = express();
app.use(express.json());
app.use(userRouter);
app.use(productRouter);

module.exports = app;
