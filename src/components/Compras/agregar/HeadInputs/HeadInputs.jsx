'use client';
import style from './headinputs.module.css';
import useSWR from 'swr';
import axios from 'axios';
import { useSession } from 'next-auth/react';

async function getProveedores(link) {
  const res = await axios(link);
  return res;
}

export default function HeadInputs({
  setHeadData,
  headData,
  isEditing,
  setDataProveedor,
  dataProveedor,
  proveedores,
  user,
}) {
  const whatUser =
    user.rol === 'DIRECTOR' ||
    user.rol === 'SUPER-INTENDENTE' ||
    user.rol === 'CONTADOR' ||
    user.rol === 'SUPER-USER-ROOT';
  //funcion para obtener los datos del header
  function headHandleChange(e) {
    const item = e.target.id;
    setHeadData({ ...headData, [item]: e.target.value });
    if (item === 'proveedor') {
      proveedores.map((obj) => {
        obj.name === e.target.value ? setDataProveedor(obj) : undefined;
      });
    }
  }

  return (
    <div className={style.head}>
      <div className={style.proyecto}>
        <p>Proyecto</p>
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
          <option value={'2103 SCT Pachuca'}>2103 SCT Pachuca</option>
          <option value={'2104 SCT Atotonilco'}>2104 SCT Atotonilco</option>
          <option value={'2301 SCT Coatzacoalcos'}>
            2301 SCT Coatzacoalcos
          </option>
        </select>
      </div>

      <div className={style.frente}>
        <p>Frente</p>
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
          {user.rol === 'MAQUINARIA' ? (
            <option value='MAQUINARIA'>Maquinaria</option>
          ) : null}
          {user.rol === 'PLANEACION' ? (
            <option value='PLANEACION'>Planeacion</option>
          ) : null}
          {whatUser ? <option value='MAQUINARIA'>Maquinaria</option> : null}
          {whatUser ? <option value='PLANEACION'>Planeacion</option> : null}
        </select>
      </div>

      <div className={style.suministro}>
        <p>Grupo de suministro</p>
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
        <p>Fecha</p>
        <input
          id='fecha'
          type='date'
          onChange={headHandleChange}
          value={headData.fecha}
        ></input>
      </div>

      <div className={style.lugar}>
        <p>Lugar de compra</p>
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
      {console.log(headData.proveedor)}
      <div className={style.proveedor}>
        <p>Proveedor</p>
        <select
          id='proveedor'
          name='proveerdor'
          onChange={headHandleChange}
          value={!headData.proveedor ? '' : headData.proveedor}
        >
          <option
            disabled
            value=''
          >
            Elegir alguna
          </option>
          {proveedores?.map((obj, index) => (
            <option
              key={index}
              value={obj.name}
              id={obj.id}
            >
              {obj.name}
            </option>
          ))}
        </select>
      </div>
      <div className={style.economico}>
        <p>Economico</p>
        <input
          id='economico'
          type='text'
          value={headData.economico}
          onChange={headHandleChange}
        />
      </div>
      <div className={style.isr}>
        <p>% I.S.R.</p>
        <input
          id='ISR'
          type='number'
          onChange={headHandleChange}
          value={headData.ISR}
        />
      </div>
      <div className={style.numero}>
        <p>Numero de requisición</p>
        {isEditing ? (
          <div>{headData.numero}</div>
        ) : (
          <input
            id='numero'
            type='number'
            placeholder='Inserte un numero'
            onChange={headHandleChange}
            value={headData.numero}
          />
        )}
      </div>
    </div>
  );
}
