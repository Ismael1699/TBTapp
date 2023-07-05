const XlsxPopulate = require('xlsx-populate');
import { NextResponse } from 'next/server';
import { join } from 'path';
import { cwd } from 'process';

export async function POST(req) {
  //request del cliente
  const body = await req.json();
  console.log(body);
  let workbook = '';
  if (body.frente === 'MAQUINARIA') {
    workbook = await XlsxPopulate.fromFileAsync(
      join(
        cwd(),
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

  //modificar celdas de la tabla de productos
  let numberTable = 19;
  let cellNumberUnitario = 16;
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
    workbook
      .sheet('compra')
      .cell('L' + cellNumberUnitario)
      .value(parseInt(item.unitario, 10));
    cellNumberUnitario++;
  });

  workbook.sheet('requi').cell('K20').value(body.proveedor);
  workbook.sheet('requi').cell('M20').value(body.dataProveedor.rfc);
  workbook.sheet('requi').cell('M21').value(body.dataProveedor.cuenta);
  workbook.sheet('requi').cell('M22').value(body.dataProveedor.clabe);
  workbook.sheet('requi').cell('M23').value(body.dataProveedor.telefono);
  workbook.sheet('requi').cell('M24').value(body.dataProveedor.correo);
  workbook.sheet('requi').cell('M25').value(body.dataProveedor.banco);
  workbook.sheet('compra').cell('H8').value(body.dataProveedor.direccion);
  workbook.sheet('compra').cell('H29').value(body.dataProveedor.contacto);

  console.log(body);

  if (body.frente === 'MAQUINARIA') {
    await workbook.toFileAsync(
      join(
        cwd(),
        'ExcelsStorageRequis',
        'Maquinaria',
        `HOJA DE COMPRA ${body.numero}.xlsm`
      )
    );
  }
  if (body.frente === 'PLANEACION') {
    await workbook.toFileAsync(
      join(
        cwd(),
        'ExcelsStorageRequis',
        'Planeacion',
        `HOJA DE COMPRA ${body.numero}.xlsm`
      )
    );
  }
  return NextResponse.json({
    message:
      "Se ha creado el archivo de excel, consulta el archivo en requisiciones/'tarjeta de la requisicion'/Descargar' ",
    url: 'se creo corretamente',
  });
}
