'use strict';

let mysql = require('mysql');

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'belajar_node_1'
});

connection.connect();

module.exports = connection;
