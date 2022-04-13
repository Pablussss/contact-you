const express = require('express');
const app = express();
const port = 3000;
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// Estatico
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Chat
io.on('connection', (socket) => {
    console.log('a user connected');
});

// Server start
server.listen(port, () => {
    console.log(`Server corriendo en el puerto: *${port}*`)
})