'use client';
import style from './addproveedor.module.css';
import { useState } from 'react';
import upData from '../../../../services/upData';

export default function AddProveedor({ agregarOnClick }) {
  const dataStruct = {
    proveedor: '',
    rfc: '',
    direccion: '',
    banco: '',
    clabe: '',
    cuenta: '',
    telefono: '',
    correo: '',
    frente: '',
  };

  const [dataProveedores, setDataProveedores] = useState({});

  function inputsOnChange(e) {
    const item = e.target.id;
    const value = e.target.value;
    setDataProveedores({ ...dataProveedores, [item]: value });
  }

  function checkCompleteInformation() {
    const arrayValuesDataProvedores = Object.values(dataProveedores);
    let allInfomationIs = false;
    arrayValuesDataProvedores.map((value) =>
      value === '' ? (allInfomationIs = false) : (allInfomationIs = true)
    );

    if (allInfomationIs) {
      return sendDataToDB();
    }
    alert('Por favor termina de completar los datos para ser enviados');
  }

  function sendDataToDB() {
    upData('proveedores', dataProveedores.proveedor, dataProveedores);
    alert('Datos han sido enviados y guardados');
  }
  console.log(dataProveedores);

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
            <label htmlFor='proveedor'>Proveedor</label>
            <input
              id='proveedor'
              name='proveedor'
              type='text'
              onChange={inputsOnChange}
            />
            <label htmlFor='rfc'>RFC</label>
            <input
              id='rfc'
              name='rfc'
              type='text'
              onChange={inputsOnChange}
            />
            <label htmlFor='direccion'>Dirección</label>
            <input
              id='direccion'
              name='direccion'
              type='text'
              onChange={inputsOnChange}
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
            />
            <label htmlFor='clabe'>Clabe</label>
            <input
              id='clabe'
              name='clabe'
              type='text'
              onChange={inputsOnChange}
            />
            <label htmlFor='cuenta'>Cuenta</label>
            <input
              id='cuenta'
              name='cuenta'
              type='text'
              onChange={inputsOnChange}
            />
          </div>
        </div>
        <div className={style.form}>
          <div className={style.subtitle}>
            <p>Contacto y frente</p>
          </div>
          <div className={style.grupInputs}>
            <label htmlFor='telefono'>Teléfono</label>
            <input
              id='telefono'
              name='telefono'
              type='text'
              onChange={inputsOnChange}
            />
            <label htmlFor='correo'>Correo</label>
            <input
              id='correo'
              name='correo'
              type='text'
              onChange={inputsOnChange}
            />
            <label htmlFor='frente'>Frente</label>
            <input
              id='frente'
              name='frente'
              type='text'
              onChange={inputsOnChange}
            />
          </div>
        </div>
        <div className={style.buttons}>
          <button
            className={style.cancelar}
            onClick={agregarOnClick}
          >
            Cancelar
          </button>
          <button
            className={style.button}
            onClick={checkCompleteInformation}
          >
            Agregar
          </button>
        </div>
      </div>
      <div className={style.blur}></div>
    </>
  );
}
