var mysql = require('mysql');
var db = require('../config/db.js');

var connectMysql = mysql.createConnection(db.getMySQLConnection());

module.exports = connectMysql;
