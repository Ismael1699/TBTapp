'use client';
import { useState } from 'react';
import style from './agregar.module.css';

export default function Agregar() {
  const [itemTable, setItemTable] = useState([]);

  function addRowTable() {
    setItemTable([...itemTable, itemTable.length + 1]);
  }

  function reset() {
    setItemTable([]);
  }
  console.log(itemTable);

  const rowGenerator = itemTable.map(() => (
    <tr>
      <td>1</td>
      <td>
        <input
          className={style.inputsRow}
          type='number'
        />
      </td>
      <td>
        <input
          type='text'
          className={style.inputsRow}
        />
      </td>
      <td>
        <select
          className={style.inputsRow}
          name='unidad'>
          <option value='pza'>PZA</option>
          <option value='pza'>Serv</option>
          <option value='litros'>Litros</option>
          <option value='kilos'>Kilos</option>
        </select>
      </td>
      <td>
        <input
          className={style.inputsRow}
          type='number'
        />
      </td>
      <td>
        <input
          className={style.inputsRow}
          type='number'
        />
      </td>
      <td>$150</td>
      <td>eliminar o editar</td>
    </tr>
  ));

  return (
    <div>
      <div className={style.head}>
        <div className={style.proyecto}>
          <h3>Proyecto</h3>
          <select name='proyecto'>
            <option value='2103'>2103 SCT Pachuca</option>
          </select>
        </div>

        <div className={style.frente}>
          <h3>Frente</h3>
          <select name='frente'>
            <option value='terracerias'>Terracerias</option>
            <option value='maquinaria'>Maquinaria</option>
            <option value='administracion'>Administración</option>
          </select>
        </div>

        <div className={style.suministro}>
          <h3>Grupo de suministro</h3>
          <select name='grupo de suministro'>
            <option value='materiales de construccion'>
              Materiales de construcción
            </option>
            <option value='refacciones'>Refacciones</option>
            <option value='combustibles y aceites'>
              Combustible y aceites
            </option>
            <option value='resguardo consumo'>Resguardo cosumo</option>
            <option value='equipo auxiliar'>Equipo auxiliar</option>
            <option value='papeleria'>papeleria</option>
            <option value='Otros'>Otros</option>
          </select>
        </div>

        <div className={style.fecha}>
          <h3>Fecha</h3>
          <input type='date'></input>
        </div>

        <div className={style.lugar}>
          <h3>Lugar de compra</h3>
          <select name='lugar de compra'>
            <option value='local'>Compra local</option>
            <option value='regional'>Compra regional</option>
            <option value='nacional'>Compra nacional</option>
          </select>
        </div>

        <div className={style.proveedor}>
          <h3>Proveedor</h3>
          <select name='proverdores'>
            <option value='provedor1'>Provedor 1</option>
            <option value='provedor2'>Provedor 2</option>
          </select>
        </div>
        <div className={style.file}>
          <h3>Cotización</h3>
          <input type='file'></input>
        </div>
      </div>

      <table className={style.table}>
        <tr>
          <th>partida</th>
          <th>No parte</th>
          <th className={style.sizedescripcion}>Descripción</th>
          <th>Unidad</th>
          <th>Cantidad</th>
          <th>Precio Unitario</th>
          <th>Precio Final</th>
          <th>modos</th>
        </tr>
        {rowGenerator}
      </table>

      <button
        className={style.button}
        onClick={addRowTable}>
        Agregar
      </button>
      <button
        className={style.button}
        onClick={reset}>
        Reset
      </button>
    </div>
  );
}
