const express = require("express");
const userRouter = require("./router/user");
require("../src/db/mongoose");

const app = express();
app.use(express.json());
app.use(userRouter);

module.exports = app;
