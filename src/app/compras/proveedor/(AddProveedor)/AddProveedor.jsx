'use client';
import style from './addproveedor.module.css';
import { useState } from 'react';

async function sendProveedor(data, method) {
  const res = await fetch('/api/proveedores', {
    method: method,
    body: JSON.stringify(data),
  });
  return JSON.parse(await res.text());
}

export default function AddProveedor({
  isEditing,
  cardSelected,
  setCardSelected,

  cancelarOnClick,
}) {
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
  };

  const [dataProveedores, setDataProveedores] = useState(cardSelected);

  function inputsOnChange(e) {
    const item = e.target.id;
    const value = e.target.value;
    return setDataProveedores({ ...dataProveedores, [item]: value });
  }

  function checkCompleteInformation() {
    const arrayValuesDataProvedores = Object.values(dataProveedores);
    let allInfomationIs = false;
    arrayValuesDataProvedores.map((value) =>
      value === '' ? (allInfomationIs = false) : (allInfomationIs = true)
    );

    if (allInfomationIs) {
      if (isEditing) {
        return sendDataToDB(dataProveedores, 'PUT');
      }
      return sendDataToDB(dataProveedores, 'POST');
    }
    return alert('Por favor termina de completar los datos para ser enviados');
  }

  async function sendDataToDB(data, method) {
    const response = await sendProveedor(data, method);
    alert(response.message);
    setCardSelected({});
    return cancelarOnClick;
  }

  return (
    <>
      <div className={style.container}>
        <div className={style.buttons}>
          <button
            className={style.cancelar}
            onClick={cancelarOnClick}
          >
            <i className='bi bi-x-circle-fill'></i>
            Cancelar
          </button>
          {isEditing ? (
            <button
              className={style.button}
              onClick={checkCompleteInformation}
            >
              <i className='bi bi-plus-circle-fill'></i>
              Editar
            </button>
          ) : (
            <button
              className={style.button}
              onClick={checkCompleteInformation}
            >
              <i className='bi bi-plus-circle-fill'></i>
              Agregar
            </button>
          )}
        </div>
      </div>
      <div className={style.blur}></div>
    </>
  );
}
