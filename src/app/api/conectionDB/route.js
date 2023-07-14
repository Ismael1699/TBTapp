import { pool } from '../../../database/db';
import { NextResponse } from 'next/server';
const fs = require('fs');
import { join } from 'path';
import { cwd } from 'process';

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
  });

  await pool.query('INSERT INTO row_requisiciones SET ?', {
    n_compra: numero,
    frente: frente,
    obj_table: JSON.stringify({ table: table }),
  });

  return NextResponse.json({
    message: `Se ha añadio la requisición ${numero}`,
  });
}

export async function GET() {
  const [response] = await pool.query(`
      SELECT  requisiciones.id, requisiciones.proyecto, requisiciones.frente, requisiciones.suministro, requisiciones.fecha, requisiciones.lugar, requisiciones.numero, requisiciones.proveedor , row_requisiciones.obj_table
      FROM requisiciones 
      INNER JOIN row_requisiciones 
      ON  requisiciones.numero = row_requisiciones.n_compra ;`);
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
    'UPDATE requisiciones SET proyecto = ?, frente = ?, suministro = ?, fecha = ?, lugar = ?, proveedor = ?, numero = ? ',
    [proyecto, frente, suministro, fecha, lugar, proveedor, numero]
  );

  await pool.query(
    'UPDATE row_requisiciones SET n_compra = ?, frente = ?, obj_table = ?',
    [numero, frente, JSON.stringify({ table: table })]
  );

  return NextResponse.json({
    message: `Se ha actualizado la requisición ${numero}`,
  });
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const [numeroRequisicion] = await pool.query(
    `select numero from requisiciones where id=${id};`
  );
  const [frenteRequisicion] = await pool.query(
    `select frente from requisiciones where id=${id};`
  );

  const [idTable] = await pool.query(
    `select id from row_requisiciones where n_compra=${numeroRequisicion[0].numero};`
  );

  await pool.query('DELETE FROM requisiciones WHERE id = ?', [id]);
  await pool.query(`DELETE FROM row_requisiciones WHERE id=${idTable[0].id}`);

  if (frenteRequisicion[0].frente === 'MAQUINARIA') {
    const filename = join(
      cwd(),
      'ExcelsStorageRequis',
      'Maquinaria',
      `HOJA DE COMPRA ${numeroRequisicion[0].numero}.xlsm`
    );
    fs.unlink(filename, (err) => {
      if (err) {
        console.error('Error al eliminar el archivo:', err);
        return;
      }

      console.log('Archivo eliminado correctamente.');
    });
  }
  if (frenteRequisicion[0].frente === 'PLANEACION') {
    const filename = join(
      cwd(),
      'ExcelsStorageRequis',
      'Planeacion',
      `HOJA DE COMPRA ${numeroRequisicion[0].numero}.xlsm`
    );
    fs.unlink(filename, (err) => {
      if (err) {
        console.error('Error al eliminar el archivo:', err);
        return;
      }

      console.log('Archivo eliminado correctamente.');
    });
  }
  return NextResponse.json({
    message: `Se ha eliminado correctamente`,
  });
}
