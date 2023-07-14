import { createPool } from 'mysql2/promise';

const pool = createPool({
  host: process.env.MYSQLDB_HOST,
  user: process.env.MYSQLDB_USER,
  password: process.env.MYSQLDB_ROOT_PASSWORD,
  port: process.env.MYSQLDB_PORT,
  database: process.env.MYSQLDB_DATABASE,
});

export { pool };
