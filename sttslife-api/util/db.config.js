const mysql = require("mysql");
const db = mysql.createPool({
    host: "dns.sttslife.co",
    user: "configuser",
    password: "q4%T5cr3",
    database: "saverair_db",
    timezone:"UTC"
    
    // host: "localhost",
    // user: "root",
    // password: "q4%T5cr3",
    // database: "saverair_db",
    // timezone:"UTC"
});

module.exports = db;