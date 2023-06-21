'use client';

import style from './proveedor.module.css';
import AddProveedor from './(AddProveedor)/AddProveedor';
import { useState } from 'react';

export default function Proveedores() {
  const [agregarWasClicked, setAgregarWasClicked] = useState(false);

  function agregarOnClick() {
    return setAgregarWasClicked(!agregarWasClicked);
  }

  return (
    <div className={style.container}>
      <div className={style.head}>
        <div className={style.title}>
          <p>Proveedores</p>
        </div>
        <div className={style.buttons}>
          <button
            className='button'
            onClick={agregarOnClick}
          >
            Agregar
          </button>
          <button className={style.filterButton}>Maquinaria</button>
          <button className={style.filterButton}>Terracerias</button>
          <button className={style.filterButton}>Administración</button>
        </div>
      </div>
      <div className={style.body}>
        {agregarWasClicked ? (
          <AddProveedor agregarOnClick={agregarOnClick} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
