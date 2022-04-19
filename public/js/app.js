$(function (){
    const socket = io();

    // Obtener DOM elementos de la interfaz
    const $messageForm = $('#message-form');
    const $messageBox = $('#message')
    const $chat = $('#chat');

    // Obtener DOM elementos del login
    const $nickForm = $('#nickForm');
    const $nickError = $('#nickError');
    const $nickname = $('#nickname');

    const $users = $('#usernames');

    // Eventos
        // Enviar mensaje desde cliente
    $messageForm.submit( e => {
        e.preventDefault()
        socket.emit('send message', $messageBox.val())
        $messageBox.val('')
    })

        // Escuchar mensaje desde Cliente
    socket.on('new message', data => {
        $chat.append(data + '<br/>')
    })

})