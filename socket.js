module.exports = function (io) {

    let usernames = [];

    io.on('connection', socket => {
        
        // escuchar mensajes servidor y emitirlos a los clientes
        socket.on('send message', data => {
            io.emit('new message', {
                msg: data,
                user: socket.username
            })
        })

        // conexion nuevo usuario 
        socket.on('new user', (data, res) => {
            console.log(data + " se ha conectado")
            if(usernames.indexOf(data) !== -1) {
                res(false)
            } else {
                res(true);
                socket.username = data;
                usernames.push(socket.username);
                updateUsers()
            }
        })
        // desconexion usuario
        socket.on('disconnect', data => {
            if (!socket.username) return
            let desconectado = socket.username;
            console.log(desconectado + " se ha desconectado")

            usernames.splice(desconectado, 1)
            updateUsers()
        })

        // Actualizar lista usuarios
        function updateUsers () {
            io.emit('usernames', usernames)
        }    
    })
}