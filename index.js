"use strict";

const express = require('express');
const app = express();

const hbs = require('express-handlebars');
const bodyParser = require('body-parser');

const config = {
    locals: require('./config/locals.js'),
    routes: require('./config/routes.js'),
    policies: require('./config/policies.js')
};

const io = require('socket.io')(config.locals.socketPort);

// setup view engine
app.engine('.hbs', hbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// public files
app.use(express.static('public'));

// to support JSON-encoded bodies
app.use(bodyParser.json());

// to support URL-encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
}));

// register endpoints for api
let registerEndpoints = (option) => {
    for (let key in config.routes[option]) {
        if (config.routes[option].hasOwnProperty(key)) {
            let controllerName = config.routes[option][key]
                .substr(0, config.routes[option][key].indexOf('.')),

                callback = config.routes[option][key]
                .substr(config.routes[option][key].indexOf('.') + 1),

                method = key.substr(0, key.indexOf(' ')).toLowerCase(),
                route = key.substr(key.indexOf(' ') + 1);

            try {
                let controller = require('./app/' +
                    option + '/' + controllerName + '.js');

                app[method]('/' + option + route, controller[callback]);
            } catch (e) {
                console.error(e);
            }
        }
    }
}
registerEndpoints('api');
registerEndpoints('web');
registerEndpoints('common');


// listen server requests on port
app.listen(config.locals.webPort, () => {
    console.log("Server started!! Please visit:",
        '\x1b[36m',
        "http://localhost:" + config.locals.webPort,
        '\x1b[0m');
});

// socket connection handler
io.on('connection', (socket) => {
    socket.on('message', (data) => {
        console.log(data);
    });
});
