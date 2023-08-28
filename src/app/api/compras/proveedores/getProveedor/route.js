import { pool } from '@/database/db';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get('name');
  const [dataProveedor] = await pool.query(
    `SELECT * FROM proveedores where name= ?`,
    [name]
  );

  console.log(dataProveedor);
  return NextResponse.json(dataProveedor.length === 0 ? {} : dataProveedor[0]);
}
