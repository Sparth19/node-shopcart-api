module.exports = (app, io, db) => {
    io.on("connection", socket => {
        console.log("a user connected :D");
        socket.on('sendMessage', (msg, callback) => {
            console.log(socket.id)
            // const user = getUser(socket.id)
            // if (!user) {
            //     return callback('User not found')
            // }

            // const filter = new Filter()
            // if (filter.isProfane(msg)) {
            //     return callback('Profane words not allowed')
            // }
            // //LEFT:0 RIGHT:1
            //socket.emit('sendMessage', generateMessage(user.username, msg + " =ME=", 1))
            // callback()
        })
    });
}