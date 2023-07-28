import { NextResponse } from 'next/server';
import { join } from 'path';
import { cwd } from 'process';
const XlsxPopulate = require('xlsx-populate');

export async function POST(req) {
  const res = await req.json();
  let base = '';
  let filename = '';

  if (res.frente === 'MAQUINARIA') {
    filename = join(
      cwd(),
      'src',
      'ExcelsStorageRequis',
      'Maquinaria',
      `HOJA DE COMPRA ${res.numero}.xlsm`
    );
  }

  if (res.frente === 'PLANEACION') {
    filename = join(
      cwd(),
      'src',
      'ExcelsStorageRequis',
      'Planeacion',
      `HOJA DE COMPRA ${res.numero}.xlsm`
    );
  }

  const workbook = await XlsxPopulate.fromFileAsync(filename);

  await workbook.outputAsync('base64').then(function (base64) {
    base =
      'data:' +
      'application/vnd.ms-excel.sheet.macroEnabled.12' +
      ';base64,' +
      base64;
  });

  return NextResponse.json({ excel: base });
}
