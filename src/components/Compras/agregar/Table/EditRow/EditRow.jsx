'use client';

import style from './edtitRow.module.css';

export default function EditRow({
  setItemSelected,
  itemSelected,
  setItems,
  items,
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
  }

  return (
    <div className={style.edit}>
      <div className={style.partida}>
        <p>{itemSelected.partida}</p>
      </div>
      <div className={style.noparte}>
        <input
          type='text'
          id='noparte'
          onChange={onChangeEditing}
          value={itemSelected.noparte}
        />
      </div>
      <div className={style.descripcion}>
        <input
          type='text'
          id='descripcion'
          value={itemSelected.descripcion}
          onChange={onChangeEditing}
        />
      </div>
      <div className={style.unidad}>
        <select
          name='unidad'
          id='unidad'
          value={itemSelected.unidad}
          onChange={onChangeEditing}
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
      <div className={style.cantidad}>
        <input
          type='number'
          id='cantidad'
          min={1}
          value={itemSelected.cantidad}
          onChange={onChangeEditing}
        />
      </div>
      <div className={style.unitario}>
        <input
          type='number'
          name='unitario'
          id='unitario'
          min={1}
          value={itemSelected.unitario}
          onChange={onChangeEditing}
        />
      </div>
      <div className={style.final}>
        <p>{itemSelected.final}</p>
      </div>
      <div className={style.modos}>
        <i
          className='bi bi-check2'
          onClick={submitEditing}
        ></i>
      </div>
    </div>
  );
}
