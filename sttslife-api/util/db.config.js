const mysql = require("mysql");
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "q4%T5cr3",
    database: "saverair_db"
});

module.exports = db;