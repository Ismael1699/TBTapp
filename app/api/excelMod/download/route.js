import { NextResponse } from 'next/server';

import { readFile, utils, set_fs, writeFile, write, read } from 'xlsx';
import { join } from 'path';
import { cwd } from 'process';

let fs = require('fs');

// export async function GET() {
//   set_fs(await import('fs')); // dynamically import 'fs' when needed
//   const filename = join(
//     cwd(),
//     'ExcelsStorageRequis',
//     'plantillas',
//     'plantillaMaquinaria.xlsm'
//   ); // /data/sheetjs.xlsx
//   const wb = readFile(filename);

//   return NextResponse.json({ hola: wb });
// }

const XlsxPopulate = require('xlsx-populate');

export async function GET() {
  let base = '';
  const filename = join(
    cwd(),
    'ExcelsStorageRequis',
    'plantillas',
    'plantillaMaquinaria.xlsm'
  );
  const workbook = await XlsxPopulate.fromFileAsync(
    // './app/api/excelMod/plantilla.xlsm'
    filename
  );
  const file = fs.readFileSync(filename);

  await workbook.outputAsync('base64').then(function (base64) {
    base =
      'data:' +
      'application/vnd.ms-excel.sheet.macroEnabled.12' +
      ';base64,' +
      base64;
  });
  return NextResponse.json({ hola: base });
}
