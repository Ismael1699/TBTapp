'use client';
import style from './table.module.css';
import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import EditRow from './EditRow/EditRow';
import Row from './Row/Row';

const itemModel = {
  id: '',
  editing: false,
  partida: 0,
  noparte: '',
  descripcion: '',
  unidad: '',
  cantidad: '0',
  unitario: '0',
  final: '0',
};

export default function Table({
  items,
  setItems,
  centralizeData,
  isEditing,
  deleteRequisicion,
}) {
  const [itemSelected, setItemSelected] = useState({});
  function addItem() {
    const getLastItem = items[items.length - 1];
    const newPartida = items.length == 0 ? 1 : getLastItem.partida + 1;
    setItems([...items, { ...itemModel, partida: newPartida, id: uuid() }]);
  }

  function editingRow(e) {
    const id = e.target.parentElement.id;

    const element = items.filter((obj) => {
      return obj.id === id;
    });
    setItemSelected(element[0]);

    const newItemTable = items.map((obj) => {
      return obj.id === id ? { ...obj, editing: true } : { ...obj };
    });
    setItems(newItemTable);
  }

  function itemDelete(e) {
    setItems(items.filter((item) => item.id !== e.target.parentElement.id));
  }

  return (
    <div className={style.table}>
      <div className={style.header}>
        <p>Partida</p>
        <p>No parte</p>
        <p>Descripción</p>
        <p>Unidad</p>
        <p>Cantidad</p>
        <p>P. Unitario</p>
        <p>P. Final</p>
        <p>Modos</p>
      </div>
      {/* aqui vamos a llamar los elementos si es edicion o un row normal */}
      {items.map((obj, index) =>
        obj.editing ? (
          <EditRow
            key={index}
            obj={obj}
            index={index}
            setItemSelected={setItemSelected}
            itemSelected={itemSelected}
            setItems={setItems}
            items={items}
          />
        ) : (
          <Row
            index={index}
            key={index}
            obj={obj}
            itemDelete={itemDelete}
            editingRow={editingRow}
          />
        )
      )}

      <div className={style.botonera}>
        <button
          className={style.add}
          onClick={addItem}
        >
          <i className='bi bi-plus'></i>
        </button>

        {isEditing ? (
          <button
            className={style.buttonDelete}
            onClick={deleteRequisicion}
          >
            <i className='bi bi-trash-fill'></i>
            Eliminar
          </button>
        ) : null}

        <button
          className={style.enviar}
          onClick={centralizeData}
        >
          <i className='bi bi-send-fill'></i>
          Enviar
        </button>
      </div>
    </div>
  );
}
