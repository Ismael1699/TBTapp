'use client';
import style from '../agregar.module.css';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

const getProveedores = (url) =>
  fetch(`http://localhost:3000${url}`).then((res) => res.json());

export default function HeadData({
  setHeadData,
  centralizeData,
  headData,
  dataWasSent,
  setDataWasSent,
}) {
  const proveedores = useSWR('/api/proveedores', getProveedores);
  const proveedoresArray = proveedores.data;

  //controlan el sistema de carga de los datos hecho al servidor  el useSWR
  if (proveedores.error) return 'An error has occurred.';
  if (proveedores.isLoading) return 'Cargando..';

  //funcion para obtener los datos del header
  function headHandleChange(e) {
    setDataWasSent(false);
    const item = e.target.id;
    setHeadData({ ...headData, [item]: e.target.value });
  }

  return (
    <div className={style.head}>
      <div className={style.proyecto}>
        <h3>Proyecto</h3>
        <select
          id='proyecto'
          name='proyecto'
          onChange={headHandleChange}
          value={headData.proyecto}
        >
          <option
            disabled
            value=''
          >
            Elegir alguna
          </option>
          <option value={2103}>2103 SCT Pachuca</option>
          <option value={2104}>2104 SCT Atotonilco</option>
        </select>
      </div>

      <div className={style.frente}>
        <h3>Frente</h3>
        <select
          id='frente'
          name='frente'
          onChange={headHandleChange}
          value={headData.frente}
        >
          <option
            disabled
            value=''
          >
            Elegir alguna
          </option>
          <option value='TERRACERIAS'>Terracerias</option>
          <option value='MAQUINARIA'>Maquinaria</option>
          <option value='ADMINISTRACION'>Administración</option>
        </select>
      </div>

      <div className={style.suministro}>
        <h3>Grupo de suministro</h3>
        <select
          id='suministro'
          name='grupo de suministro'
          onChange={headHandleChange}
          value={headData.suministro}
        >
          <option
            disabled
            value=''
          >
            Elegir alguna
          </option>
          <option value='MATERIALES DE CONSTRUCCION'>
            Materiales de construcción
          </option>
          <option value='REFACCIONES'>Refacciones</option>
          <option value='COMBUSTIBLES Y ACEITES'>Combustible y aceites</option>
          <option value='RESGUARDO CONSUMOS'>Resguardo cosumo</option>
          <option value='EQUIPO AUXILIAR'>Equipo auxiliar</option>
          <option value='PAPELERIA'>papeleria</option>
          <option value='OTROS'>Otros</option>
        </select>
      </div>

      <div className={style.fecha}>
        <h3>Fecha</h3>
        <input
          id='fecha'
          type='date'
          onChange={headHandleChange}
          value={headData.fecha}
        ></input>
      </div>

      <div className={style.lugar}>
        <h3>Lugar de compra</h3>
        <select
          id='lugar'
          name='lugar de compra'
          onChange={headHandleChange}
          value={headData.lugar}
        >
          <option
            disabled
            value=''
          >
            Elegir alguna
          </option>
          <option value='local'>Compra local</option>
          <option value='regional'>Compra regional</option>
          <option value='nacional'>Compra nacional</option>
        </select>
      </div>

      <div className={style.proveedor}>
        <h3>Proveedor</h3>
        <select
          id='proveedor'
          name='proveerdor'
          onChange={headHandleChange}
          value={headData.proveedor}
        >
          <option
            disabled
            value=''
          >
            Elegir alguna
          </option>
          {proveedoresArray.map((obj, index) => (
            <option
              key={index}
              value={obj.name}
            >
              {obj.name}
            </option>
          ))}
        </select>
      </div>
      <div className={style.numero}>
        <h3>Numero de requisición</h3>
        <input
          id='numero'
          type='number'
          placeholder='Inserte un numero'
          onChange={headHandleChange}
          value={headData.numero}
        />
      </div>
    </div>
  );
}
