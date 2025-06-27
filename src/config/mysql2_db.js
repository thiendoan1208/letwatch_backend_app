const mysql = require("mysql2/promise");
const { config } = require("dotenv");
config();

// Create the connection pool. The pool-specific settings are the defaults
const connection = mysql.createPool({
  host: process.env.LETWATCH_DB_HOSTNANE,
  user: process.env.LETWATCH_DB_USER,
  database: process.env.LETWATCH_DB,
  port: process.env.LETWATCH_DB_PORT,
  password: process.env.LETWATCH_DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 100,
  maxIdle: 100, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

module.exports = {
  connection,
};
