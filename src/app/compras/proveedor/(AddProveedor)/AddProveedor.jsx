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
        <div className={style.title}>
          <p>Agregar nuevo proveedor</p>
        </div>
        <div className={style.form}>
          <div className={style.subtitle}>
            <p>Proveedor</p>
          </div>
          <div className={style.grupInputs}>
            <label htmlFor='name'>Proveedor</label>
            <input
              id='name'
              name='name'
              type='text'
              onChange={inputsOnChange}
              value={dataProveedores.name}
            />
            <label htmlFor='rfc'>RFC</label>
            <input
              id='rfc'
              name='rfc'
              type='text'
              onChange={inputsOnChange}
              value={dataProveedores.rfc}
            />
            <label htmlFor='direccion'>Dirección</label>
            <input
              id='direccion'
              name='direccion'
              type='text'
              onChange={inputsOnChange}
              value={dataProveedores.direccion}
            />
          </div>
        </div>
        <div className={style.form}>
          <div className={style.subtitle}>
            <p>Datos Bancarios</p>
          </div>
          <div className={style.grupInputs}>
            <label htmlFor='banco'>Banco</label>
            <input
              id='banco'
              name='banco'
              type='text'
              onChange={inputsOnChange}
              value={dataProveedores.banco}
            />
            <label htmlFor='clabe'>Clabe</label>
            <input
              id='clabe'
              name='clabe'
              type='text'
              onChange={inputsOnChange}
              value={dataProveedores.clabe}
            />
            <label htmlFor='cuenta'>Cuenta</label>
            <input
              id='cuenta'
              name='cuenta'
              type='text'
              onChange={inputsOnChange}
              value={dataProveedores.cuenta}
            />
          </div>
        </div>
        <div className={style.form}>
          <div className={style.subtitle}>
            <p>Contacto y frente</p>
          </div>
          <div className={style.grupInputs}>
            <label htmlFor='contacto'>Contacto</label>
            <input
              id='contacto'
              name='contacto'
              type='text'
              onChange={inputsOnChange}
              value={dataProveedores.contacto}
            />
            <label htmlFor='telefono'>Teléfono</label>
            <input
              id='telefono'
              name='telefono'
              type='text'
              onChange={inputsOnChange}
              value={dataProveedores.telefono}
            />
            <label htmlFor='correo'>Correo</label>
            <input
              id='correo'
              name='correo'
              type='text'
              onChange={inputsOnChange}
              value={dataProveedores.correo}
            />
            <label htmlFor='frente'>Frente</label>
            <input
              id='frente'
              name='frente'
              type='text'
              onChange={inputsOnChange}
              value={dataProveedores.frente}
            />
          </div>
        </div>
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
