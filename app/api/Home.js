"use strict";
const server = require('../../server.js');
const crypto = require('crypto');

module.exports = {
    index: (req, res) => {
        res.json({
            success: true,
            data: "Welcome"
        });
    },
    signup: (req, res) => {
        let whiteSpaces = /^\s*$/,
            username = req.query.username,
            mobile = req.query.mobile,
            password = req.query.password;

        if (username.match(whiteSpaces) ||
            mobile.match(whiteSpaces) ||
            password.match(whiteSpaces) ||
            mobile.length != 10) {
            res.json({
                success: false,
                data: "Invalid input"
            });
        } else {
            password = crypto.createHash('md5').update(password).digest("hex");
            server.pool.getConnection((err, connection) => {
                let query = "SELECT * FROM user WHERE ?";

                connection.query(query, {
                    mobile: mobile
                }, (error, results, fields) => {
                    let updateStatus = () => {
                        connection.query("UPDATE user SET ?", {
                            status: "online"
                        }, (err, results, fields) => {
                            connection.release();
                            if (err) {
                                console.error(err);
                                res.json({
                                    success: false,
                                    data: "Something went wrong!"
                                });
                            } else {
                                res.json({
                                    success: true,
                                    data: "Logged in."
                                });
                            }
                        });
                    };

                    let insertUser = () => {
                        connection.query("INSERT INTO user \
                            (mobile, username, password, createdAt) \
                            VALUES(?, ?, ?, ?)", [
                            mobile,
                            username,
                            password,
                            new Date()
                        ], (err, results, fields) => {
                            connection.release();
                            if (err) {
                                console.error(err);
                                res.json({
                                    success: false,
                                    data: "Something went wrong!"
                                });
                            } else {
                                res.json({
                                    success: true,
                                    data: "Logged in."
                                });
                            }
                        });
                    };

                    if (error) {
                        console.error(error);
                        res.json({
                            success: false,
                            data: "Something went wrong!"
                        });
                    } else if (results.length) {
                        if (results[0].username == username &&
                            results[0].password == password) {
                            updateStatus();
                        } else {
                            res.json({
                                success: false,
                                data: "Wrong credentials!"
                            });
                        }
                    } else {
                        insertUser();
                    }
                });
            });
        }
    }
};
