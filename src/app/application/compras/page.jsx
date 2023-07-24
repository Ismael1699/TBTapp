'use client';
import Link from 'next/link';
import Card from './(Card)/Card';
import style from './layout.module.css';
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';

//const getData = async (url) => await fetch(`${url}`).then((res) => res.json());
async function getData() {
  const link = '/api/conectionDB';
  const response = await fetch(link);
  return JSON.parse(await response.text());
}

export default function Compras() {
  const [array, setArray] = useState([]);
  const session = useSession();
  console.log(session);

  useEffect(() => {
    async function localFetch() {
      setArray(await getData());
    }
    localFetch();
  }, []);

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
        {array.length === 0
          ? null
          : array.data.map((obj, index) => (
              <Card
                obj={obj}
                key={index}
              />
            ))}
      </div>
    </div>
  );
}
