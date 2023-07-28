const XlsxPopulate = require('xlsx-populate');
import { NextResponse } from 'next/server';
import { join } from 'path';
import { cwd } from 'process';
import { pool } from '@/database/db';

export async function POST(req) {
  //request del cliente
  const body = await req.json();
  let workbook = '';
  let base = '';
  if (body.frente === 'MAQUINARIA') {
    workbook = await XlsxPopulate.fromFileAsync(
      join(
        cwd(),
        'src',
        'ExcelsStorageRequis',
        'plantillas',
        'plantillaMaquinaria.xlsm'
      )
    );
  }
  if (body.frente === 'PLANEACION') {
    workbook = await XlsxPopulate.fromFileAsync(
      join(
        cwd(),
        'src',
        'ExcelsStorageRequis',
        'plantillas',
        'plantillaPlaneacion.xlsm'
      )
    );
  }

  //CASE OBJECT suministro
  const suministroStructur = {
    'MATERIALES DE CONSTRUCCION': 'H8',
    REFACCIONES: 'H9',
    'COMBUSTIBLES Y ACEITES': 'H10',
    'RESGUARDO CONSUMOS': 'H11',
    'EQUIPO AUXILIAR': 'H12',
    PAPELERIA: 'H13',
    OTROS: 'H14',
  };
  //CASE OBJECT lugar
  const lugarStructur = {
    local: 'O9',
    regional: 'O10',
    nacional: 'O11',
  };

  //palabra clave para suministro
  const keyWordSuministro = body.suministro;
  const cellSuministro = suministroStructur[keyWordSuministro];
  //palabra clave para lugar
  const keyWordLugar = body.lugar;
  const cellLugar = lugarStructur[keyWordLugar];

  //modificar celdas en la hoja requi
  workbook.sheet('requi').cell('C7').value(parseInt(body.proyecto, 10));
  workbook.sheet('requi').cell('C9').value(body.frente);
  workbook.sheet('requi').cell('C11').value(body.fecha);
  workbook.sheet('requi').cell('O5').value(parseInt(body.numero, 10));
  workbook.sheet('requi').cell('K20').value(body.proveedor);
  workbook.sheet('requi').cell(cellSuministro).value('X');
  workbook.sheet('requi').cell(cellLugar).value('X');
  console.log(body);
  //modificar celdas de la tabla de productos
  let numberTable = 19;
  let cellNumberUnitario = 16;
  body.obj_table.table.map((item, index) => {
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
    workbook
      .sheet('compra')
      .cell('L' + cellNumberUnitario)
      .value(parseFloat(item.unitario, 10));
    cellNumberUnitario++;
  });

  const [dataProveedor] = await pool.query(
    `SELECT * FROM proveedores where name= ?`,
    [body.proveedor]
  );
  workbook.sheet('requi').cell('K20').value(body.proveedor);
  workbook.sheet('requi').cell('M20').value(dataProveedor[0].rfc);
  workbook.sheet('requi').cell('M21').value(dataProveedor[0].cuenta);
  workbook.sheet('requi').cell('M22').value(dataProveedor[0].clabe);
  workbook.sheet('requi').cell('M23').value(dataProveedor[0].telefono);
  workbook.sheet('requi').cell('M24').value(dataProveedor[0].correo);
  workbook.sheet('requi').cell('M25').value(dataProveedor[0].banco);
  workbook.sheet('compra').cell('H8').value(dataProveedor[0].direccion);
  workbook.sheet('compra').cell('H29').value(dataProveedor[0].contacto);

  await workbook.outputAsync('base64').then(function (base64) {
    base =
      'data:' +
      'application/vnd.ms-excel.sheet.macroEnabled.12' +
      ';base64,' +
      base64;
  });

  return NextResponse.json({ excel: base });
}
