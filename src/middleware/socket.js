const {
  addUser,
  removeUser,
  getUser,
  getUserInRoom,
} = require("../utils/users");
const { generateMessage } = require("../utils/messages");
module.exports = (app, io, db) => {
  io.on("connection", (socket) => {
    console.log("a user connected :D");

    socket.on("join", ({ username, id, room }) => {
      console.log(username, room);

      const { error, user } = addUser({ id, username, room });
      //  console.log(user);
      if (error) {
        console.log(error);
      }
      socket.join(user.room);
      // socket.emit('message', generateMessage("Admin", "Welcome !")) //emits to single connection
      // socket.broadcast.to(user.room).emit('message', generateMessage("Admin", user.username + ' has joined !'))
      // io.to(user.room).emit("roomData", {
      //   room: user.room,
      //   users: getUserInRoom(user.room),
      // });
      //  callback();
    });

    socket.on("sendMsg", (msg, senderid, recid, room, callback) => {
      // const user = getUser(senderid);
      // if (!user) {
      //   console.log(user);
      // }
      console.log("received in api");
      console.log(socket.id);
      // const filter = new Filter()
      // if (filter.isProfane(msg)) {
      //   return callback('Profane words not allowed')
      // }
      //LEFT:0 RIGHT:1
      socket.emit("message", msg);
      socket.broadcast.to(socket.id).emit("message", msg);
      //io.to(user.room).emit('message', generateMessage(user.username, msg)) //emits to all connections
      callback();
    });
  });
};
