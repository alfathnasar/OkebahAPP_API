const mysql = require('mysql2');
require('dotenv').config();

const dbPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  
});
  
dbPool.getConnection((err, connection) => {
  if (err) {
    console.error('Gagal terhubung ke database:', err.message);
    console.log(process.env.DB_HOST);
  } else {
    console.log('Berhasil terhubung ke database');
    connection.release(); // Kembalikan koneksi ke dalam pool
    console.log(process.env.DB_HOST);
    console.log(process.env.DB_USER);
    console.log(process.env.DB_PASS);
    console.log(process.env.DB_NAME);
  }
});

module.exports = dbPool.promise();