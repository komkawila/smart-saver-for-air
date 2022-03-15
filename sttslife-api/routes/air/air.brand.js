const express = require('express');
const db = require('../../util/db.config');
// const db = require('../util/db.config');
const route = express.Router();


// ############################## AIR BRAND ##############################
// Get Air Brand All
route.get('/', async (req, res, next) => {
    console.log("GET Air Brand")
    await db.query("SELECT * FROM brand_tb", function (err, result, fields) {
        if (err) {
            console.log(err);
            res.send({ err: true, status: false, message: err });
        } else {
            const json = { err: false, status: (result.length == 0 ? false : true), message: result };
            res.send(json);
        }
    });
});

// Get BY ID Air Brand All
route.get('/:brand_id', async (req, res, next) => {
    const brand_id = req.params.brand_id;
    console.log("GET BY ID Air Brand")
    await db.query("SELECT * FROM brand_tb WHERE brand_id = ?",
        [brand_id],
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

// POST Air Brand All
route.post('/', async (req, res, next) => {
    console.log("POST Air Brand");
    const brand_name = req.body.brand_name;
    await db.query("INSERT INTO brand_tb (brand_name) VALUES (?)", [brand_name], function (err, result, fields) {
        if (err) {
            console.log(err);
            res.send({ err: true, status: false, message: err });
        } else {
            const json = { err: false, status: (result.length == 0 ? false : true), message: result };
            res.send(json);
        }
    });
});

// DELETE Air Brand
route.delete('/:brand_id', async (req, res, next) => {
    console.log("DELETE Air Type");
    const brand_id = req.params.brand_id;
    await db.query("DELETE FROM brand_tb WHERE brand_id = ?",
        [brand_id],
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

// PUT Air Brand
route.put('/', async (req, res, next) => {
    console.log("PUT Air Brand");
    const brand_id = req.body.brand_id;
    const brand_name = req.body.brand_name;
    await db.query("UPDATE brand_tb SET brand_name = ? WHERE brand_id = ?",
        [brand_name, brand_id],
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