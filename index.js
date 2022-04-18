const express = require('express');
const app = express();
const port = 3000;
const server = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// Estatico
app.use(express.static('public'));

// Chat
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });
  
// Retransmitir mensajes
io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets

// Server start
server.listen(port, () => {
    console.log(`Server corriendo en el puerto: *${port}*`)
})