if (
  !process.env.MYSQL_NU_DATABASE ||
  !process.env.MYSQL_NU_USERNAME ||
  !process.env.MYSQL_NU_PASSWORD
)
  return;

const mysql = require("mysql");

const hostName = process.env.MYSQL_HOSTNAME;
const tcpPort = process.env.MYSQL_PORT || 3306;
const nuDataBase = process.env.MYSQL_NU_DATABASE;
const nuUserName = process.env.MYSQL_NU_USERNAME;
const nuPassWord = process.env.MYSQL_NU_PASSWORD;

const nuCon = mysql.createConnection({
  host: hostName,
  database: nuDataBase,
  user: nuUserName,
  password: nuPassWord,
  port: tcpPort,
});

module.exports = nuCon;
