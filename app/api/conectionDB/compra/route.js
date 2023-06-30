import { pool } from '../../../../database/db';
import { NextResponse } from 'next/server';
import url from 'url';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  const [res] = await pool.query(`
      SELECT  requisiciones.id, requisiciones.proyecto, requisiciones.frente, requisiciones.suministro, requisiciones.fecha, requisiciones.lugar, requisiciones.numero, requisiciones.proveedor , row_requisiciones.obj_table
      FROM database.requisiciones
      INNER JOIN database.row_requisiciones
      ON  requisiciones.numero = row_requisiciones.n_compra
      WHERE requisiciones.id=${id}`);

  console.log(res);

  return NextResponse.json(res[0]);
}
