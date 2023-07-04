'use client';
import { useEffect, useState } from 'react';
import style from '../agregar/agregar.module.css';
import { v4 as uuid } from 'uuid';
import EditEneable from '../agregar/(components)/Editeneable';
import EditDisable from '../agregar/(components)/EditDisable';
import HeadData from '../agregar/(components)/HeadData';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ButtonDonwload from '../(ButtonDonwload)/ButtonDonwload';
import { writeFile } from 'xlsx';

const structHead = {
  proyecto: '',
  frente: '',
  suministro: '',
  fecha: '',
  lugar: '',
  proveedor: '',
  numero: '',
};
async function fetching(data) {
  return await fetch(` http://localhost:3000/api/conectionDB`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

async function deleteCompra(id) {
  const res = await fetch(` http://localhost:3000/api/conectionDB?id=${id}`, {
    method: 'DELETE',
  });
  return JSON.parse(await res.text());
}

async function getDataCompra(id) {
  const res = await fetch(
    `http://localhost:3000/api/conectionDB/compra?id=${id}`
  );
  return JSON.parse(await res.text());
}

async function getProveedores() {
  const response = await fetch('http://localhost:3000/api/proveedores');
  return JSON.parse(await response.text());
}

async function getExcel() {
  const response = await fetch('http://localhost:3000/api/excelMod/download');
  return JSON.parse(await response.text());
}

export default function RequisicionDetails({ params }) {
  const [headData, setHeadData] = useState(structHead);
  const [itemTable, setItemTable] = useState([]);
  const [itemSelected, setItemSelected] = useState({});
  const [dataWasSent, setDataWasSent] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const [arrayProveedores, setArrayProveedores] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function dataCompra() {
      const res = await getDataCompra(params.id);
      setHeadData(res);
      setItemTable(res.obj_table.table);
    }
    dataCompra();

    async function proveedores() {
      const res = await getProveedores();
      setArrayProveedores(res);
    }
    proveedores();
  }, []);

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
      Number.parseFloat(
        Number.parseFloat(itemSelected.cantidad).toFixed(2) *
          Number.parseFloat(dataTarget).toFixed(2)
      ).toFixed(2);
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
              Number.parseFloat(
                Number.parseFloat(dataTarget).toFixed(2) *
                  Number.parseFloat(itemSelected.unitario).toFixed(2)
              ).toFixed(2),
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
    sendDataBackend(data);
  }

  async function sendDataBackend(data) {
    const res = await fetching(data);
    if (res.ok) {
      const res1 = JSON.parse(await res.text());
      alert(res1.message);
    } else {
      alert('Status: ' + res.status + ' ' + res.statusText);
    }
  }

  async function DeleteRequisicion() {
    const isDelete = confirm(
      '¿Quiéres eleminar permanentemente esta requisición?'
    );
    if (isDelete) {
      const res = await deleteCompra(params.id);
      alert(res.message);
      router.refresh();
      router.push('/compras');
    }
  }

  async function descargar() {
    const res = await getExcel();
    return await writeFile(res.hola, 'Presidents.xlsx', { compression: true });
  }
  return (
    <div>
      <HeadData
        setHeadData={setHeadData}
        headData={headData}
        dataWasSent={dataWasSent}
        setDataWasSent={setDataWasSent}
        arrayProveedores={arrayProveedores}
        isEditing={isEditing}
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
      <div className={style.botones}>
        <button
          className={style.buttonAdd}
          onClick={addRowTable}
        >
          <i className='bi bi-plus'></i>
        </button>
        <div className={style.buttonsBackend}>
          <button
            onClick={descargar}
            className={style.buttonEnviar}
          >
            Descargar
          </button>
          <button
            className={style.buttonDelete}
            onClick={DeleteRequisicion}
          >
            <i className='bi bi-trash-fill'></i>
            Eliminar
          </button>
          <button
            onClick={centralizeData}
            className={style.buttonEnviar}
          >
            <i className='bi bi-send-fill'></i>
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
