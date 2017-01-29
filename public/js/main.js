$(document).ready(() => {
    var socket;

    var subscribe = () => {
        if(socket) {
            socket.close();
        }
        socket = io(location.origin);
    };

    $('#login').click(() => {
        var whiteSpaces = /^\s*$/,
            mobile = $('#mobile').val(),
            username = $('#username').val(),
            password = $('#password').val();

        if (username.match(whiteSpaces) ||
            mobile.match(whiteSpaces) ||
            password.match(whiteSpaces)) {
            $('#notify-snackbar')[0].MaterialSnackbar.showSnackbar({
                message: "All fields are mondatory.",
                timeout: 2000
            });
            return false;
        } else if ($('.mdl-textfield.is-invalid').length ||
            mobile.length != 10) {
            $('.mdl-textfield.is-invalid input').focus();
            $('#notify-snackbar')[0].MaterialSnackbar.showSnackbar({
                message: "Invalid input",
                timeout: 2000
            });
            return false;
        }
        $.get('/api/signup', {
            mobile: mobile,
            username: username,
            password: password
        }, (response) => {
            if (response.success) {
                subscribe();
            } else {
                $('#mobile').focus();
            }
            $('#notify-snackbar')[0].MaterialSnackbar.showSnackbar({
                message: response.data,
                timeout: 2000
            });
        });
    });
});
