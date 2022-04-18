module.exports = function (io) {

    let nicknames = ['guada', 'didrick'];

    io.on('connection', socket => {
        console.log('new user connected')

        socket.on('new user', (user, result) => {
            if (nicknames.indexOf(user) != -1) {
                result(false)
            } else {
                result(true)
                socket.nickname = user;
                nicknames.push(socket.user)
            }
        })
    
        socket.on('send message', data => {
            io.socket.emit('new message', data)
        })
    })
}