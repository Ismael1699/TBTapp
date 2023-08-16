'use client';
import { useState } from 'react';
import styleLocal from './documentos.module.css';

export default function Documentos() {
  const [fileConstacia, setFileConstancia] = useState();
  const [fileBancario, setFileBancario] = useState();

  function costanciahandle(e) {
    const regex = /(.pdf)$/m;
    const isPdf = regex.test(e.target.value);
    if (isPdf) {
      return setFileConstancia(e.target.files[0]);
    }
    return alert(
      'El archivo: ' + e.target.files[0].name + ' no es un archivo pdf'
    );
  }

  function bancarioHandle(e) {
    const regex = /(.pdf)$/m;
    const isPdf = regex.test(e.target.value);
    if (isPdf) {
      return setFileBancario(e.target.files[0]);
    }
    return alert(
      'El archivo: ' + e.target.files[0].name + ' no es un archivo pdf'
    );
  }

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
              <i class='bi bi-x'></i>
            </div>
            <i className='bi bi-filetype-pdf'></i>
            <p className={styleLocal.nameFile}>{fileConstacia.name}</p>
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
          onChange={costanciahandle}
        />
      </div>
      <div className={styleLocal.containerFile}>
        {fileBancario ? (
          <>
            <div
              className={styleLocal.deleteContainer}
              onClick={deleteFileBancario}
            >
              <i class='bi bi-x'></i>
            </div>
            <i className='bi bi-filetype-pdf'></i>
            <p className={styleLocal.nameFile}>{fileBancario.name}</p>
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
          onChange={bancarioHandle}
        />
      </div>
    </div>
  );
}
