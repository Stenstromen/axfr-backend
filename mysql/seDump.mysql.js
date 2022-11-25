if (
  !process.env.MYSQL_SEDUMP_DATABASE ||
  !process.env.MYSQL_SEDUMP_USERNAME ||
  !process.env.MYSQL_SEDUMP_PASSWORD
)
  return;

const mysql = require("mysql");

const hostName = process.env.MYSQL_HOSTNAME;
const tcpPort = process.env.MYSQL_PORT || 3306;
const seDataBase = process.env.MYSQL_SEDUMP_DATABASE;
const seUserName = process.env.MYSQL_SEDUMP_USERNAME;
const sePassWord = process.env.MYSQL_SEDUMP_PASSWORD;

const seDumpCon = mysql.createConnection({
  host: hostName,
  database: seDataBase,
  user: seUserName,
  password: sePassWord,
  port: tcpPort,
});

module.exports = seDumpCon;
