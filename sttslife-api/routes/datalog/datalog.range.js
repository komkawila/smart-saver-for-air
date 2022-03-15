const express = require("express");
const db = require("../../util/db.config");
// const db = require('../util/db.config');
const route = express.Router();

route.get("/date/:user_id", async (req, res, next) => {
  const user_id = req.params.user_id;
  const startdate = req.body.startdate;
  const enddate = req.body.enddate;
  db.query(
    "SELECT * \
      FROM datalog_tb \
      WHERE datalog_time >= ? \
      AND datalog_time <= DATE(?)\
      AND user_id = DATE(?)",
    [startdate, enddate, user_id],
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

route.get("/datetimes/:user_id", async (req, res, next) => {
  const user_id = req.params.user_id;
  const startdatetimes = req.body.startdatetimes;
  const enddatetimes = req.body.enddatetimes;

  const query = `SELECT * FROM datalog_tb  WHERE datalog_time >= '${startdatetimes}'  AND datalog_time <='${enddatetimes}' AND user_id =${user_id}`;
//   console.log(query);
  db.query(query, function (err, result, fields) {
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
  });
});

module.exports = route;
