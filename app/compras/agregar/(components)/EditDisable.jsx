import style from '../agregar.module.css';
export default function EditDisable({ obj, index, rowDelete, editingRow }) {
  return (
    <tr
      id={index + 1}
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
          ? parseInt(obj.unitario).toLocaleString('en', {
              style: 'currency',
              currency: 'MXN',
            })
          : 'MX$0.0'}
      </td>
      {/* precio final */}
      <td>
        {obj.unitario !== ''
          ? obj.final.toLocaleString('en', {
              style: 'currency',
              currency: 'MXN',
            })
          : 'MX$0.0'}
      </td>
      {/* modos */}
      <td id={obj.id}>
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
