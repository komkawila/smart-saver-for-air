const mysql = require("mysql");
const db = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "P@ssw0rd",
    database: "saverair_db",
});

module.exports = db;