import { pool } from '../../../../database/db';
import { NextResponse } from 'next/server';
const ExcelJS = require('exceljs');
import { join } from 'path';
import { cwd } from 'process';
import numeroALetras from '@/utils/numeroALetra';

const libre = require('libreoffice-convert');
libre.convertAsync = require('util').promisify(libre.convert);

export async function GET(req, { params }) {
  //request del cliente
  const [data] = await pool.query('SELECT * FROM requisiciones where id = ?', [
    params.id,
  ]);
  const body = data[0];

  const [dataProveedor] = await pool.query(
    `SELECT * FROM proveedores where name= ?`,
    [body.proveedor]
  );
  //Reducción del objeto ExcelJS.workbook() a workbook
  const workbook = new ExcelJS.Workbook();

  //si existe el usuario
  if (dataProveedor.length === 0) {
    return new Response(
      'No existe el proveedor, no se puede generar si no hay un proveedor relacionado con la orden de compra',
      {
        status: 500,
      }
    );
  }

  // Condicionales para saber que tipo de plantilla tiene que genera el sistema

  //maquinaria factura
  if (body.frente === 'MAQUINARIA' && dataProveedor[0].factura === 1) {
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
  }

  //maquinria no factura
  if (body.frente === 'MAQUINARIA' && dataProveedor[0].factura === 0) {
    await workbook.xlsx.readFile(
      join(
        cwd(),
        'src',
        'ExcelsStorageRequis',
        'plantillas',
        'maquinaria',
        'NoFactura.xlsx'
      )
    );
  }

  //planeación factura
  if (body.frente === 'PLANEACION' && dataProveedor[0].factura === 1) {
    await workbook.xlsx.readFile(
      join(
        cwd(),
        'src',
        'ExcelsStorageRequis',
        'plantillas',
        'planeacion',
        'Factura.xlsx'
      )
    );
  }

  //planeación no factura
  if (body.frente === 'PLANEACION' && dataProveedor[0].factura === 0) {
    await workbook.xlsx.readFile(
      join(
        cwd(),
        'src',
        'ExcelsStorageRequis',
        'plantillas',
        'planeacion',
        'NoFactura.xlsx'
      )
    );
  }
  //Termina carga de archivos--------------------------------------------

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
  workbook.getWorksheet('requi').getCell('C7').value = parseInt(
    body.proyecto,
    10
  );
  workbook.getWorksheet('requi').getCell('C9').value = body.frente;
  workbook.getWorksheet('requi').getCell('C11').value = body.fecha;
  workbook.getWorksheet('requi').getCell('O5').value = parseInt(
    body.numero,
    10
  );
  workbook.getWorksheet('requi').getCell('K20').value = body.proveedor;
  workbook.getWorksheet('requi').getCell(cellSuministro).value = 'X';
  workbook.getWorksheet('requi').getCell(cellLugar).value = 'X';

  //economico en caso de ser una compra para una maquina
  if (body.economico !== 'No aplica' && body.economico !== '') {
    workbook.getWorksheet('requi').getCell('C31').value = body.economico;
    workbook.getWorksheet('compra').getCell('C31').value = body.economico;
  }

  //si es dolares o no para agregar nota de tipo de cambio a requi a orden de compra
  dataProveedor[0].moneda === 'dolar'
    ? (workbook.getWorksheet('requi').getCell('D30').value =
        'NOTA: HACER EL TIPO DE CAMBIO EL DIA DEL DEPOSITO')
    : '';
  dataProveedor[0].moneda === 'dolar'
    ? (workbook.getWorksheet('compra').getCell('F27').value =
        'NOTA: HACER EL TIPO DE CAMBIO EL DIA DEL DEPOSITO')
    : '';

  //modificar celdas de la tabla de productos
  let numberTable = 19;
  let cellNumberUnitario = 16;
  body.obj_table.table.map((item, index) => {
    numberTable++;
    workbook.getWorksheet('requi').getCell('C' + numberTable).value =
      item.noparte;

    workbook.getWorksheet('requi').getCell('D' + numberTable).value =
      item.descripcion;
    workbook.getWorksheet('requi').getCell('I' + numberTable).value =
      item.unidad;
    workbook.getWorksheet('requi').getCell('J' + numberTable).value = parseInt(
      item.cantidad,
      10
    );
    workbook.getWorksheet('compra').getCell('L' + cellNumberUnitario).value =
      parseFloat(item.unitario, 10);
    cellNumberUnitario++;
  });

  //datos del proveedor
  workbook.getWorksheet('requi').getCell('K20').value = body.proveedor;
  workbook.getWorksheet('requi').getCell('M20').value = dataProveedor[0].rfc;
  workbook.getWorksheet('requi').getCell('M21').value = dataProveedor[0].cuenta;
  workbook.getWorksheet('requi').getCell('M22').value = dataProveedor[0].clabe;
  workbook.getWorksheet('requi').getCell('M23').value =
    dataProveedor[0].telefono;
  workbook.getWorksheet('requi').getCell('M24').value = dataProveedor[0].correo;
  workbook.getWorksheet('requi').getCell('M25').value = dataProveedor[0].banco;
  workbook.getWorksheet('compra').getCell('H8').value =
    dataProveedor[0].direccion;
  workbook.getWorksheet('compra').getCell('H29').value =
    dataProveedor[0].contacto;

  //calculo de impuestos
  const precio = parseFloat(body.precio).toFixed(2);
  const ISRPorcentaje = parseFloat(body.ISR).toFixed(2) / 100;
  if (ISRPorcentaje <= 0) {
    const precioSinInpuestos = (precio / (1.16 - ISRPorcentaje)).toFixed(2);

    const ISRCantidad = (precioSinInpuestos * ISRPorcentaje).toFixed(2);
    workbook.getWorksheet('compra').getCell('M42').value = ISRCantidad;
  }

  // insertar la cantidad en letras
  const cantidadEnLetra = numeroALetras(body.precio, dataProveedor[0].moneda);
  workbook
    .getWorksheet('compra')
    .getCell('B35').value = `SON:( ${cantidadEnLetra} )`;

  //insertar version de app en la ordenes de compras
  workbook
    .getWorksheet('requi')
    .getCell('B38').value = `Generated by TBT-app ${process.env.VERSION_APP}`;
  workbook
    .getWorksheet('compra')
    .getCell('B44').value = `Generated by TBT-app ${process.env.VERSION_APP}`;

  //creación de base64 para enviar al cliente
  const buffer = await workbook.xlsx.writeBuffer();
  const base = buffer.toString('base64');
  const baseExtension =
    'data:' +
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' +
    ';base64,' +
    base;

  // //Carga o lectura del png de la firma
  // const objFirma = workbook.addImage({
  //   filename: join(
  //     cwd(),
  //     'src',
  //     'ExcelsStorageRequis',
  //     'firmas',
  //     'maquinaria.png'
  //   ),
  //   extension: 'png',
  // });

  // workbook.getWorksheet('requi').addImage(objFirma, 'B32:D37');

  // await workbook.xlsx.writeFile(
  //   join(cwd(), 'src', 'app', 'api', 'excelGenerateV2', 'holamundo.xlsx')
  // );

  return NextResponse.json({ excel: baseExtension });
}
