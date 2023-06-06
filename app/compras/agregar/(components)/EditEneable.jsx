export default function EditEneable({ obj, index }) {
  return (
    <tr
      id={index}
      className={style.rowGenerator}>
      <td>{index}</td>
      <td>
        <input
          className={style.inputsRow}
          type='number'
        />
      </td>
      <td>
        <input
          type='text'
          className={style.inputsRow}
        />
      </td>
      <td>
        <select
          className={style.inputsRow}
          name='unidad'>
          <option value='pza'>PZA</option>
          <option value='pza'>Serv</option>
          <option value='litros'>Litros</option>
          <option value='kilos'>Kilos</option>
        </select>
      </td>
      <td>
        <input
          className={style.inputsRow}
          type='number'
        />
      </td>
      <td>
        <input
          className={style.inputsRow}
          type='number'
        />
      </td>
      <td>$150</td>
      <td>
        <i
          onClick={rowDelete}
          id={id}
          className='bi bi-x-lg'></i>
      </td>
    </tr>
  );
}
