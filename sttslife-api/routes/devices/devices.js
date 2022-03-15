const express = require('express');
const db = require('../../util/db.config');
const route = express.Router();


route.get('/users/:user_username', async (req, res, next) => {
    const user_username = req.params.user_username;

    await db.query("SELECT * FROM user_tb WHERE user_username = ?",
        [user_username], function (err, result, fields) {
            if (err) {
                console.log(err);
                res.send({ err: true, status: false, message: err });
            } else {
                const json = { err: false, status: (result.length == 0 ? false : true), message: result };
                res.send(json);
            }
        });
});

route.get('/setmodes/:user_id/:user_modes', async (req, res, next) => {
    const user_id = req.params.user_id;
    const user_modes = req.params.user_modes;

    console.log("UPDATE Modes = " + user_modes + "user : " + user_id)
    await db.query("UPDATE user_tb SET user_modes = ?\
        WHERE user_id =?",
        [user_modes, user_id],
        function (err, result, fields) {
            if (err) {
                console.log(err);
                res.send({ err: true, status: false, message: err });
            } else {
                const json = { err: false, status: (result.length == 0 ? false : true), message: result };
                res.send(json);
            }
        });

});

route.get('/setenable/:user_id/:user_enable', async (req, res, next) => {
    const user_id = req.params.user_id;
    const user_enable = req.params.user_enable;

    console.log("UPDATE Modes = " + user_enable + "user : " + user_id);
    await db.query("UPDATE user_tb SET user_enable = ?\
        WHERE user_id =?",
        [user_enable, user_id],
        function (err, result, fields) {
            if (err) {
                console.log(err);
                res.send({ err: true, status: false, message: err });
            } else {
                const json = { err: false, status: (result.length == 0 ? false : true), message: result };
                res.send(json);
            }
        });
});

route.get('/config/:config_id', async (req, res, next) => {
    const config_id = req.params.config_id;
    await db.query("SELECT * FROM config_tb WHERE config_id = ?",
        [config_id], function (err, result, fields) {
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