'use client';
import Link from 'next/link';
import Card from '@/components/Compras/Card/Card';
import style from './layout.module.css';
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import Loading from './loading';

const getData = async (url) => await fetch(`${url}`).then((res) => res.json());
export default function Compras() {
  const [array, setArray] = useState([]);
  const { data, error, isLoading, mutate } = useSWR(
    '/api/conectionDB',
    getData
  );

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.title}>
          <p>Compras</p>
        </div>
        <div className={style.containerbuscador}>
          <Link
            href='compras/agregar'
            className='button'
          >
            <i className='bi bi-plus-lg'></i>
            <p>Compra</p>
          </Link>
          <Link
            href='compras/proveedor'
            className='button'
          >
            <i className='bi bi-plus-lg'></i>
            <p>Provedor</p>
          </Link>
        </div>
      </div>

      <div className={style.containercard}>
        {data
          ? data.data.map((obj, index) => (
              <Card
                obj={obj}
                key={index}
              />
            ))
          : null}
      </div>
    </div>
  );
}
