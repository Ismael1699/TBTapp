import Link from 'next/link';
import style from './CardProveedor.module.css';

export default function CardProveedor({
  obj,
  index,
  editingProveedor,
  deleteCard,
}) {
  console.log(obj.id);
  return (
    <div className={style.container}>
      <div className={style.proveedor}>
        <p>{obj.name}</p>
        <button
          onClick={editingProveedor}
          value={obj.id}
          className={style.edit}
        >
          <i className='bi bi-three-dots'></i>
        </button>
        <button
          onClick={deleteCard}
          className={style.delete}
        >
          <i
            value={obj.id}
            className='bi bi-x'
          ></i>
        </button>
      </div>
      <div className={style.contacto}>
        <p>{obj.contacto}</p>
      </div>
      <div className={style.correo}>
        <p>{obj.correo}</p>
      </div>
      <div className={style.telefono}>
        <p>{obj.telefono}</p>
      </div>
      <div className={style.rfc}>
        <p>{obj.rfc}</p>
      </div>
      <div className={style.direccion}>
        <p>{obj.direccion}</p>
      </div>
    </div>
  );
}
