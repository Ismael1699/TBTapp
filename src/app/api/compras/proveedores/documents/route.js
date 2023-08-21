import { NextResponse } from 'next/server';
import { uploadFileS3, downloadFileS3, deleteFileS3 } from '@/services/upload';
import axios from 'axios';
const fs = require('fs/promises');

export async function POST(request) {
  let body = await request.formData();
  const file = body.get('file');
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const frente = body.get('frente').toLowerCase();
  const proveedor = body.get('proveedor').split(' ').join('_');
  const id = body.get('id');
  const nameFile = body.get('nameFile');

  try {
    const key = `compras/proveedores/${frente}/${proveedor}/${nameFile}.pdf`;

    const res = await uploadFileS3(buffer, key);

    if (res.$metadata.httpStatusCode === 200) {
      await axios.put(
        process.env.NEXT_PUBLIC_URL_HOST +
          '/api/compras/proveedores/documents/statusDocumentsDB',
        {
          nameFile: nameFile,
          key: key,
          id: id,
        }
      );
    }
    return NextResponse.json({
      message: 'se actualizado correctamente los archivos',
    });
  } catch (error) {
    console.log(error);
    return new Response('No se ha subido el archivo a la nube', {
      status: 500,
    });
  }
}

export async function GET() {
  const data = await downloadFileS3();
  fs.writeFile('./message.pdf', data);

  return NextResponse.json({ message: 'se actualizado correctamente' });
}

export async function DELETE() {
  const res = await deleteFileS3();
  return NextResponse.json({ message: 'elemento elimindado' });
}
