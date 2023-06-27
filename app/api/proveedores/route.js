import { pool } from '../../../database/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const [response] = await pool.query(`SELECT * FROM proveedores`);
  console.log(response);
  return NextResponse.json({ data: response });
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
    name: res.proveedor,
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
