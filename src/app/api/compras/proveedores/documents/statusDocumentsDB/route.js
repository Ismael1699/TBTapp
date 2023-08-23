import { NextResponse } from 'next/server';
import { pool } from '@/database/db';

export async function PUT(req) {
  const body = await req.json();
  await pool.query(
    `UPDATE proveedores SET ${body.nameFile}Key = ? WHERE id = ?`,
    [body.key, body.id]
  );

  return NextResponse.json({ message: 'Se ha guardado la key correctamente' });
}
