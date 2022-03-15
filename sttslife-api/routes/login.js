const express = require('express');
const db = require('../util/db.config');
const route = express.Router();

// Login
route.post('/', async (req, res, next) => {
    const user_username = req.body.user_username;
    const user_password = req.body.user_password;
    console.log("Login " + user_username + "  |  " + user_password);
    await db.query("SELECT * FROM user_tb WHERE user_username = ? and user_password = ?",
        [user_username, user_password], function (err, result, fields) {
            if (err) {
                console.log(err);
                res.send({ err: true, status: false, message: err });
            } else {
                const json = { err: false, status: (result.length == 0 ? false : true), message: result };
                res.send(json);
            }
        });
});

module.exports = route;