'use client';
import styleLocal from './documentos.module.css';
import FileDinamic from './FileDinamic/FileDinamic';

export default function Documentos({
  fileBancario,
  setFileBancario,
  fileConstacia,
  setFileConstancia,
  dataProveedores,
  setDataProveedores,
}) {
  function inputsFilesOnChange(e) {
    const regex = /(.pdf)$/m;
    const isPdf = regex.test(e.target.value);

    if (isPdf) {
      if (e.target.id === 'bancariofile') {
        return setFileBancario({ bancario: e.target.files[0] });
      }

      return setFileConstancia({ constancia: e.target.files[0] });
    }
    return alert(
      'El archivo: ' + e.target.files[0].name + ' no es un archivo pdf'
    );
  }
  return (
    <div className={styleLocal.documentos}>
      <FileDinamic
        name='constancia'
        file={fileConstacia}
        setFile={setFileConstancia}
        dataProveedores={dataProveedores}
        inputsFilesOnChange={inputsFilesOnChange}
        setDataProveedores={setDataProveedores}
      />

      <FileDinamic
        name='bancariofile'
        file={fileBancario}
        setFile={setFileBancario}
        dataProveedores={dataProveedores}
        inputsFilesOnChange={inputsFilesOnChange}
        setDataProveedores={setDataProveedores}
      />
    </div>
  );
}
