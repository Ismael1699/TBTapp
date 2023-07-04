const DownloadButton = () => {
  const handleDownload = async () => {
    try {
      const response = await fetch(
        'http://localhost:3000/requisicionesStorage/HOJA_DE_COMPRA_400.xlsm'
      ); // Reemplaza 'URL_DEL_ARCHIVO' con la URL real del archivo que deseas descargar
      const data = await response.blob();
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'archivo_descargado.xlsm'); // Puedes cambiar el nombre del archivo descargado aquí
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
    }
  };

  return <button onClick={handleDownload}>Descargar</button>;
};

export default DownloadButton;
