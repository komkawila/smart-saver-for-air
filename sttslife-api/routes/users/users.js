const express = require('express');
const db = require('../../util/db.config');
const route = express.Router();

// Get USER Type All
route.get('/', async (req, res, next) => {
    console.log("GET USER")
    await db.query("SELECT * FROM user_tb", function (err, result, fields) {
        if (err) {
            console.log(err);
            res.send({ err: true, status: false, message: err });
        } else {
            const json = { err: false, status: (result.length == 0 ? false : true), message: result };
            res.send(json);
        }
    });
});

// Get USER Type All
route.get('/:user_id', async (req, res, next) => {
    const user_id = req.params.user_id;
    console.log("GET USER ID " + user_id)
    await db.query("SELECT * FROM user_tb WHERE user_id = ?", [user_id], function (err, result, fields) {

        if (err) {
            console.log(err);
            res.send({ err: true, status: false, message: err });
        } else {
            const json = { err: false, status: (result.length == 0 ? false : true), message: result };
            res.send(json);
        }
    });
});

// POST USER Type All
route.post('/', async (req, res, next) => {
    const user_username = req.body.user_username;
    const user_password = req.body.user_password;
    const user_detail = req.body.user_detail;
    const user_localtion = req.body.user_localtion;
    const user_type = req.body.user_type;
    const air_species = req.body.air_species;
    const user_purchaseorder = req.body.user_purchaseorder;
    const user_tel = req.body.user_tel;
    const air_brand = req.body.air_brand;
    const air_btu = req.body.air_btu;
    const air_type = req.body.air_type;
    const air_lifetime = req.body.air_lifetime;
    const user_startwaranty = req.body.user_startwaranty;
    const user_endwaranty = req.body.user_endwaranty;

    console.log("Add USER")
    await db.query("INSERT INTO user_tb (\
        user_username, user_password, user_detail, user_localtion, user_type, air_species, user_purchaseorder, \
        user_tel, air_brand, air_btu, air_type, air_lifetime,user_startwaranty,user_endwaranty) \
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)",
        [user_username, user_password, user_detail, user_localtion, user_type, air_species, user_purchaseorder,
            user_tel, air_brand, air_btu, air_type, air_lifetime, user_startwaranty, user_endwaranty],
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


// PUT USER Type All
route.put('/modes/:user_id', async (req, res, next) => {
    const user_id = req.params.user_id;
    const user_modes = req.body.user_modes;

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

route.put('/enable/:user_id', async (req, res, next) => {
    const user_id = req.params.user_id;
    const user_enable = req.body.user_enable;

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

route.put('/pulse/:user_id', async (req, res, next) => {
    const user_id = req.params.user_id;
    const user_pulseset = req.body.user_pulseset;

    console.log("UPDATE Modes = " + user_pulseset + "user : " + user_id);
    await db.query("UPDATE user_tb SET user_pulseset = ?\
        WHERE user_id =?",
        [user_pulseset, user_id],
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

// PUT USER Type All
route.put('/', async (req, res, next) => {
    const user_id = req.body.user_id;
    const user_username = req.body.user_username;
    const user_password = req.body.user_password;
    const user_detail = req.body.user_detail;
    const user_localtion = req.body.user_localtion;
    const user_type = req.body.user_type;
    const air_species = req.body.air_species;
    const user_purchaseorder = req.body.user_purchaseorder;
    const user_tel = req.body.user_tel;
    const air_brand = req.body.air_brand;
    const air_btu = req.body.air_btu;
    const air_type = req.body.air_type;
    const air_lifetime = req.body.air_lifetime;
    const user_startwaranty = req.body.user_startwaranty;
    const user_endwaranty = req.body.user_endwaranty;

    console.log("PUT USER")
    await db.query("UPDATE user_tb SET user_username =?, user_password =?, user_detail =?, user_localtion =?, \
        user_type =?, air_species =?, user_purchaseorder =?, user_tel =?, air_brand =?, air_btu =?, air_type =?, \
        air_lifetime =?,user_startwaranty =?,user_endwaranty =?\
        WHERE user_id =?",
        [user_username, user_password, user_detail, user_localtion, user_type, air_species, user_purchaseorder,
            user_tel, air_brand, air_btu, air_type, air_lifetime, user_startwaranty, user_endwaranty, user_id],
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

// DELETE USER Type All
route.delete('/:user_id', async (req, res, next) => {
    const user_id = req.params.user_id;
    console.log("GET USER ID " + user_id)
    await db.query("DELETE FROM user_tb WHERE user_id = ?", [user_id], function (err, result, fields) {
        if (err) {
            console.log(err);
            res.send({ err: true, status: false, message: err });
        } else {
            const json = { err: false, status: (result.length == 0 ? false : true), message: result };
            res.send(json);
        }
    });
});


route.put('/nightmode/:user_id', async (req, res, next) => {
    const user_id = req.params.user_id;
    const nightmode = req.body.nightmode;

    console.log("UPDATE nightmode = " + nightmode + "user : " + user_id);
    await db.query("UPDATE user_tb SET nightmode = ?\
        WHERE user_id =?",
        [nightmode, user_id],
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

route.put('/sleepmode/:user_id', async (req, res, next) => {
    const user_id = req.params.user_id;
    const sleepmode = req.body.sleepmode;

    console.log("UPDATE sleepmode = " + sleepmode + "user : " + user_id);
    await db.query("UPDATE user_tb SET sleepmode = ?\
        WHERE user_id =?",
        [sleepmode, user_id],
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

route.put('/logo/:user_id', async (req, res, next) => {
    const user_id = req.params.user_id;
    const logo = req.body.logo;

    console.log("UPDATE logo = " + logo + "user : " + user_id);
    await db.query("UPDATE user_tb SET logo = ?\
        WHERE user_id =?",
        [logo, user_id],
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