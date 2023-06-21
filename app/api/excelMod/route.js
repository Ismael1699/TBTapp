const XlsxPopulate = require('xlsx-populate');
import { NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.json();

  const workbook = await XlsxPopulate.fromFileAsync(
    './app/api/excelMod/plantilla.xlsx'
  );
  workbook.sheet('requi').cell('C7').value(parseInt(body.proyecto, 10));
  workbook.sheet('requi').cell('C9').value(body.frente);
  workbook.sheet('requi').cell('C11').value(body.fecha);
  workbook.sheet('requi').cell('O5').value(parseInt(body.numero, 10));
  workbook.sheet('requi').cell('K20').value(body.proveedor);

  const suministroStructur = {
    'MATERIALES DE CONSTRUCCION': 'H8',
    REFACCIONES: 'H9',
    'COMBUSTIBLES Y ACEITES': 'H10',
    'RESGUARDO CONSUMOS': 'H11',
    'EQUIPO AUXILIAR': 'H12',
    PAPELERIA: 'H13',
    OTROS: 'H14',
  };

  const lugarStructur = {
    local: 'O9',
    regional: 'O10',
    nacional: 'O11',
  };

  const keyWordSuministro = body.suministro;
  const cellSuministro = suministroStructur[keyWordSuministro];

  const keyWordLugar = body.lugar;
  const cellLugar = lugarStructur[keyWordLugar];

  workbook.sheet('requi').cell(cellSuministro).value('X');
  workbook.sheet('requi').cell(cellLugar).value('X');

  let numberTable = 20;
  body.table.map((item, index) => {
    numberTable++;
    workbook
      .sheet('requi')
      .cell('C' + numberTable)
      .value(item.noparte);

    workbook
      .sheet('requi')
      .cell('D' + numberTable)
      .value(item.descripcion);

    workbook
      .sheet('requi')
      .cell('I' + numberTable)
      .value(item.unidad);
    workbook
      .sheet('requi')
      .cell('J' + numberTable)
      .value(parseInt(item.cantidad, 10));
    // workbook
    //   .sheet('requi')
    //   .cell('K' + numberTable)
    //   .value(item.final);
  });

  await workbook.toFileAsync('./app/api/excelMod/plantilla.xlsx');
  console.log('se creo correctamente');

  return NextResponse.json({ url: 'se creo corretamente' });
}
