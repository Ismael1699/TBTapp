'use client';

import { useState } from 'react';
import ItemCard from './ItemCard/ItemCard';
import style from './TableMobile.module.css';
import EditItemCard from './EditItemCard/EditItemCard';
import { v4 as uuid } from 'uuid';

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

export default function TableMobile({
  items,
  setItems,
  centralizeData,
  isEditing,
  deleteRequisicion,
}) {
  const [itemSelected, setItemSelected] = useState({});
  const [isEditingRow, setIsEditingRow] = useState(false);
  function addItem() {
    const getLastItem = items[items.length - 1];
    const newPartida = items.length == 0 ? 1 : getLastItem.partida + 1;
    setItems([...items, { ...itemModel, partida: newPartida, id: uuid() }]);
  }

  function editingRow(e) {
    setIsEditingRow(true);
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
    console.log('se presiono');
    setItems(items.filter((item) => item.id !== e.target.parentElement.id));
  }

  function advertencia() {
    alert('Termina de editar el Articulo para enviar la compra completa');
  }

  return (
    <div className={style.tableMobile}>
      {items.length ? null : <h4>Agrega elementos</h4>}
      {items?.map((obj, index) => {
        if (obj.editing) {
          return (
            <EditItemCard
              key={index}
              obj={obj}
              index={index}
              setItemSelected={setItemSelected}
              itemSelected={itemSelected}
              setItems={setItems}
              items={items}
              setIsEditingRow={setIsEditingRow}
            />
          );
        }
        return (
          <ItemCard
            key={index}
            obj={obj}
            index={index}
            itemDelete={itemDelete}
            editingRow={editingRow}
          />
        );
      })}

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
          onClick={isEditingRow ? advertencia : centralizeData}
        >
          <i className='bi bi-send-fill'></i>
          Enviar
        </button>
      </div>
    </div>
  );
}
