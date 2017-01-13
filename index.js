"use strict";

const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const bodyParser = require('body-parser')
const session = require('express-session')
const io = require('socket.io')(3012);

const port = process.env.port || 3000;

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

// setup session
app.use(session({
    secret: 'cookie_secret_key',
    resave: true,
    saveUninitialized: true
}));

// check session on every request
app.use((req, res, next) => {
    if (req.session.mobile ||
        req.path == '/' ||
        req.path == '/signup') {
        next();
    } else {
        res.status(403).json({
            success: false,
            message: "Unauthorized"
        });
    }
});

// home
app.get('/', (req, res) => {
    res.render('index');
});

// signup
app.get('/signup', (req, res) => {
    let mobile = req.query.mobile;
    if (mobile && mobile.length == 10 && !isNaN(mobile)) {
        req.session.mobile = mobile;
        res.json({
            success: true,
            message: "Successfully singned up!"
        });
    } else {
        res.json({
            success: false,
            message: "Invalid mobile."
        });
    }
});

// listen server requests on port
app.listen(port, () => {
    console.log("Server started!! Please visit:",
        '\x1b[36m',
        "http://localhost:" + port,
        '\x1b[0m');
});

// socket connection handler
io.on('connection', (socket) => {
    socket.on('message', (data) => {
        console.log(data);
    });
});
