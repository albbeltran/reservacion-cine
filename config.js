const dotenv = require('dotenv');
dotenv.config();

async function connection() {
    try {
        // get the client
        const mysql = require('mysql2/promise');
        // create the connection
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_DATABASE
        });
        
        return connection;
    } catch(err) {
        console.log('CONNECTION ERROR: ', err)
    }
}

module.exports = { connection };