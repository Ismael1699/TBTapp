import { NextResponse } from 'next/server';

import { readFile, utils, set_fs, writeFile } from 'xlsx';
import { join } from 'path';
import { cwd } from 'process';

export async function GET() {
  set_fs(await import('fs')); // dynamically import 'fs' when needed
  const filename = join(cwd(), 'app', 'api', 'download', 'hola.xlsx'); // /data/sheetjs.xlsx
  const wb = readFile(filename);

  return NextResponse.json({ hola: wb });
}
