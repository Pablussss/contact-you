module.exports = function (io) {

    let nicknames = ['guada', 'didrick'];

    io.on('connection', socket => {
        console.log('new user connected')

        // escuchar mensajes servidor y emitirlos a los clientes
        socket.on('send message', data => {
            io.emit('new message', data)
        })
    })
}