import { pool } from '../../../../database/db';
import { NextResponse } from 'next/server';
import url from 'url';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const [response] = await pool.query(
    `SELECT * FROM requisiciones WHERE id=${id}`
  );

  return NextResponse.json(response[0]);
}
