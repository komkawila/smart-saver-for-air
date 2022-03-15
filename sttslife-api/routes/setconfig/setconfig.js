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
    console.log("GET config id = " + user_id)
    await db.query("SELECT * FROM config_tb WHERE user_id = 0 or user_id = ?",
        [user_id, user_id],
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



route.get('/id/:config_id', async (req, res, next) => {
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

route.post('/', async (req, res, next) => {
    const user_id = req.body.user_id;
    const config_name = req.body.config_name;
    await db.query("INSERT INTO config_tb (user_id,config_name)  VALUES (?,?)",
        [user_id, config_name],
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

route.put('/:config_id', async (req, res, next) => {
    const config_id = req.params.config_id;
    const config_slope = req.body.config_slope;
    const config_tempcutoff = req.body.config_tempcutoff;
    const config_templeak = req.body.config_templeak;
    const config_timeleak = req.body.config_timeleak;
    const config_time1 = req.body.config_time1;
    const config_time2 = req.body.config_time2;
    const config_time3 = req.body.config_time3;
    const config_sleep = req.body.config_sleep;
    const config_pulsecount = req.body.config_pulsecount;
    const config_name = req.body.config_name;

    await db.query("UPDATE config_tb SET \
    config_slope=?,config_tempcutoff=?,config_templeak=?,config_timeleak=?,config_time1=?,\
    config_time2=?,config_time3=?,config_sleep=?,config_pulsecount=?,config_name=?\
    WHERE config_id = ?",
        [config_slope, config_tempcutoff, config_templeak, config_timeleak, config_time1,
            config_time2, config_time3, config_sleep, config_pulsecount, config_name, config_id],
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

route.delete('/:config_id', async (req, res, next) => {
    const config_id = req.params.config_id;

    await db.query("DELETE FROM config_tb WHERE config_id = ?",
        [config_id],
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

// route.post('/:config_id', async (req, res, next) => {
//     const config_id = req.params.config_id;
//     const config_slope = req.body.config_slope;
//     const config_tempcutoff = req.body.config_tempcutoff;
//     const config_templeak = req.body.config_templeak;
//     const config_timeleak = req.body.config_timeleak;
//     const config_time1 = req.body.config_time1;
//     const config_time2 = req.body.config_time2;
//     const config_time3 = req.body.config_time3;
//     const config_sleep = req.body.config_sleep;
//     const config_pulsecount = req.body.config_pulsecount;
//     const config_name = req.body.config_name;

//     await db.query("UPDATE config_tb SET \
//     config_slope=?,config_tempcutoff=?,config_templeak=?,config_timeleak=?,config_time1=?,\
//     config_time2=?,config_time3=?,config_sleep=?,config_pulsecount=?,config_name=? \
//     WHERE config_id = ?",
//         [config_slope, config_tempcutoff, config_templeak, config_timeleak, config_time1,
//             config_time2, config_time3, config_sleep, config_pulsecount, config_name, config_id],
//         function (err, result, fields) {
//             if (err) {
//                 console.log(err);
//                 res.send({ err: true, status: false, message: err });
//             } else {
//                 const json = { err: false, status: (result.length == 0 ? false : true), message: result };
//                 res.send(json);
//             }
//         });
// });

module.exports = route;