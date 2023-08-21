import styleLocal from '../documentos.module.css';

export default function FileDinamic({
  name,
  file,
  setFile,
  inputsFilesOnChange,
}) {
  function clear() {
    setFile('');
    document.getElementById(name).value = '';
  }

  return (
    <div className={styleLocal.containerFile}>
      {file ? (
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
      ) : (
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
        </>
      )}
      <input
        id={name}
        type='file'
        className={styleLocal.inputOcult}
        onChange={inputsFilesOnChange}
      />
    </div>
  );
}
