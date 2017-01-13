var socket = io('http://localhost:3012');

function subscribe() {
    socket.on('message', (data) => {
        console.log(data);
    });
};

$(document).ready(() => {
    $('#subscribe').click(() => {
        var mobile = $('#mobile').val();
        if (!mobile || isNaN(mobile)) {
            $('#mobile').focus();
            $('#notify-snackbar')[0].MaterialSnackbar.showSnackbar({
                message: "Invalid mobile",
                timeout: 2000
            });
            return false;
        }
        $.get('/signup', {
            mobile: mobile
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
        });
    });
});
