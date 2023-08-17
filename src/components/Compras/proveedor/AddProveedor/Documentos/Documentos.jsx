'use client';
import { useState } from 'react';
import styleLocal from './documentos.module.css';

export default function Documentos({
  inputsFilesOnChange,
  fileBancario,
  setFileBancario,
  fileConstacia,
  setFileConstancia,
}) {
  function deleteFileConstacia() {
    setFileConstancia('');
  }

  function deleteFileBancario() {
    setFileBancario('');
  }

  return (
    <div className={styleLocal.documentos}>
      <div className={styleLocal.containerFile}>
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
      </div>
      <div className={styleLocal.containerFile}>
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
      </div>
    </div>
  );
}
