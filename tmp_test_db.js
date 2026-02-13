require('dotenv').config();
const mysql = require('mysql2');
console.log('ENV:', { MYSQL_HOST: process.env.MYSQL_HOST, MYSQL_USER: process.env.MYSQL_USER ? true : false, MYSQL_PASSWORD: process.env.MYSQL_PASSWORD ? true : false, MYSQL_DATABASE: process.env.MYSQL_DATABASE });
const c = mysql.createConnection({ host: process.env.MYSQL_HOST, user: process.env.MYSQL_USER, password: process.env.MYSQL_PASSWORD, database: process.env.MYSQL_DATABASE });

c.connect((e) => {
  if (e) {
    console.error('CONNECT ERROR:', e);
    process.exit(1);
  } else {
    console.log('Connected OK');
    c.end();
    process.exit(0);
  }
});
