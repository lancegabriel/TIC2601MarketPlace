const mysql = require('mysql');
const con = mysql.createConnection({
  host: 'remotemysql.com',
  user: 'rkwXkpevKn',
  password: 'Kogavk36q1',
  database: 'rkwXkpevKn'
});
con.connect((err) => {
  if (err) {
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

module.exports = con;
