const express = require('express');
const app = express();
const port = 3000;
//const { Server } = require("socket.io")
//const io = new Server(server)

app.get('/', (req, res) => {

    res.status(200).sendFile(__dirname + '/public/index.html');
})

// io.on('connection', (socket) => {
//     console.log('un usuario se ha conectado')
// })

app.listen(port, () => {
    console.log(`Server corriendo en el puerto: *${port}*`)
})