'use client';
import { useEffect, useState } from 'react';
import style from './agregar.module.css';
import { v4 as uuid } from 'uuid';
import EditEneable from './(components)/Editeneable';
import EditDisable from './(components)/EditDisable';

export default function Agregar() {
  const structHead = {
    proyecto: '',
    frente: '',
    suministro: '',
    fecha: '',
    lugar: '',
    proveedor: '',
  };
  const [headData, setheadData] = useState(structHead);
  const [itemTable, setItemTable] = useState([]);
  const [itemSelected, setItemSelected] = useState({});
  const [objData, setObjData] = useState({});

  //función para eleminar filas
  function rowDelete(e) {
    setItemTable(
      itemTable.filter((item) => item.id !== e.target.parentElement.id)
    );
  }

  function addRowTable() {
    const getLastItem = itemTable[itemTable.length - 1];
    const partida = itemTable.length == 0 ? 1 : getLastItem.partida + 1;
    setItemTable([
      ...itemTable,
      {
        id: uuid(),
        editing: false,
        partida: partida,
        noparte: '',
        descripcion: '',
        unidad: '',
        cantidad: '',
        unitario: '',
        final: '',
      },
    ]);
  }

  //funcion para editar filas
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

  //funcion para guardar onTime de forma temp los elementos inputs de editar
  function onChangeEditing(e) {
    const item = e.target.id;
    const dataLocale = e.target.value;
    const final = itemSelected.cantidad * parseInt(dataLocale);
    setItemSelected(() => {
      return item === 'unitario'
        ? {
            ...itemSelected,
            [item]: dataLocale,
            final: final,
          }
        : {
            ...itemSelected,
            [item]: dataLocale,
          };
    });
  }

  //guardar en el estado los elementos de la tabla
  function submitEditing() {
    let exit = false;
    let values = Object.values(itemSelected);
    values.map((props, index) => (props === '' ? (exit = true) : ''));

    if (exit) {
      return alert('Inserta los datos faltantes');
    }

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
        itemSelected={itemSelected}
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
  // eliminar todos los elementos de la tabla
  function reset() {
    setItemTable([]);
  }

  //funcion para obtener los datos del header
  function headOnChange(e) {
    const item = e.target.id;
    setheadData({ ...headData, [item]: e.target.value });
  }

  //centralizar los datos de la tabla con los de header y saber si el usuario ha ingresado todos los datos
  function enviarData() {
    let rowContentData = false;

    if (itemTable.length === 0) {
      rowContentData = false;
    } else {
      itemTable.map((obj) => {
        console.log('itemtable obj');
        console.log(obj);
        const valuesObj = Object.values(obj);
        valuesObj.map((values) =>
          values === '' ? (rowContentData = false) : (rowContentData = true)
        );
      });
    }
    const value = Object.values(headData);
    let headContentData = true;
    value.map((item) =>
      item === '' ? (headContentData = false) : (headContentData = true)
    );

    if (rowContentData && headContentData) {
      setObjData({ ...headData, table: itemTable });
      console.log('se ha guardado los datos');
    } else {
      alert('Por favor terminina de llenar los datos');
    }
  }

  return (
    <div>
      <div className={style.head}>
        <div className={style.proyecto}>
          <h3>Proyecto</h3>
          <select
            id='proyecto'
            name='proyecto'
            onClick={headOnChange}
          >
            <option
              disabled
              selected
              value
            >
              Elegir alguna
            </option>
            <option value='2103'>2103 SCT Pachuca</option>
          </select>
        </div>

        <div className={style.frente}>
          <h3>Frente</h3>
          <select
            id='frente'
            name='frente'
            onClick={headOnChange}
          >
            <option
              disabled
              selected
              value
            >
              Elegir alguna
            </option>
            <option value='terracerias'>Terracerias</option>
            <option value='maquinaria'>Maquinaria</option>
            <option value='administracion'>Administración</option>
          </select>
        </div>

        <div className={style.suministro}>
          <h3>Grupo de suministro</h3>
          <select
            id='suministro'
            name='grupo de suministro'
            onClick={headOnChange}
          >
            <option
              disabled
              selected
              value
            >
              Elegir alguna
            </option>
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
          <input
            id='fecha'
            type='date'
            onChange={headOnChange}
          ></input>
        </div>

        <div className={style.lugar}>
          <h3>Lugar de compra</h3>
          <select
            id='lugar'
            name='lugar de compra'
            onClick={headOnChange}
          >
            <option
              disabled
              selected
              value
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
            id='proveedores'
            name='proverdores'
            onClick={headOnChange}
          >
            <option
              disabled
              selected
              value
            >
              Elegir alguna
            </option>
            <option value='provedor1'>Provedor 1</option>
            <option value='provedor2'>Provedor 2</option>
          </select>
        </div>
        <div className={style.enviar}>
          <button onClick={enviarData}>Enviar</button>
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
          return genereteJSX(obj, index);
        })}
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
