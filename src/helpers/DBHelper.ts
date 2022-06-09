import mysql from "mysql2";
import fs from "fs";

const path = process.cwd() + "/config/mysql.json";
const config = JSON.parse(fs.readFileSync(path, "utf8"));

const db_pool = mysql
  .createPool({
    host: config.host,
    user: config.user,
    database: config.database,
    password: config.password,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  })
  .promise();

export { db_pool };
