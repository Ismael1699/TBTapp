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
    obj_table: JSON.stringify({ table: table }),
  });
  return NextResponse.json({
    message: `Se ha añadio la requisición ${numero}`,
  });
}

export async function GET() {
  const [response] = await pool.query('SELECT * FROM requisiciones');
  return NextResponse.json({ data: response });
}

export async function PUT(req) {
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

  await pool.query(
    'UPDATE requisiciones SET proyecto = ?, frente = ?, suministro = ?, fecha = ?, lugar = ?, proveedor = ? , obj_table = ? where numero = ? ',
    [
      proyecto,
      frente,
      suministro,
      fecha,
      lugar,
      proveedor,
      JSON.stringify({ table: table }),
      numero,
    ]
  );
  return NextResponse.json({
    message: `Se ha actualizado la requisición ${numero}`,
  });
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  await pool.query('DELETE FROM requisiciones WHERE id = ?', [id]);

  return NextResponse.json({
    message: `Se ha eliminado correctamente`,
  });
}
