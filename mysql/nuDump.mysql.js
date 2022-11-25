if (
  !process.env.MYSQL_NUDUMP_DATABASE ||
  !process.env.MYSQL_NUDUMP_USERNAME ||
  !process.env.MYSQL_NUDUMP_PASSWORD
)
  return;

const mysql = require("mysql");

const hostName = process.env.MYSQL_HOSTNAME;
const tcpPort = process.env.MYSQL_PORT || 3306;
const nuDataBase = process.env.MYSQL_NUDUMP_DATABASE;
const nuUserName = process.env.MYSQL_NUDUMP_USERNAME;
const nuPassWord = process.env.MYSQL_NUDUMP_PASSWORD;

const nuDumpCon = mysql.createConnection({
  host: hostName,
  database: nuDataBase,
  user: nuUserName,
  password: nuPassWord,
  port: tcpPort,
});

module.exports = nuDumpCon;
