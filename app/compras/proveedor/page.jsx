'use client';
import style from './proveedor.module.css';
import AddProveedor from './(AddProveedor)/AddProveedor';
import { useState, use } from 'react';
import CardProveedor from './(CardProveedor)/CardProveedor';
import useSWR from 'swr';

// async function getProveedores(url) {
//   const response = await fetch(`http://localhost:3000${url}`);

//   return JSON.parse(await response.text());
// }

const getProveedores = (url) =>
  fetch(`http://localhost:3000${url}`).then((res) => res.json());
export default function Proveedores() {
  const [agregarWasClicked, setAgregarWasClicked] = useState(false);

  const { data, error, isLoading } = useSWR('/api/proveedores', getProveedores);

  const proveedoresArray = data;
  console.log(proveedoresArray);

  function agregarOnClick() {
    return setAgregarWasClicked(!agregarWasClicked);
  }

  if (error) return 'An error has occurred.';
  if (isLoading) return 'Cargando..';
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
        {proveedoresArray.map((obj, index) => (
          <CardProveedor
            obj={obj}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
