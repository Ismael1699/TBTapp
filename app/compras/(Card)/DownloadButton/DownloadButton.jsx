'use client';

async function getExcel(frente, numero) {
  const response = await fetch('http://localhost:3000/api/excelMod/download', {
    method: 'POST',
    body: JSON.stringify({ frente, numero }),
  });
  return JSON.parse(await response.text());
}

export default function Downloadbutton({ obj }) {
  async function descargar() {
    const blob = await getExcel(obj.frente, obj.numero);
    location.href = blob.excel;
  }

  return <button onClick={descargar}>des</button>;
}
