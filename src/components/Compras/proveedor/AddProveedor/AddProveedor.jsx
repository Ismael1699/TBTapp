'use client';
import style from './addproveedor.module.css';
import { useState } from 'react';
import Slider from './Slider/Slider';
import Proveedor from '@/components/Compras/proveedor/AddProveedor/Proveedor/Proveedor';
import Bancarios from './Bancarios/Bancarios';
import Contacto from './Contacto/Contacto';
import Documentos from './Documentos/Documentos';
import axios from 'axios';

async function sendProveedor(data, method) {
  const res = await fetch('/api/compras/proveedores', {
    method: method,
    body: JSON.stringify(data),
  });
  return JSON.parse(await res.text());
}

async function sendFiles(file1, file2, nombreProveedor, frente) {
  let formData = new FormData();
  formData.append('bancario', file1);
  formData.append('constancia', file2);
  formData.append('name', nombreProveedor);
  formData.append('frente', frente);
  const res = await axios.post('/api/compras/proveedores/documents', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res;
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
};

export default function AddProveedor({
  isEditing,
  cardSelected,
  setCardSelected,
  cancelarOnClick,
  session,
}) {
  const [dataProveedores, setDataProveedores] = useState(
    Object.entries(cardSelected).length === 0 ? dataStruct : cardSelected
  );

  const [showSecction, setShowSecction] = useState('proveedor');
  const [fileConstacia, setFileConstancia] = useState('');
  const [fileBancario, setFileBancario] = useState('');

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
  function dataSliderOnChange(data) {
    setDataProveedores({ ...dataProveedores, factura: data });
  }

  function checkCompleteInformation() {
    const arrayValuesDataProvedores = Object.values(dataProveedores);
    let allInfomationIs = false;
    arrayValuesDataProvedores.map((value) =>
      value === '' || value === 0
        ? (allInfomationIs = false)
        : (allInfomationIs = true)
    );
    let filesIsAll = false;
    if (fileBancario && fileConstacia) filesIsAll = true;
    if (allInfomationIs && filesIsAll) {
      if (isEditing) {
        sendDataToDB(dataProveedores, 'PUT');

        return sendFilesToServer();
      }
      return sendDataToDB(dataProveedores, 'POST');
    }
    return alert('Por favor termina de completar los datos para ser enviados');
  }

  async function sendDataToDB(data, method) {
    const response = await sendProveedor(data, method);

    alert(response.message);
    setCardSelected({});
    cancelarOnClick();
  }

  async function sendFilesToServer() {
    try {
      const res = await sendFiles(
        fileBancario.bancario,
        fileConstacia.constancia,
        dataProveedores.name,
        dataProveedores.frente
      );
      alert(res.data.message);
    } catch (error) {
      alert(error.response.data);
    }
  }

  function sectionHandle(e) {
    setShowSecction(e.target.id);
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
            inputsFilesOnChange={inputsFilesOnChange}
            fileBancario={fileBancario}
            setFileBancario={setFileBancario}
            fileConstacia={fileConstacia}
            setFileConstancia={setFileConstancia}
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
