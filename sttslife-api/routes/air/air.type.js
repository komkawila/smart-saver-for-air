const express = require('express');
const db = require('../../util/db.config');
// const db = require('../util/db.config');
const route = express.Router();

// ############################## AIR TYPE ##############################
// Get Air Type All
route.get('/', async (req, res, next) => {
    console.log("GET Air Type")
    await db.query("SELECT * FROM airtype_db", function (err, result, fields) {
        if (err) {
            console.log(err);
            res.send({ err: true, status: false, message: err });
        } else {
            const json = { err: false, status: (result.length == 0 ? false : true), message: result };
            res.send(json);
        }
    });
});

// Get BY ID Air Type All
route.get('/:airtype_id', async (req, res, next) => {
    const airtype_id = req.params.airtype_id;
    console.log("GET BY ID Air Type")
    await db.query("SELECT * FROM airtype_db WHERE airtype_id = ?", [airtype_id], function (err, result, fields) {
        if (err) {
            console.log(err);
            res.send({ err: true, message: err });
        } else {
            const json = { err: false, message: result };
            res.send(json);
        }
    });
});

// POST Air Type All
route.post('/', async (req, res, next) => {
    console.log("POST Air Type");
    const airtype_name = req.body.airtype_name;
    await db.query("INSERT INTO airtype_db (airtype_name) VALUES (?)", [airtype_name], function (err, result, fields) {
        if (err) {
            console.log(err);
            res.send({ err: true, status: false, message: err });
        } else {
            const json = { err: false, status: (result.length == 0 ? false : true), message: result };
            res.send(json);
        }
    });
});

// POST Air Type All
route.delete('/:airtype_id', async (req, res, next) => {
    console.log("DELETE Air Type");
    const airtype_id = req.params.airtype_id;
    await db.query("DELETE FROM airtype_db WHERE airtype_id = ?", [airtype_id], function (err, result, fields) {
        if (err) {
            console.log(err);
            res.send({ err: true, status: false, message: err });
        } else {
            const json = { err: false, status: (result.length == 0 ? false : true), message: result };
            res.send(json);
        }
    });
});


// PUT Air Type  All
route.put('/', async (req, res, next) => {
    console.log("PUT Air Type");
    const airtype_id = req.body.airtype_id;
    const airtype_name = req.body.airtype_name;
    await db.query("UPDATE airtype_db SET airtype_name = ? WHERE airtype_id = ?", [airtype_name, airtype_id], function (err, result, fields) {
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