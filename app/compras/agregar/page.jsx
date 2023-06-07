'use client';
import { useEffect, useState } from 'react';
import style from './agregar.module.css';
import { v4 as uuid } from 'uuid';
import EditEneable from './(components)/Editeneable';
import EditDisable from './(components)/EditDisable';

export default function Agregar() {
  const [itemTable, setItemTable] = useState([]);
  const [itemSelected, setItemSelected] = useState({});

  function rowDelete(e) {
    setItemTable(
      itemTable.filter((item) => item.id !== e.target.parentElement.id)
    );
  }

  function addRowTable() {
    const getLastItem = itemTable[itemTable.length - 1];
    const index = itemTable.length == 0 ? 1 : getLastItem.number + 1;
    setItemTable([
      ...itemTable,
      {
        id: uuid(),
        editing: false,
        index: index,
        noparte: '',
        descripcion: '',
        unidad: '',
        cantidad: '',
        unitario: '',
        final: '',
      },
    ]);
  }

  function editingRow(e) {
    const id = e.target.parentElement.id;
    let index;
    const element = itemTable.filter((obj, ind) => {
      index = ind;
      return obj.id === id;
    });
    setItemSelected({ ...element[0], editing: false });
    const newItemTable = itemTable.map((obj) => {
      return obj.id === element[0].id ? { ...obj, editing: true } : { ...obj };
    });
    setItemTable(newItemTable);
  }

  function onChangeEditing(e) {
    const item = e.target.id;
    const data = e.target.value;
    setItemSelected({
      ...itemSelected,
      [item]:
        item !== 'unitario'
          ? data
          : parseInt(data).toLocaleString('en', {
              style: 'currency',
              currency: 'MXN',
            }),
    });
    console.log(itemSelected);
  }

  function submitEditing() {
    setItemTable(
      itemTable.map((obj) =>
        obj.id === itemSelected.id ? { ...itemSelected } : { ...obj }
      )
    );
  }

  //funcion que genere jsx para cada fila de la tabla se le pide id
  function genereteJSX(obj, index) {
    return obj.editing ? (
      <EditEneable
        obj={obj}
        index={index}
        rowDelete={rowDelete}
        onChangeEditing={onChangeEditing}
        submitEditing={submitEditing}
      />
    ) : (
      <EditDisable
        obj={obj}
        index={index}
        rowDelete={rowDelete}
        editingRow={editingRow}
      />
    );
  }

  function reset() {
    setItemTable([]);
  }

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

        {/* parte donde se generará de manera dinamica los elementos de cada fila de la tabla */}

        {itemTable.map((obj, index) => {
          console.log(obj.id);
          return genereteJSX(obj, index);
        })}
        {console.log(itemTable)}
      </table>

      <button
        className={style.button}
        onClick={addRowTable}
      >
        Agregar
      </button>
      <button
        className={style.button}
        onClick={reset}
      >
        Reset
      </button>
    </div>
  );
}
