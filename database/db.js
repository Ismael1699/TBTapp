import { createPool } from 'mysql2/promise';
import { prototype } from 'xlsx-populate';

const pool = createPool({
  host: 'localhost',
  user: 'root',
  password: '12345',
  port: 3306,
  database: 'database',
});

export { pool };
