const express = require('express');
const app = express();
const port = 3000;
const server = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

require('./socket')(io)

// Estatico
app.use(express.static('public'));

// Server start
server.listen(port, () => {
    console.log(`Server corriendo en el puerto: *${port}*`)
})