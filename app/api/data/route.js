const XlsxPopulate = require('xlsx-populate');
import { NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.json();

  console.log(body);

  const workbook = await XlsxPopulate.fromFileAsync(
    './app/api/data/plantilla.xlsx'
  );
  const sheet = workbook.sheet('requi');
  const cell = sheet.cell('A1');
  cell.value('hola mundo');

  await workbook.toFileAsync('./app/api/data/plantilla.xlsx');

  return NextResponse.json({ url: 'se creo corretamente' });
}
