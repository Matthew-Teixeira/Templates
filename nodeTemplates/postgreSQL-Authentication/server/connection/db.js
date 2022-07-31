const Pool = require('pg').Pool;
require("dotenv").config();

const db = new Pool({
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    host: 'localhost',
    database: 'layouts',
    port: 5432
});

module.exports = db;