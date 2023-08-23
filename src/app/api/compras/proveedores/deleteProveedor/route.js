import { NextResponse } from 'next/server';
import { pool } from '@/database/db';

export async function POST(res) {
  const req = await res.json();
  await pool.query('DELETE FROM proveedores WHERE id = ?', [req.id]);

  return NextResponse.json({
    message: `Se ha eliminado correctamente`,
  });
}
