import style from './CardProveedor.module.css';

export default function CardProveedor({ obj, key }) {
  return (
    <div
      key={key}
      className={style.container}
    >
      <div className={style.proveedor}>
        <p>{obj.proveedor}</p>
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
