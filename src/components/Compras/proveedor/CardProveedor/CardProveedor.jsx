import Link from 'next/link';
import style from './CardProveedor.module.css';

export default function CardProveedor({
  obj,
  index,
  editingProveedor,
  deleteCard,
}) {
  return (
    <div className={style.container}>
      <div className={style.proveedor}>
        <button
          onClick={deleteCard}
          className={style.delete}
          value={obj.id}
        >
          <i className='bi bi-x'></i>
        </button>
        <p>{obj.name}</p>
        <button
          onClick={editingProveedor}
          value={obj.id}
          className={style.edit}
        >
          <i className='bi bi-three-dots'></i>
        </button>
      </div>
      <div className={style.contacto}>
        <p>{obj.contacto}</p>
        <p>{obj.telefono}</p>
      </div>
      <div className={style.correo}>
        <p>{obj.correo}</p>
        <p>{obj.rfc}</p>
      </div>
    </div>
  );
}
