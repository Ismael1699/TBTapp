import { pool } from '../../../../database/db';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const [response] = await pool.query(
    `SELECT * FROM requisiciones WHERE id=${params.compra}`
  );
  return NextResponse.json(response[0]);
}
