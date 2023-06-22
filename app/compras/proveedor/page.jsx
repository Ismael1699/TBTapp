'use client';

import style from './proveedor.module.css';
import AddProveedor from './(AddProveedor)/AddProveedor';
import { useState, use } from 'react';
import CardProveedor from './(CardProveedor)/CardProveedor';

async function getCol() {
  const response = await fetch('http://localhost:3000/api/getColFirebase', {
    method: 'POST',
    body: JSON.stringify({ col: 'proveedores' }),
  });
  return response.json();
}

export default function Proveedores() {
  const [agregarWasClicked, setAgregarWasClicked] = useState(false);
  const data = use(getCol()).data;

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
        {data.map((obj, index) => (
          <CardProveedor
            obj={obj}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
