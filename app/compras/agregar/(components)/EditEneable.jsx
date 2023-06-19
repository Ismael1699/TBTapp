import style from '../agregar.module.css';
export default function EditEneable({
  obj,
  index,
  onChangeEditing,
  submitEditing,
  itemSelected,
}) {
  const cant = parseInt(
    itemSelected.cantidad == '' ? 0 : itemSelected.cantidad
  );
  const price = parseInt(
    itemSelected.unitario == '' ? 0 : itemSelected.unitario
  );
  const final = cant * price;
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
          type='number'
          onChange={onChangeEditing}
        />
      </td>
      <td>
        <input
          id='descripcion'
          type='text'
          className={style.inputsRow}
          onChange={onChangeEditing}
        />
      </td>
      <td>
        <select
          id='unidad'
          className={style.inputsRow}
          name='unidad'
          onChange={onChangeEditing}
          defaultValue=''
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
          onChange={onChangeEditing}
        />
      </td>
      <td>
        <input
          id='unitario'
          className={style.inputsRow}
          type='number'
          onChange={onChangeEditing}
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
