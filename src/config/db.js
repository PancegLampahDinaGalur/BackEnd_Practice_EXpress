const pg = require('pg');
const { DB_PASS, DB_NAME, DB_USER, DB_HOST, DB_PORT } = process.env;
const { Pool } = pg; // Pool digunakan ketika kita memiliki banyak koneksi database, Client digunakan ketika kita hanya memiliki satu koneksi database

<<<<<<< HEAD
console.log(DB_PASS)

=======
>>>>>>> 54feef687257eb0e60cfb23bcacb5295357e8753
const pool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_NAME,
    password: DB_PASS,
    port: DB_PORT
});
<<<<<<< HEAD
 
pool.on('error', (err, _client) => {
=======

pool.on('error', (err, client) => {
>>>>>>> 54feef687257eb0e60cfb23bcacb5295357e8753
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
})

<<<<<<< HEAD
// pool.on('error', (err) => {
//     console.error('Unexpected error on idle client', err)
//     process.exit(-1)
// })
 
pool.connect((err, connection) => {
    if (err) throw err, console.log("Error :", err);
    console.log('Connected to database');
    connection.release();
});
 
module.exports = pool;
 
=======
pool.connect((err, connection) => {
    if (err) throw err, console.log(err);;
    console.log('Connected to database');
    connection.release();
});

module.exports = pool;
>>>>>>> 54feef687257eb0e60cfb23bcacb5295357e8753
