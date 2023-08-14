import { pool } from '@/database/db';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get('name');
  const [dataProveedor] = await pool.query(
    `SELECT * FROM proveedores where name= ?`,
    [name]
  );
  return NextResponse.json(dataProveedor[0]);
}
