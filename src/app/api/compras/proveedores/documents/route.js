import { NextResponse } from 'next/server';
import { uploadFileS3, downloadFileS3, deleteFileS3 } from '@/services/upload';
const fs = require('fs/promises');

export async function POST(request) {
  let body = await request.formData();
  const bancario = body.get('bancario');
  const bytes = await bancario.arrayBuffer();
  const buffer = Buffer.from(bytes);
  uploadFileS3(buffer);
  console.log(buffer);
  return NextResponse.json({ message: 'se actualizado correctamente' });
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
