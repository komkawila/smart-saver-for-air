const express = require('express');
const db = require('../../util/db.config');
const route = express.Router();

route.get('/', async (req, res, next) => {
    await db.query("SELECT * FROM config_tb", function (err, result, fields) {
        if (err) {
            console.log(err);
            res.send({ err: true, status: false, message: err });
        } else {
            const json = { err: false, status: (result.length == 0 ? false : true), message: result };
            res.send(json);
        }
    });
});

route.get('/:user_id', async (req, res, next) => {
    const user_id = req.params.user_id;
    await db.query("SELECT * FROM config_tb WHERE user_id = ?", 
    [user_id], function (err, result, fields) {
        if (err) {
            console.log(err);
            res.send({ err: true, status: false, message: err });
        } else {
            const json = { err: false, status: (result.length == 0 ? false : true), message: result };
            res.send(json);
        }
    });
});

// INSERT config form user_id
route.post('/', async (req, res, next) => {
    const user_id = req.body.user_id;
    await db.query("INSERT INTO config_tb(user_id) VALUES (?)",
        [user_id],
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

// INSERT config form user_id, config_enableSetting, config_slopeSetting, config_tempCutoffSetting,
//      config_tempMaxSetting, config_tempMinSetting, config_time1Setting, config_time2Setting,
//      config_time3Setting
route.post('/', async (req, res, next) => {
    const user_id = req.body.user_id;
    const config_enableSetting = req.body.config_enableSetting;
    const config_slopeSetting = req.body.config_slopeSetting;
    const config_tempCutoffSetting = req.body.config_tempCutoffSetting;
    const config_tempMaxSetting = req.body.config_tempMaxSetting;
    const config_tempMinSetting = req.body.config_tempMinSetting;
    const config_time1Setting = req.body.config_time1Setting;
    const config_time2Setting = req.body.config_time2Setting;
    const config_time3Setting = req.body.config_time3Setting;
    await db.query("INSERT INTO config_tb(user_id,config_enableSetting,config_slopeSetting,\
        config_tempCutoffSetting,config_tempMaxSetting,config_tempMinSetting,config_time1Setting,\
        config_time2Setting,config_time3Setting) \
        VALUES (?,?,?,?,?,?,?,?,?)",
        [user_id, config_enableSetting, config_slopeSetting, config_tempCutoffSetting,
            config_tempMaxSetting, config_tempMinSetting, config_time1Setting, config_time2Setting,
            config_time3Setting],
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

// UPDATE DATA Config
route.put('/:user_id', async (req, res, next) => {
    const user_id = req.params.user_id;
    const config_enableSetting = req.body.config_enableSetting;
    const config_slopeSetting = req.body.config_slopeSetting;
    const config_tempCutoffSetting = req.body.config_tempCutoffSetting;
    const config_tempMaxSetting = req.body.config_tempMaxSetting;
    const config_tempMinSetting = req.body.config_tempMinSetting;
    const config_time1Setting = req.body.config_time1Setting;
    const config_time2Setting = req.body.config_time2Setting;
    const config_time3Setting = req.body.config_time3Setting;

    await db.query("UPDATE config_tb SET config_enableSetting=?,\
    config_slopeSetting=?,config_tempCutoffSetting=?,config_tempMaxSetting=?,\
    config_tempMinSetting=?,config_time1Setting=?,config_time2Setting=?,\
    config_time3Setting=? WHERE user_id = ?",
        [config_enableSetting, config_slopeSetting, config_tempCutoffSetting,
            config_tempMaxSetting, config_tempMinSetting, config_time1Setting, config_time2Setting,
            config_time3Setting, user_id],
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

// UPDATE ENABLE
route.put('/enable/:user_id', async (req, res, next) => {
    const user_id = req.params.user_id;
    const config_enableSetting = req.body.config_enableSetting;

    await db.query("UPDATE config_tb SET config_enableSetting=? WHERE user_id = ?",
        [config_enableSetting, user_id],
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

module.exports = route;
