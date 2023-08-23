'use client';
import style from './addproveedor.module.css';
import { useState } from 'react';
import Proveedor from '@/components/Compras/proveedor/AddProveedor/Proveedor/Proveedor';
import Bancarios from './Bancarios/Bancarios';
import Contacto from './Contacto/Contacto';
import Documentos from './Documentos/Documentos';
import axios from 'axios';
import { useRouter } from 'next/navigation';

async function sendProveedor(data, method) {
  const res = await fetch('/api/compras/proveedores', {
    method: method,
    body: JSON.stringify(data),
  });
  return JSON.parse(await res.text());
}

async function sendFiles(file, nombreProveedor, frente, id, nameFile) {
  let formData = new FormData();
  formData.append('file', file);
  formData.append('nameFile', nameFile);
  formData.append('proveedor', nombreProveedor);
  formData.append('frente', frente);
  formData.append('id', id);
  const res = await axios.post('/api/compras/proveedores/documents', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res;
}

async function deleteFiles(key) {
  const res = await axios.delete(
    `/api/compras/proveedores/documents?key=${key}`
  );
  return res.data;
}

const dataStruct = {
  name: '',
  rfc: '',
  direccion: '',
  banco: '',
  clabe: '',
  cuenta: '',
  telefono: '',
  correo: '',
  frente: '',
  contacto: '',
  factura: 0,
  constanciaKey: 'false',
  bancarioKey: 'false',
};

export default function AddProveedor({
  isEditing,
  cardSelected,
  setCardSelected,
  cancelarOnClick,
  session,
  updateCache,
}) {
  const [dataProveedores, setDataProveedores] = useState(
    Object.entries(cardSelected).length === 0 ? dataStruct : cardSelected
  );
  const [showSecction, setShowSecction] = useState('proveedor');
  const [fileConstacia, setFileConstancia] = useState('');
  const [fileBancario, setFileBancario] = useState('');
  const router = useRouter();
  const whatUser =
    session.user.rol === 'DIRECTOR' ||
    session.user.rol === 'SUPER-INTENDENTE' ||
    session.user.rol === 'CONTADOR' ||
    session.user.rol === 'SUPER-USER-ROOT';

  function inputsOnChange(e) {
    const item = e.target.id;
    const value = e.target.value;
    return setDataProveedores({ ...dataProveedores, [item]: value });
  }

  function dataSliderOnChange(data) {
    setDataProveedores({ ...dataProveedores, factura: data });
  }

  async function checkCompleteInformation() {
    const arrayValuesDataProvedores = Object.values(dataProveedores);
    let allInfomationIs = true;
    arrayValuesDataProvedores.map((value) =>
      value === '' || value === 0 ? (allInfomationIs = false) : null
    );

    const filesIsAll = fileBancario && fileConstacia;
    const withOutFiles = !fileBancario && !fileConstacia;
    const sendToFileBancario =
      dataProveedores.constanciaKey !== 'false' &&
      dataProveedores.bancarioKey === 'false' &&
      !fileConstacia &&
      fileBancario;
    const sendToFileConstancia =
      dataProveedores.constanciaKey === 'false' &&
      dataProveedores.bancarioKey !== 'false' &&
      fileConstacia &&
      !fileBancario;

    if (allInfomationIs && filesIsAll) {
      if (isEditing) {
        await sendDataToDB(dataProveedores, 'PUT');
        await uploadFileBancario();
        await uploadFileConstancia();
        return refresh();
      }
      await sendDataToDB(dataProveedores, 'POST');
      await uploadFileBancario();
      await uploadFileConstancia();
      return refresh();
    }

    if (allInfomationIs && sendToFileBancario) {
      if (isEditing) {
        await sendDataToDB(dataProveedores, 'PUT');
        await uploadFileBancario();
        return refresh();
      }
      await sendDataToDB(dataProveedores, 'POST');
      await uploadFileBancario();
      return refresh();
    }

    if (allInfomationIs && sendToFileConstancia) {
      if (isEditing) {
        await sendDataToDB(dataProveedores, 'PUT');
        await uploadFileConstancia();
        return refresh();
      }
      await sendDataToDB(dataProveedores, 'POST');
      await uploadFileConstancia();
      return refresh();
    }

    if (allInfomationIs && withOutFiles) {
      if (
        dataProveedores.bancarioKey === 'false' &&
        dataProveedores.constanciaKey === 'false'
      ) {
        deleteFiles(
          `compras/proveedores/${dataProveedores.frente.toLowerCase()}/${dataProveedores.name
            .split(' ')
            .join('_')}/bancario.pdf`
        );
        deleteFiles(
          `compras/proveedores/${dataProveedores.frente.toLowerCase()}/${dataProveedores.name
            .split(' ')
            .join('_')}/constancia.pdf`
        );
      }

      return isEditing
        ? sendDataToDB(dataProveedores, 'PUT')
        : sendDataToDB(dataProveedores, 'POST');
    }
    return alert(
      'Por favor termina de completar los datos o de seleccionar los archivos para ser enviados'
    );
  }

  async function sendDataToDB(data, method) {
    updateCache(data);

    const response = await sendProveedor(data, method);

    alert(response.message);
    setCardSelected({});
    cancelarOnClick();
  }

  async function uploadFileConstancia() {
    try {
      const response = await sendFiles(
        fileConstacia.constancia,
        dataProveedores.name,
        dataProveedores.frente,
        dataProveedores.id,
        'constancia'
      );
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data);
    }
  }

  async function uploadFileBancario() {
    try {
      const response = await sendFiles(
        fileBancario.bancario,
        dataProveedores.name,
        dataProveedores.frente,
        dataProveedores.id,
        'bancario'
      );
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data);
    }
  }

  function sectionHandle(e) {
    setShowSecction(e.target.id);
  }

  function refresh() {
    return router.push('/application/compras/proveedor');
  }

  return (
    <div className={style.global}>
      <div className={style.container}>
        <div className={style.title}>
          <p>Agregar nuevo proveedor</p>
          <button
            className={style.cancelar}
            onClick={cancelarOnClick}
          >
            <i className='bi bi-x-circle-fill'></i>
          </button>
        </div>
        <div className={style.section}>
          <div
            id='proveedor'
            onClick={sectionHandle}
            className={showSecction === 'proveedor' ? style.selectSection : ''}
          >
            Proveedor
          </div>
          <div
            id='bancario'
            onClick={sectionHandle}
            className={showSecction === 'bancario' ? style.selectSection : ''}
          >
            Bancario
          </div>
          <div
            id='contacto'
            onClick={sectionHandle}
            className={showSecction === 'contacto' ? style.selectSection : ''}
          >
            Contacto
          </div>
          <div
            id='documentos'
            onClick={sectionHandle}
            className={showSecction === 'documentos' ? style.selectSection : ''}
          >
            Documentos
          </div>
        </div>
        {showSecction === 'proveedor' ? (
          <Proveedor
            dataProveedores={dataProveedores}
            inputsOnChange={inputsOnChange}
            session={session}
            whatUser={whatUser}
          />
        ) : null}

        {showSecction === 'bancario' ? (
          <Bancarios
            dataProveedores={dataProveedores}
            inputsOnChange={inputsOnChange}
            dataSliderOnChange={dataSliderOnChange}
          />
        ) : null}

        {showSecction === 'contacto' ? (
          <Contacto
            dataProveedores={dataProveedores}
            inputsOnChange={inputsOnChange}
          />
        ) : null}

        {showSecction === 'documentos' ? (
          <Documentos
            fileBancario={fileBancario}
            setFileBancario={setFileBancario}
            fileConstacia={fileConstacia}
            setFileConstancia={setFileConstancia}
            dataProveedores={dataProveedores}
            setDataProveedores={setDataProveedores}
          />
        ) : null}

        <div className={style.buttons}>
          {isEditing ? (
            <button
              className={style.button}
              onClick={checkCompleteInformation}
            >
              Editar
            </button>
          ) : (
            <button
              className={style.button}
              onClick={checkCompleteInformation}
            >
              Agregar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
