const express = require("express");
const userRouter = require("./router/user");
const productRouter = require("./router/product");
const orderRouter = require("./router/order");
const favoritesRouter = require("./router/favorite");
const http = require("http");
const db = require("../src/db/mongoose");
const socketio = require("socket.io");

const app = express();
app.use(express.json());
app.use(userRouter);
app.use(productRouter);
app.use(orderRouter);
app.use(favoritesRouter);

const server = http.createServer(app);
const io = socketio.listen(server);
//const io = socketio(server).sockets;

require("./middleware/socket")(app, io, db);

module.exports = server;
