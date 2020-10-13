module.exports = (app, io, db) => {
  io.on("connection", (socket) => {
    console.log("a user connected :D");
    socket.on("sendMessage", (msg, id) => {
      console.log(id);
      socket.emit("sendMessage", id, msg);
    });
  });
};
