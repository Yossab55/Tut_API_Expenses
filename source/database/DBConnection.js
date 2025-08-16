import mysql from "mysql2/promise";
import { env } from "../../utils/helpers.js";

const connectionLimit = 10;
const queueLimit = 0;
console.log(env("DBhost"));
const mainPool = mysql.createPool({
  user: env("DBUser"),
  password: env("DBPassword"),
  host: env("DBhost"),
  database: env("DBName"),
  waitForConnections: true,
  connectionLimit,
  queueLimit,
});

export { mainPool };
