import { read, writeFile, sheetName, Sheet, worksheet } from 'xlsx';

export default function createExcel() {
  // Ruta al archivo Excel
  const filePath = '../plantilla1.xlsx';

  // Lee el archivo Excel
  const workbook = read(filePath);

  // Obtiene la primera hoja del libro
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  // Modifica el valor de una celda específica
  const cell = 'A1';
  worksheet[cell].v = 'Nuevo valor';

  // Guarda el archivo modificado
  const newFilePath = '../plantilla/cache/nuevo-archivo.xlsx';
  writeFile(workbook, newFilePath);

  return console.log('Archivo Excel editado y guardado con éxito.');
}
