import style from './CardProveedor.module.css';

export default function CardProveedor() {
  return (
    <div className={style.container}>
      <div className={style.proveedor}>
        <p>proveedor</p>
      </div>
      <div className={style.contacto}>
        <p>contacto</p>
      </div>
      <div className={style.correo}>
        <p>correo</p>
      </div>
      <div className={style.telefono}>
        <p>telefono</p>
      </div>
      <div className={style.rfc}>
        <p>RFC</p>
      </div>
      <div className={style.direccion}>
        <p>Direccion</p>
      </div>
    </div>
  );
}
