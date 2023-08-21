import { pool } from '@/database/db';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const rol = searchParams.get('rol');

  const condicionRol =
    rol === 'DIRECTOR' ||
    rol === 'SUPER-INTENDENTE' ||
    rol === 'CONTADOR' ||
    rol === 'SUPER-USER-ROOT';

  if (condicionRol) {
    const [response] = await pool.query(`SELECT * FROM proveedores`);
    return NextResponse.json(response);
  }

  const [response] = await pool.query(
    `SELECT * FROM proveedores WHERE frente="${rol}"`
  );
  return NextResponse.json(response);
}

export async function POST(req) {
  const res = await req.json();

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
    factura: res.factura,
    constanciaKey: 'false',
    bancarioKey: 'false',
  });
  return NextResponse.json({
    message: `Se ha guardado el proveedor "${res.name}" correctamente`,
  });
}

export async function PUT(req) {
  const body = await req.json();

  await pool.query(
    'UPDATE proveedores SET name= ?, direccion = ?, rfc = ?, banco= ?, cuenta = ?, clabe = ?, contacto = ?, telefono = ?, correo = ?, frente = ?, factura = ? WHERE id = ? ',
    [
      body.name,
      body.direccion,
      body.rfc,
      body.banco,
      body.cuenta,
      body.clabe,
      body.contacto,
      body.telefono,
      body.correo,
      body.frente,
      body.factura,
      body.id,
    ]
  );
  return NextResponse.json({
    message: 'Se actualizado los datos del proveedor',
  });
}
