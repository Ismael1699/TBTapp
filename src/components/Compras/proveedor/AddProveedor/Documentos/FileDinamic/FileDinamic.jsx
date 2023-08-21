import styleLocal from '../documentos.module.css';

export default function FileDinamic({
  name,
  file,
  setFile,
  inputsFilesOnChange,
  dataProveedores,
}) {
  function clear() {
    setFile('');
    document.getElementById(name).value = '';
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
            onClick={getFileToServer}
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
