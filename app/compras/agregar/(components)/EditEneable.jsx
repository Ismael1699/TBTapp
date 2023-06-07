import style from '../agregar.module.css';
export default function EditEneable({ obj, index, onChangeEditing }) {
  return (
    <tr className={style.rowGenerator}>
      <td>{index}</td>
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
        >
          <option value='pza'>PZA</option>
          <option value='pza'>Serv</option>
          <option value='litros'>Litros</option>
          <option value='kilos'>Kilos</option>
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
      <td>$0</td>
      <td>
        <i className='bi bi-check-lg'></i>
      </td>
    </tr>
  );
}
