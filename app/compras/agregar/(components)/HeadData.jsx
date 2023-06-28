'use client';
import style from '../agregar.module.css';
import { useEffect, useState, use } from 'react';

export default function HeadData({
  setHeadData,
  centralizeData,
  headData,
  dataWasSent,
  setDataWasSent,
  proveedoresArray,
}) {
  const [valueSelectedProyecto, setValueSelectedProyecto] = useState('');
  const [valueSelectedFrente, setValueSelectedFrente] = useState('');
  const [valueSelectedSuministro, setValueSelectedSuministro] = useState('');
  const [valueSelectedFecha, setValueSelectedFecha] = useState('');
  const [valueSelectedLugar, setValueSeletedLugar] = useState('');
  const [valueSelectedProveedor, setValueSelectedProveedor] = useState('');
  const [ValueSelectedNumero, setValueSelectedNumero] = useState('');

  //funcion para obtener los datos del header
  function headHandleChange(e) {
    setDataWasSent(false);
    const item = e.target.id;
    setHeadData({ ...headData, [item]: e.target.value });
    if (item === 'proyecto') {
      setValueSelectedProyecto(e.target.value);
    }
    if (item === 'frente') {
      setValueSelectedFrente(e.target.value);
    }
    if (item === 'suministro') {
      setValueSelectedSuministro(e.target.value);
    }
    if (item === 'fecha') {
      setValueSelectedFecha(e.target.value);
    }
    if (item === 'lugar') {
      setValueSeletedLugar(e.target.value);
    }
    if (item === 'proveedor') {
      setValueSelectedProveedor(e.target.value);
    }
    if (item === 'numero') {
      setValueSelectedNumero(e.target.value);
    }
  }

  // este useEfect esta al pendiente del cambio de la variable dataWasSent para resetear los input del head
  useEffect(() => {
    setValueSelectedProyecto('');
    setValueSelectedFrente('');
    setValueSelectedSuministro('');
    setValueSelectedFecha('');
    setValueSeletedLugar('');
    setValueSelectedProveedor('');
    setValueSelectedNumero('');
  }, [dataWasSent]);

  return (
    <div className={style.head}>
      <div className={style.proyecto}>
        <h3>Proyecto</h3>
        <select
          id='proyecto'
          name='proyecto'
          onChange={headHandleChange}
          value={valueSelectedProyecto}
        >
          <option
            disabled
            value=''
          >
            Elegir alguna
          </option>
          <option value={2103}>2103 SCT Pachuca</option>
        </select>
      </div>

      <div className={style.frente}>
        <h3>Frente</h3>
        <select
          id='frente'
          name='frente'
          onChange={headHandleChange}
          value={valueSelectedFrente}
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
          value={valueSelectedSuministro}
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
          value={valueSelectedFecha}
        ></input>
      </div>

      <div className={style.lugar}>
        <h3>Lugar de compra</h3>
        <select
          id='lugar'
          name='lugar de compra'
          onChange={headHandleChange}
          value={valueSelectedLugar}
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
          value={valueSelectedProveedor}
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
          value={ValueSelectedNumero}
        />
      </div>
      <div className={style.enviar}>
        <button onClick={centralizeData}>Enviar</button>
      </div>
    </div>
  );
}
