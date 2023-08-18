import { NextResponse } from 'next/server';
import { uploadFileS3, downloadFileS3, deleteFileS3 } from '@/services/upload';
const fs = require('fs/promises');

export async function POST(request) {
  let body = await request.formData();
  const bancarioFile = body.get('bancario');
  const bytesBancario = await bancarioFile.arrayBuffer();
  const bufferBancario = Buffer.from(bytesBancario);

  const constanciaFile = body.get('constancia');
  const bytesConstancia = await constanciaFile.arrayBuffer();
  const bufferConstancia = Buffer.from(bytesConstancia);

  const frente = body.get('frente').toLowerCase();
  const name = body.get('name').split(' ').join('_');

  try {
    uploadFileS3(
      bufferConstancia,
      `compras/proveedores/${frente}/${name}/constancia.pdf`
    );
    uploadFileS3(
      bufferBancario,
      `compras/proveedores/${frente}/${name}/bancario.pdf`
    );

    return NextResponse.json({
      message: 'se actualizado correctamente los archivos',
    });
  } catch (error) {
    return new Response(
      {
        message:
          'No se ha podido cargar al servidor el archivo, vuelve a intentarlo',
      },
      { status: 200 }
    );
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
