import style from '../agregar.module.css';
export default function EditDisable({ obj, index, rowDelete }) {
  return (
    <tr
      id={index}
      className={style.rowGenerator}
    >
      {/* partida */}
      <td>{index}</td>
      {/* no parte */}
      <td>{obj.noparte}</td>
      {/* Descripción */}
      <td>{obj.descripcion}</td>
      {/* unidad */}
      <td>{obj.unidad}</td>
      {/* cantidad */}
      <td>{obj.cantidad}</td>
      {/* precio unitario */}
      <td>{obj.unitario}</td>
      {/* precio final */}
      <td>{obj.final}</td>
      {/* modos */}
      <td>
        <i
          onClick={rowDelete}
          id={obj.id}
          className='bi bi-x-lg'
        ></i>
      </td>
    </tr>
  );
}
