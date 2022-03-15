const express = require("express");
const db = require("../../util/db.config");
// const db = require('../util/db.config');
const route = express.Router();

route.post("/date/:user_id", async (req, res, next) => {
    const user_id = req.params.user_id;
    const date = req.body.date;
    db.query(
      "SELECT * FROM datalog_tb where DATE(datalog_time) = ? AND user_id = ?",
      [date, user_id],
      function (err, result, fields) {
        if (err) {
          console.log(err);
          res.send({ err: true, status: false, message: err });
        } else {
          const json = {
            err: false,
            status: result.length == 0 ? false : true,
            message: result,
          };
          res.send(json);
        }
      }
    );
  });


module.exports = route;
