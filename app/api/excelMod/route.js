const XlsxPopulate = require('xlsx-populate');
import { NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.json();

  console.log(body);

  const workbook = await XlsxPopulate.fromFileAsync(
    './app/api/data/plantilla.xlsx'
  );
  workbook.sheet('requi').cell('C7').value(parseInt(body.proyecto, 10));
  workbook.sheet('requi').cell('C9').value(body.frente);
  workbook.sheet('requi').cell('C11').value(body.fecha);
  workbook.sheet('requi').cell('P5').value(parseInt(body.numero, 10));
  workbook.sheet('requi').cell('L20').value(body.proveedor);

  await workbook.toFileAsync('./app/api/data/plantilla.xlsx');

  return NextResponse.json({ url: 'se creo corretamente' });
}
