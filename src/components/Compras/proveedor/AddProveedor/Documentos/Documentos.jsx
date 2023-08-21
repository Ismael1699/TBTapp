'use client';
import { useState } from 'react';
import styleLocal from './documentos.module.css';
import FileDinamic from './FileDinamic/FileDinamic';

export default function Documentos({
  fileBancario,
  setFileBancario,
  fileConstacia,
  setFileConstancia,
  dataProveedores,
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
      {/* <div className={styleLocal.containerFile}>
        {fileConstacia ? (
          <>
            <div
              className={styleLocal.deleteContainer}
              onClick={deleteFileConstacia}
            >
              <i className='bi bi-x'></i>
            </div>
            <i className='bi bi-filetype-pdf'></i>
            <p className={styleLocal.nameFile}>
              {fileConstacia.constancia.name}
            </p>
          </>
        ) : (
          <>
            <label
              htmlFor='constancia'
              className={styleLocal.labbelSubirArchivo}
            >
              <i
                htmlFor='constancia'
                className='bi bi-cloud-arrow-up-fill'
              ></i>
              Subir Constancia
            </label>
          </>
        )}
        <input
          id='constancia'
          type='file'
          className={styleLocal.inputOcult}
          onChange={inputsFilesOnChange}
        />
      </div> */}
      <FileDinamic
        name='constancia'
        file={fileConstacia}
        setFile={setFileConstancia}
        dataProveedores={dataProveedores}
        inputsFilesOnChange={inputsFilesOnChange}
      />

      <FileDinamic
        name='bancariofile'
        file={fileBancario}
        setFile={setFileBancario}
        dataProveedores={dataProveedores}
        inputsFilesOnChange={inputsFilesOnChange}
      />

      {/* <div className={styleLocal.containerFile}>
        {fileBancario ? (
          <>
            <div
              className={styleLocal.deleteContainer}
              onClick={deleteFileBancario}
            >
              <i className='bi bi-x'></i>
            </div>
            <i className='bi bi-filetype-pdf'></i>
            <p className={styleLocal.nameFile}>{fileBancario.bancario.name}</p>
          </>
        ) : (
          <>
            <label
              htmlFor='bancariofile'
              className={styleLocal.labbelSubirArchivo}
            >
              <i
                htmlFor='bancariofile'
                className='bi bi-cloud-arrow-up-fill'
              ></i>
              Subir Datos bancarios
            </label>
          </>
        )}
        <input
          id='bancariofile'
          type='file'
          className={styleLocal.inputOcult}
          onChange={inputsFilesOnChange}
        />
      </div> */}
    </div>
  );
}
