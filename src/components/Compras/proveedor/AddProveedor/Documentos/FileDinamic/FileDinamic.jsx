import axios from 'axios';
import styleLocal from '../documentos.module.css';
import createDownload from '@/utils/createDownload';

async function getFileToServer(key) {
  const res = await axios(`/api/compras/proveedores/documents?key=${key}`);
  return res.data;
}

export default function FileDinamic({
  name,
  file,
  setFile,
  inputsFilesOnChange,
  dataProveedores,
  setDataProveedores,
}) {
  function clear() {
    setFile('');
    document.getElementById(name).value = '';
  }

  function deleteFromCache() {}

  async function downloadFile() {
    const file = await getFileToServer(
      name === 'constancia'
        ? dataProveedores.constanciaKey
        : dataProveedores.bancarioKey
    );
    createDownload(file.arrBits, `${name}.pdf`);
  }

  function dinamicRender() {
    const key =
      name === 'constancia'
        ? dataProveedores.constanciaKey
        : dataProveedores.bancarioKey;

    if (key !== 'false') {
      const arrayKey = key.split('/');
      const getName = arrayKey[arrayKey.length - 1];
      return (
        <>
          <div className={styleLocal.deleteContainer}>
            <i className='bi bi-x'></i>
          </div>
          <i
            className='bi bi-filetype-pdf'
            onClick={downloadFile}
          ></i>
          <p className={styleLocal.nameFile}>{getName}</p>
        </>
      );
    }
    if (file) {
      return (
        <>
          <div
            className={styleLocal.deleteContainer}
            onClick={clear}
          >
            <i className='bi bi-x'></i>
          </div>
          <i className='bi bi-filetype-pdf'></i>
          <p className={styleLocal.nameFile}>
            {name === 'constancia' ? file.constancia.name : file.bancario.name}
          </p>
        </>
      );
    } else {
      return (
        <>
          <label
            htmlFor={name}
            className={styleLocal.labbelSubirArchivo}
          >
            <i
              htmlFor={name}
              className='bi bi-cloud-arrow-up-fill'
            ></i>
            Subir {name === 'constancia' ? 'constancia' : 'datos bancarios'}
          </label>
          <input
            id={name}
            type='file'
            className={styleLocal.inputOcult}
            onChange={inputsFilesOnChange}
          />
        </>
      );
    }
  }

  return <div className={styleLocal.containerFile}>{dinamicRender()}</div>;
}
