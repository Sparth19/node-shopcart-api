//adduser removeuser getuser getusersinroom
const users = []

const addUser = ({ id, username, room }) => {
    //clean the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    //validate the data
    if (!username || !room) {
        return { Error: 'Please enter username and room..' }
    }

    //check the existing user
    // const existingUser = users.find((user) => {
    //     return user.username === username && user.room === room
    // })

    // //validate username
    // if (existingUser) {
    //     return { error: 'username is in use..' }
    // }

    //store user
    const user = { id, username, room }
    users.push(user)
    return { user }
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)
    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

const getUser = (id) => {
    return users.find((user) => user.id === id)
}
const getUserInRoom = (room) => {
    room = room.trim().toLowerCase()
    return users.filter((user) => user.room === room)
}
const rooms = []


module.exports = {
    addUser,
    removeUser,
    getUser,
    getUserInRoom
}