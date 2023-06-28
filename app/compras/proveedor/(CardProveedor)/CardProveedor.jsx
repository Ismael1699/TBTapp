import Link from 'next/link';
import style from './CardProveedor.module.css';

export default function CardProveedor({ obj, index }) {
  return (
    <Link
      href={`http://localhost:3000/compras/proveedor/${obj.id}`}
      key={index}
    >
      <div className={style.container}>
        <div className={style.proveedor}>
          <p>{obj.name}</p>
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
    </Link>
  );
}
