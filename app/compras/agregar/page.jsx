'use client';
import { useEffect, useState, use } from 'react';
import useSWR from 'swr';
import style from './agregar.module.css';
import { v4 as uuid } from 'uuid';
import EditEneable from './(components)/Editeneable';
import EditDisable from './(components)/EditDisable';
import upData from '../../../services/upData';
import HeadData from './(components)/HeadData';

async function fetching(data) {
  return await fetch(`../../../api/conectionDB`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export default function Agregar() {
  const structHead = {
    proyecto: '',
    frente: '',
    suministro: '',
    fecha: '',
    lugar: '',
    proveedor: '',
    numero: '',
  };
  const [headData, setHeadData] = useState(structHead);
  const [itemTable, setItemTable] = useState([]);
  const [itemSelected, setItemSelected] = useState({});
  const [dataWasSent, setDataWasSent] = useState(false);

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

    const element = itemTable.filter((obj) => {
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
    const dataTarget = e.target.value;
    const pricefinal =
      '' +
      Number.parseFloat(itemSelected.cantidad).toFixed(2) *
        Number.parseFloat(dataTarget).toFixed(2);
    setItemSelected(() => {
      return item === 'unitario'
        ? {
            ...itemSelected,
            [item]: dataTarget,
            final: pricefinal,
          }
        : item === 'cantidad'
        ? {
            ...itemSelected,
            [item]: dataTarget,
            final:
              '' +
              Number.parseFloat(dataTarget).toFixed(2) *
                Number.parseFloat(itemSelected.unitario).toFixed(2),
          }
        : {
            ...itemSelected,
            [item]: dataTarget,
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
        key={obj.id}
      />
    ) : (
      <EditDisable
        key={obj.id}
        obj={obj}
        index={index}
        rowDelete={rowDelete}
        editingRow={editingRow}
      />
    );
  }

  //centralizar los datos de la tabla con los de header y saber si el usuario ha ingresado todos los datos
  function centralizeData() {
    let rowContentData = false;

    if (itemTable.length === 0) {
      rowContentData = false;
    } else {
      itemTable.map((obj) => {
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
      const data = { ...headData, table: itemTable };
      return sendDataToDB(data);
    } else {
      alert('Por favor terminina de llenar los datos');
    }
  }

  async function sendDataToDB(data) {
    //  const { result, error } = await upData(
    //   'requisiciones',
    //    `requisicion${data.numero}`,
    //    data
    //  );
    // if (error) console.log('los datos se enviaron a la base de datos');
    // console.log(result)
    //modificar excel con google
    sendDataBackend(data);
  }

  async function sendDataBackend(data) {
    const res = await fetching(data);
    if (res.ok) {
      const res1 = JSON.parse(await res.text());
      console.log(res1.message);
      alert(res1.message);
    } else {
      console.log(res);
      alert('Status: ' + res.status + ' ' + res.statusText);
    }
  }

  console.log(itemSelected);
  return (
    <div>
      <HeadData
        setHeadData={setHeadData}
        centralizeData={centralizeData}
        headData={headData}
        dataWasSent={dataWasSent}
        setDataWasSent={setDataWasSent}
      />
      <table className={style.table}>
        <tbody>
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
        </tbody>
      </table>

      <button
        className={style.button}
        onClick={addRowTable}
      >
        Agregar
      </button>
    </div>
  );
}
