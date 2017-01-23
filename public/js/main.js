$(document).ready(() => {
    var socket;

    var socketInit = () => {
        $.get('/api/socket/settings', (response) => {
            if (response.result == "success") {
                socket = io(location.hostname + ':' + response.data.port);
            }
        });
    }

    var subscribe = () => {
        socket.on('message', (data) => {
            console.log(data);
        });
    };

    socketInit();

    $('#subscribe').click(() => {
        var mobile = $('#mobile').val(),
            username = $('#username').val();

        if ($('.mdl-textfield.is-invalid').length) {
            $('.mdl-textfield.is-invalid input').focus();
            $('#notify-snackbar')[0].MaterialSnackbar.showSnackbar({
                message: "Invalid input",
                timeout: 2000
            });
            return false;
        }
        /*$.get('/signup', {
            mobile: mobile,
            username: username
        }, (result) => {
            if (result.success) {
                $('#notify-snackbar')[0].MaterialSnackbar.showSnackbar({
                    message: 'Successfully subscribed.',
                    timeout: 2000
                });
                subscribe();
            } else {
                $('#mobile').focus();
                $('#notify-snackbar')[0].MaterialSnackbar.showSnackbar({
                    message: 'Unable to subscribe.',
                    timeout: 2000
                });
            }
        });*/
    });
});
