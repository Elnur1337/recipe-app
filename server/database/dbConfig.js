const mysql = require('mysql');

const database = mysql.createConnection({
    host: 'localhost',
    user: 'elnurdev',
    password: 'elnurdev',
    database: 'yournextmeal'
});
exports.dbConnection = database;