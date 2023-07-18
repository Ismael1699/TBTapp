import { createPool } from 'mysql2/promise';

const pool = createPool({
  host: process.env.NEXT_PUBLIC_MYSQLDB_HOST,
  user: process.env.NEXT_PUBLIC_MYSQLDB_USER,
  password: process.env.NEXT_PUBLIC_MYSQLDB_ROOT_PASSWORD,
  port: process.env.NEXT_PUBLIC_MYSQLDB_PORT,
  database: process.env.NEXT_PUBLIC_MYSQLDB_DATABASE,
  ssl: {
    rejectUnauthorized: false,
  },
});

export { pool };
