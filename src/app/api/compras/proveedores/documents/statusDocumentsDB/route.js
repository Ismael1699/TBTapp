import { NextResponse } from 'next/server';
import { pool } from '@/database/db';

export async function PUT(req) {
  const body = await req.json();
  console.log(body);

  await pool.query(
    'UPDATE proveedores SET constanciaKey = ?, bancarioKey = ? WHERE id = ?',
    [body.constanciaKey, body.bancarioKey, body.id]
  );

  return NextResponse.json({ message: 'hola mundo' });
}
