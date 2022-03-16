const express = require("express");
const db = require("../../util/db.config");
const route = express.Router();

route.get(
  "/log/:user_id/:datalog_count/:datalog_tempavg",
  async (req, res, next) => {
    const user_id = req.params.user_id;
    const datalog_count = req.params.datalog_count;
    const datalog_tempavg = req.params.datalog_tempavg;
    db.query(
      "INSERT INTO datalog_tb (user_id, datalog_count, datalog_tempavg) VALUES (?, ?, ?)",
      [user_id, datalog_count, datalog_tempavg],
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
  }
);

module.exports = route;
