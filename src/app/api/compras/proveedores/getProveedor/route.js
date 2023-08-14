import { pool } from '@/database/db';
import { NextResponse } from 'next/server';

export async function GET() {
  // const [dataProveedor] = await pool.query(
  //   `SELECT * FROM proveedores where name= ?`,
  //   [proveedor]
  // );
  return NextResponse.json({ proveedor: 'hola mundo' });
}
