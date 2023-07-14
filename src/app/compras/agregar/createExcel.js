import path from 'path';
import fs from 'fs';
import ExcelJS from 'exceljs';

export default async function handler(req, res) {
  const filePath = path.resolve('../../../plantilla.xlsx');

  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.getWorksheet(1);
    const cell = worksheet.getCell('A1');
    cell.value = 'Nuevo valor';

    await workbook.xlsx.writeFile(filePath);

    res.status(200).json({ message: 'Archivo de Excel editado exitosamente.' });
  } catch (error) {
    console.error('Error al editar el archivo de Excel:', error);
    res.status(500).json({ message: 'Error al editar el archivo de Excel.' });
  }
}
