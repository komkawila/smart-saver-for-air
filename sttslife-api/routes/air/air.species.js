const express = require('express');
const db = require('../../util/db.config');
// const db = require('../util/db.config');
const route = express.Router();

// ############################## AIR Species ##############################
// Get Air Species All
route.get('/', async (req, res, next) => {
    console.log("GET Air Species")
    await db.query("SELECT * FROM species_tb", function (err, result, fields) {
        if (err) {
            console.log(err);
            res.send({ err: true, status: false, message: err });
        } else {
            const json = { err: false, status: (result.length == 0 ? false : true), message: result };
            res.send(json);
        }
    });
});

// Get BY ID Air Species All
route.get('/:species_id', async (req, res, next) => {
    const species_id = req.params.species_id;
    console.log("GET BY ID Air Species")
    await db.query("SELECT * FROM species_tb WHERE species_id = ?", [species_id], function (err, result, fields) {
        if (err) {
            console.log(err);
            res.send({ err: true, message: err });
        } else {
            const json = { err: false, message: result };
            res.send(json);
        }
    });
});

// POST Air Species All
route.post('/', async (req, res, next) => {
    console.log("POST Air Species");
    const species_name = req.body.species_name;
    await db.query("INSERT INTO species_tb (species_name) VALUES (?)", [species_name], function (err, result, fields) {
        if (err) {
            console.log(err);
            res.send({ err: true, status: false, message: err });
        } else {
            const json = { err: false, status: (result.length == 0 ? false : true), message: result };
            res.send(json);
        }
    });
});

// POST Air Species All
route.delete('/:species_id', async (req, res, next) => {
    console.log("DELETE Air Species");
    const species_id = req.params.species_id;
    await db.query("DELETE FROM species_tb WHERE species_id = ?", [species_id], function (err, result, fields) {
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
    const species_id = req.body.species_id;
    const species_name = req.body.species_name;
    await db.query("UPDATE species_tb SET species_name = ? WHERE species_id = ?", [species_name, species_id], function (err, result, fields) {
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