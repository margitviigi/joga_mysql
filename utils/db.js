const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();
// Debug: show env values (don't print password in plain text)
console.log('DB ENV:', {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER || null,
    hasPassword: !!process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

connection.connect((error) => {
    if (error) {
        console.error('MySQL connection error:', error);
        // rethrow to allow nodemon to show the crash
        throw error;
    }
    console.log('Connected to MySQL database');
});

module.exports = connection;

