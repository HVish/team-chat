"use strict";

module.exports = {
    index: (req, res) => {
        res.json({
            result: "success",
            data: "Welcome"
        });
    },
    socketPort: (req, res) => {
        const locals = require('../../config/locals.js');
        res.json({
            result: "success",
            data: {
                port: locals.socketPort
            }
        });
    }
};
