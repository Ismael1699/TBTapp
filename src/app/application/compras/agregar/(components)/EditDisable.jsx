import style from '../agregar.module.css';
export default function EditDisable({ obj, index, rowDelete, editingRow }) {
  return (
    <tr
      key={obj.id}
      id={obj.id}
      className={style.rowGenerator}
    >
      {/* partida */}
      <td>{index + 1}</td>
      {/* no parte */}
      <td>{obj.noparte}</td>
      {/* Descripción */}
      <td>{obj.descripcion}</td>
      {/* unidad */}
      <td>{obj.unidad}</td>
      {/* cantidad */}
      <td>{obj.cantidad}</td>
      {/* precio unitario */}
      <td>
        {obj.unitario !== ''
          ? parseFloat(obj.unitario).toLocaleString('en', {
              style: 'currency',
              currency: 'MXN',
            })
          : 'MX$0.0'}
      </td>
      {/* precio final */}
      <td>
        {obj.final !== ''
          ? parseFloat(obj.final).toLocaleString('en', {
              style: 'currency',
              currency: 'MXN',
            })
          : 'MX$0.0'}
      </td>
      {/* modos */}
      <td
        id={obj.id}
        className={style.modos}
      >
        <i
          onClick={rowDelete}
          className='bi bi-x-lg'
        ></i>
        <i
          onClick={editingRow}
          className='bi bi-pencil-square'
        ></i>
      </td>
    </tr>
  );
}
