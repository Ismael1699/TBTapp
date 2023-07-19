import style from '../agregar.module.css';
export default function EditEneable({
  obj,
  index,
  onChangeEditing,
  submitEditing,
  itemSelected,
}) {
  const cant =
    itemSelected.cantidad == ''
      ? 0
      : Number.parseFloat(itemSelected.cantidad).toFixed(2);
  const price =
    itemSelected.unitario == ''
      ? 0
      : Number.parseFloat(itemSelected.unitario).toFixed(2);
  const final = Number.parseFloat(cant * price).toFixed(2);

  return (
    <tr
      key={obj.id}
      id={obj.id}
      className={style.rowGenerator}
    >
      <td>{index + 1}</td>
      <td>
        <input
          id='noparte'
          className={style.inputsRow}
          type='text'
          onChange={onChangeEditing}
          value={itemSelected.noparte}
        />
      </td>
      <td>
        <input
          id='descripcion'
          type='text'
          className={style.inputsRow}
          onChange={onChangeEditing}
          value={itemSelected.descripcion}
        />
      </td>
      <td>
        <select
          id='unidad'
          className={style.inputsRow}
          name='unidad'
          onChange={onChangeEditing}
          value={itemSelected.unidad}
        >
          <option
            disabled
            value=''
          ></option>
          <option value='PZA'>PZA</option>
          <option value='Serv'>Serv</option>
          <option value='Litros'>Litros</option>
          <option value='Kilos'>Kilos</option>
        </select>
      </td>
      <td>
        <input
          id='cantidad'
          className={style.inputsRow}
          type='number'
          min='1'
          onChange={onChangeEditing}
          value={itemSelected.cantidad}
        />
      </td>
      <td>
        <input
          id='unitario'
          className={style.inputsRow}
          type='number'
          onChange={onChangeEditing}
          value={itemSelected.unitario}
        />
      </td>
      <td>{final}</td>
      <td className={style.check}>
        <i
          onClick={submitEditing}
          className='bi bi-check-lg'
        ></i>
      </td>
    </tr>
  );
}
