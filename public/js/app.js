$(function (){
    const socket = io();

    // Obtener DOM elementos de la interfaz
    const $messageForm = $('#message-form');
    const $messageBox = $('#message')
    const $chat = $('#chat');

    // Obtener DOM elementos del login
    const $loginForm = $('#loginForm');
    const $loginError = $('#loginError');
    const $username = $('#username');

    const $users = $('#usersConnected');

    // Eventos usuarios
        //enviar al servidor el usuario
    $loginForm.submit(e => {
        e.preventDefault();
        socket.emit('new user', $username.val(), data => {
            if(data) {
                $('#loginWrap').hide();
                $('#contentWrap').show()
            } else {
                $loginError.html(`
                <div class="alert alert-danger">
                    Error el usuario ya existe
                </div>
                `)
            }
            $username.val('')
        })
    })
        // leer lista usuarios conectados
    socket.on('usernames', data => {
        let html = '';
        for (let i=0; i < data.length; i++) {
            html += `<p><i class="fas fa-user"></i> ${data[i]}</p>`
        }
        $users.html(html)
        
    })

    // Eventos mensajes
        // Enviar mensaje desde cliente
    $messageForm.submit( e => {
        e.preventDefault()
        socket.emit('send message', $messageBox.val(), data => {
            $chat.append(`<p class="error">${data}</p>`)
        })
        $messageBox.val('')
    })

        // Escuchar mensaje desde Cliente
    socket.on('new message', data => {
        chatAppend(data, "message")    
    })
        // Escuchar mensaje privado
    socket.on('whisper', data => {
        whisperMsg(data)
    })

        // Mensajes predefinidos
    socket.on('admin message', data => {
        chatAppend(data, "admin-message")
    })

        // Cargar mensajes antiguos
    socket.on('load old msg', msg => {
        $chat.append(`<p class="whisper"><b>Ultimos Mensajes:</b></p>`)
        for(let i=0; i< msg.length; i++){
            whisperMsg(msg[i]);
        }
    })


function whisperMsg (data) {
    $chat.append(`<p class="whisper"><b>` + data.user + `</b>` + ": " + data.msg + '<br/></p> ')
}
function chatAppend (data, type) {
    $chat.append(`<p class="${type}"><b>` + data.user + `</b>` + ": " + data.msg + '<br/></p> ')
}
    

})