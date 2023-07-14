'use client';

async function getExcel(frente, numero) {
  const response = await fetch('/api/excelMod/download', {
    method: 'POST',
    body: JSON.stringify({ frente, numero }),
  });
  return JSON.parse(await response.text());
}

export default function Downloadbutton({ frente, numero }) {
  async function descargar() {
    const blob = await getExcel(frente, numero);

    const base64String = blob.excel;

    // Remueve la parte del encabezado de la cadena Base64 (por ejemplo, "data:image/png;base64,")
    const base64WithoutHeader = base64String.split(',')[1];

    // Convierte la cadena Base64 a un arreglo de bytes en formato Uint8Array
    const bytes = Uint8Array.from(atob(base64WithoutHeader), (char) =>
      char.charCodeAt(0)
    );

    const blobgn = new Blob([bytes], { type: 'Buffer' });

    //location.href = blob.excel;

    var url = URL.createObjectURL(blobgn);
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = `HOJA DE COMPRA ${numero}.xlsm`;
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  return (
    <i
      className='bi bi-file-earmark-arrow-down-fill'
      onClick={descargar}
    ></i>
  );
}
