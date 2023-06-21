'use client';
import Link from 'next/link';
import Card from './(Card)/Card';
import style from './layout.module.css';
import { useEffect, useState, use } from 'react';

async function getCol() {
  const response = await fetch('http://localhost:3000/api/getColFirebase', {
    method: 'POST',
    body: JSON.stringify({ col: 'requisiciones' }),
  });
  return response.json();
}

export default function Compras() {
  const data = use(getCol()).data;
  console.log(data);
  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.title}>
          <p>Requisiciones</p>
        </div>
        <div className={style.containerbuscador}>
          <i className='bi bi-search'></i>
          <input
            className={style.buscador}
            type='text'
            placeholder='buscar compra'
          />
          <Link
            href='/compras/agregar'
            className='button'
          >
            <i className='bi bi-plus-lg'></i>
            <p>Compra</p>
          </Link>
          <Link
            href='/compras/proveedor'
            className='button'
          >
            <i className='bi bi-plus-lg'></i>
            <p>Provedor</p>
          </Link>
        </div>
      </div>
      <div className={style.containercard}>
        {data.map((obj, index) => (
          <Card
            obj={obj}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
