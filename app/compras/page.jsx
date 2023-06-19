'use client';
import Link from 'next/link';
import Card from './(Card)/Card';
import style from './layout.module.css';
import { useState } from 'react';
import AddProveedor from './(AddProveedor)/AddProveedor';

export default function Compras() {
  const [proveedorIsClicked, setProveedorIsClicked] = useState(false);

  function handleButtonProveedor() {
    setProveedorIsClicked(!proveedorIsClicked);
  }

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h1>Requisiciones</h1>
        <div className={style.containerbuscador}>
          <i className='bi bi-search'></i>
          <input
            className={style.buscador}
            type='text'
            placeholder='buscar compra'
          />
          <Link
            href='/compras/agregar'
            className={style.button}
          >
            <i className='bi bi-plus-lg'></i>
            <p>Compra</p>
          </Link>
          <button
            href=''
            className={style.button}
            onClick={handleButtonProveedor}
          >
            <i className='bi bi-plus-lg'></i>
            <p>Provedor</p>
          </button>
        </div>
      </div>
      {proveedorIsClicked ? (
        <AddProveedor handleButtonProveedor={handleButtonProveedor} />
      ) : (
        <></>
      )}
      <div className={style.containercard}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}
