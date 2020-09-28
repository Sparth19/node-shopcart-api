const express = require("express");

require("../src/db/mongoose");

const app = express();
app.use(express.json());

module.exports = app;
