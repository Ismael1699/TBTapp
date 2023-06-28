import { pool } from '../../../database/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const [response] = await pool.query(`SELECT * FROM proveedores`);
  return NextResponse.json(response);
}

export async function POST(req) {
  const res = await req.json();
  console.log(res);

  const [dataDuplicate] = await pool.query(
    `SELECT id, clabe FROM proveedores WHERE frente ="${res.frente}"`
  );
  let isDuplicate = false;
  dataDuplicate.map((obj) =>
    obj.clabe === res.clabe ? (isDuplicate = true) : (isDuplicate = false)
  );

  if (isDuplicate) {
    return NextResponse.json({
      message: `La clabe bancaria "${res.clabe}" ya esta asociada con otro proveedor, por favor verficar los datos`,
    });
  }

  await pool.query('INSERT INTO proveedores SET ?', {
    name: res.name,
    direccion: res.direccion,
    rfc: res.rfc,
    banco: res.banco,
    cuenta: res.cuenta,
    clabe: res.clabe,
    contacto: res.contacto,
    telefono: res.telefono,
    correo: res.correo,
    frente: res.frente,
  });
  return NextResponse.json({
    message: `Se ha guardado el proveedor "${res.proveedor}" correctamente`,
  });
}

export async function PUT(req) {
  const res = await req.json();
  console.log(res);

  await pool.query(
    'UPDATE proveedores SET name= ?, direccion = ?, rfc = ?, banco= ?, cuenta = ?, clabe = ?, contacto = ?, telefono = ?, correo = ?, frente = ? WHERE id = ? ',
    [
      res.name,
      res.direccion,
      res.rfc,
      res.banco,
      res.cuenta,
      res.clabe,
      res.contacto,
      res.telefono,
      res.correo,
      res.frente,
      res.id,
    ]
  );
  return NextResponse.json({
    message: 'Se actualizado los datos del proveedor',
  });
}
