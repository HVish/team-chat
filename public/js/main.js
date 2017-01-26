$(document).ready(() => {
    var socket;

    socket = io(location.origin);

    var subscribe = () => {
        socket.on('message', (data) => {
            console.log(data);
        });
    };

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
