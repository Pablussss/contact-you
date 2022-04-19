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


    $nickForm.submit(e => {
        e.preventDefault();
        socket.emit("new user login", $nickname.val(), data => {
            if (data) {
                $('#nickWrap').hide
                $('#contentWrap').show()
            } else {
                $nickError.html(`
                    <div class="alert alert-danger" This username already exists> 
                    </div>    
                `)
            }
            $nickname.val()

            
        })
    })
})