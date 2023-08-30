'use client';
import axios from 'axios';

async function getExcel(obj) {
  const response = await axios.post('/api/excelGenerate', obj);
  return response;
}

export default function Downloadbutton({ obj }) {
  async function descargar() {
    try {
      const blob = await getExcel(obj);

      const base64String = blob.data.excel;

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
      a.download = `HOJA DE COMPRA ${obj.numero}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return alert(error.response.data);
      }
      alert('No se ha logrado generar el archivo');
    }
  }

  return (
    <i
      className='bi bi-file-earmark-arrow-down-fill'
      onClick={descargar}
    ></i>
  );
}
