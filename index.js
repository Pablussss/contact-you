const express = require('express');
const app = express();
const port = 3000;
const server = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const mongoose = require('mongoose')

require('./socket')(io)

// Estatico
app.use(express.static('public'));

// Server start
server.listen(port, () => {
    console.log(`Server corriendo en el puerto: *${port}*`)
})

// Conexion a bbdd con mongodb
mongoose.connect('mongodb://127.0.0.1:27017/contactyou')
    .then(db => console.log("Conexion a la base de datos establecida"))
    .catch(err => console.log("Error al conectar a la bbdd " + err))
