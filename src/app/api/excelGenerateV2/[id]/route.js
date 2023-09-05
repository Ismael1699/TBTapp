import { pool } from '../../../../database/db';
const XlsxPopulate = require('xlsx-populate');
import { NextResponse } from 'next/server';
const ExcelJS = require('exceljs');
import { join } from 'path';
import { cwd } from 'process';
const PDFDocument = require('pdfkit');
var XLSX = require('xlsx');
/* load 'fs' for readFile and writeFile support */
const fs = require('fs').promises;
const path = require('path');

const libre = require('libreoffice-convert');
libre.convertAsync = require('util').promisify(libre.convert);

export async function GET(req, { params }) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(
    join(
      cwd(),
      'src',
      'ExcelsStorageRequis',
      'plantillas',
      'maquinaria',
      'Factura.xlsx'
    )
  );

  const objFirma = workbook.addImage({
    filename: join(
      cwd(),
      'src',
      'ExcelsStorageRequis',
      'firmas',
      'maquinaria.png'
    ),
    extension: 'png',
  });

  workbook.getWorksheet('requi').addImage(objFirma, 'B32:D37');

  workbook
    .getWorksheet('requi')
    .getCell('B34')
    .workbook.getWorksheet('requi')
    .getCell('C7').value = 'hola mundo';
  await workbook.xlsx.writeFile(
    join(cwd(), 'src', 'app', 'api', 'excelGenerateV2', 'holamundo.xlsx')
  );

  const ext = '.pdf';
  const inputPath = path.join(__dirname, 'holamundo.xlsx');
  const outputPath = path.join(__dirname, `/resources/example${ext}`);

  const Buf = await fs.readFile(inputPath);

  let pdfBuf = await libre.convertAsync(Buf, ext, undefined);

  return NextResponse.json({ message: 'hola mundo' });
}
