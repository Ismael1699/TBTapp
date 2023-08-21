import { NextResponse } from 'next/server';
import { uploadFileS3, downloadFileS3, deleteFileS3 } from '@/services/upload';
import axios from 'axios';
import { stringify } from 'querystring';
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
  const id = body.get('id');

  try {
    const constanciaKey = `compras/proveedores/${frente}/${name}/constancia.pdf`;
    const bancarioKey = `compras/proveedores/${frente}/${name}/bancario.pdf`;

    const resConstancia = await uploadFileS3(bufferConstancia, constanciaKey);

    const resBancario = await uploadFileS3(bufferBancario, bancarioKey);
    if (
      resConstancia.$metadata.httpStatusCode === 200 &&
      resBancario.$metadata.httpStatusCode === 200
    ) {
      await axios.put(
        process.env.NEXT_PUBLIC_URL_HOST +
          '/api/compras/proveedores/documents/statusDocumentsDB',
        {
          frente: frente,
          name: name,
          constanciaKey: constanciaKey,
          bancarioKey: bancarioKey,
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
