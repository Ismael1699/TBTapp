import { pool } from '../../../database/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const {
    proyecto,
    frente,
    suministro,
    fecha,
    lugar,
    proveedor,
    numero,
    table,
  } = await req.json();

  console.log(table);
  const [dataDuplicate] = await pool.query(
    `SELECT id, frente , numero FROM requisiciones WHERE frente ="${frente}"`
  );
  let isDuplicate = false;
  dataDuplicate.map((obj) =>
    obj.numero === numero ? (isDuplicate = true) : (isDuplicate = false)
  );

  if (isDuplicate) {
    return NextResponse.json({
      message: `La Requsicion "${numero}", frente de "${frente}" ya ha sido creada, por favor confirme el numero de requisición ingresada`,
    });
  }
  await pool.query('INSERT INTO requisiciones SET ?', {
    proyecto,
    frente,
    suministro,
    fecha,
    lugar,
    proveedor,
    numero,
  });

  table.map(async (obj) => {
    await pool.query('INSERT INTO row_requisiciones SET ?', {
      n_compra: numero,
      frente: frente,
      obj_table: JSON.stringify(obj),
    });
  });

  return NextResponse.json({
    message: `Se ha añadio la requisición ${numero}`,
  });
}

export async function GET() {
  const [response] = await pool.query(`SELECT * FROM requisiciones`);
  console.log(response);
  return NextResponse.json({ data: response });
}
