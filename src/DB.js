// get the client
import { createPool } from "mysql2/promise";
import {
  DB_PORT,
  DB_DATABASE,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
} from "./config.js";
// Create the connection pool. The pool-specific settings are the defaults
export const pool = createPool({
  host: DB_HOST,
  user: DB_USER,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: DB_PORT,
  ssl: { rejectUnauthorized: false },
  /* waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0  */
});
