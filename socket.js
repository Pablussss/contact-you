module.exports = function (io) {

    let usernames = {

    };

    io.on('connection', socket => {
        
        // escuchar mensajes servidor y emitirlos a los clientes
        socket.on('send message', (data,res) => {
            "/help"
            "/w user msg msg msg"
            let msg = data.trim();
            
            if(msg === '/help'){
                io.emit('admin message', {
                    msg: "Lista de comandos disponibles: /help /w",
                    user: "Admin"
                })
            }
            else if(msg.substr(0, 3) === '/w '){
                msg = msg.substr(3);
                const index = msg.indexOf(' ');
                if(index !== -1) {
                    let user = msg.substring(0, index);
                    msg = msg.substring(index + 1);
                    if (user in usernames){
                        usernames[user].emit('whisper', {
                            msg,
                            user: socket.username
                        })
                    } else {
                        res(`¡Error! El usuario ${user} no está conectado`)
                    }
                } else {
                    res('¡Error! El comando no es correcto')
                }
            } else {
                io.emit('new message', {
                    msg: data,
                    user: socket.username
                })
            }
           
        })

        // conexion nuevo usuario 
        socket.on('new user', (data, res) => {
            console.log(data + " se ha conectado")
            if(data in usernames) {
                res(false)
            } else {
                res(true);
                socket.username = data;
                usernames[socket.username] = socket;
                updateUsers()
            }
        })
        // desconexion usuario
        socket.on('disconnect', data => {
            if (!socket.username) return
            console.log(socket.username + " se ha desconectado")

            delete usernames[socket.username]
            updateUsers()
        })

        // Actualizar lista usuarios
        function updateUsers () {
            io.emit('usernames', Object.keys(usernames))
        }    
    })
}