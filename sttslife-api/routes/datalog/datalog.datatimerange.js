const express = require("express");
const db = require("../../util/db.config");
// const db = require('../util/db.config');
const route = express.Router();

route.post("/date/:user_id", async (req, res, next) => {
  const user_id = req.params.user_id;
  db.query(
    "SELECT DATE(datalog_time) as date FROM datalog_tb where user_id = ? group by DATE(datalog_time)",
    [user_id],
    function (err, result, fields) {
      if (err) {
        console.log(err);
        res.send({ err: true, status: false, message: err });
      } else {
        const json = {
          err: false,
          status: result.length == 0 ? false : true,
          // message: result.map((data1) => { return new Date(data1.date).toLocaleDateString(); }),
          message: result.map((data1) => {
            const times = new Date(data1.date);
            return {
              date: `${times.getFullYear()}-${
                times.getMonth() + 1
              }-${times.getDate()}`,
            };
            // return { date: (new Date(data1.date).toLocaleDateString()).replaceAll('/','-') };
          }),
        };
        res.send(json);
      }
    }
  );
});

route.post("/time/:user_id/:date", async (req, res, next) => {
  const user_id = req.params.user_id;
  const date = req.params.date;
  db.query(
    "SELECT TIME(datalog_time) as time FROM datalog_tb where DATE(datalog_time) = ? AND user_id = ?",
    [date, user_id],
    function (err, result, fields) {
      if (err) {
        console.log(err);
        res.send({ err: true, status: false, message: err });
      } else {
        const json = {
          err: false,
          status: result.length == 0 ? false : true,
          // message: result.map((data1) => { return new Date(data1.date).toLocaleDateString(); }),
          message: result,
        };
        res.send(json);
      }
    }
  );
});

module.exports = route;
