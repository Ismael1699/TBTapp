'use client';

import style from './editItemCard.module.css';

export default function EditItemCard({
  setItemSelected,
  itemSelected,
  setItems,
  items,
  setIsEditingRow,
}) {
  function onChangeEditing(e) {
    const item = e.target.id;
    const dataTarget = e.target.value;
    setItemSelected(() => {
      if (item === 'unitario') {
        return {
          ...itemSelected,
          [item]: dataTarget,
          final: multiplicadorStrings(itemSelected.cantidad, dataTarget),
        };
      }

      if (item === 'cantidad') {
        return {
          ...itemSelected,
          [item]: dataTarget,
          final: multiplicadorStrings(itemSelected.unitario, dataTarget),
        };
      }

      return {
        ...itemSelected,
        [item]: dataTarget,
      };
    });
  }

  function multiplicadorStrings(a, b) {
    if (a === '' || b === '') return '0';
    const aNumber = Number.parseFloat(a).toFixed(4);
    const bNumber = Number.parseFloat(b).toFixed(4);

    return '' + Number.parseFloat(aNumber * bNumber).toFixed(2);
  }

  function submitEditing() {
    let exit = false;
    let values = Object.values(itemSelected);
    values.map((props, index) => (props === '' ? (exit = true) : ''));

    if (exit) {
      return alert('Inserta los datos faltantes');
    }

    setItems(
      items.map((obj) =>
        obj.id === itemSelected.id ? { ...itemSelected } : { ...obj }
      )
    );
    setIsEditingRow(false);
  }

  return (
    <div className={style.itemCard}>
      <p className={style.title}>Articulo {itemSelected.partida}</p>
      <i
        className='bi bi-check-lg'
        onClick={submitEditing}
      ></i>
      <div className={style.container}>
        <p className={style.subtitle}>No. parte</p>
        <input
          className={style.valor}
          type='text'
          id='noparte'
          onChange={onChangeEditing}
          value={itemSelected.noparte}
        />
      </div>
      <div className={style.container}>
        <p className={style.subtitle}>Unidad</p>
        <select
          name='unidad'
          id='unidad'
          value={itemSelected.unidad}
          onChange={onChangeEditing}
          className={style.valor}
        >
          <option
            disabled
            value=''
          ></option>
          <option value='pza'>PZA</option>
          <option value='Serv'>Serv</option>
          <option value='Litros'>Litros</option>
          <option value='Kilos'>Kilos</option>
          <option value='Toneladas'>Toneladas</option>
        </select>
      </div>
      <div className={style.container}>
        <p className={style.subtitle}>Cantidad</p>
        <input
          className={style.valor}
          type='number'
          id='cantidad'
          min={1}
          value={itemSelected.cantidad}
          onChange={onChangeEditing}
        />
      </div>
      <div className={style.container}>
        <p className={style.subtitle}>Precio Unitario</p>
        <input
          className={style.valor}
          type='number'
          name='unitario'
          id='unitario'
          min={1}
          value={itemSelected.unitario}
          onChange={onChangeEditing}
        />
      </div>

      <div className={style.descripcion}>
        <p>Descripción</p>
        <textarea
          value={itemSelected.descripcion}
          id='descripcion'
          onChange={onChangeEditing}
        />
      </div>
      <div className={style.container}></div>
      <div className={style.container}>
        <p className={style.subtitle}>Precio</p>
        <p className={style.valorFinal}>${itemSelected.final}</p>
      </div>
    </div>
  );
}
