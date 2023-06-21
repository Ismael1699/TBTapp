import style from './proveedor.module.css';

export default function Proveedores() {
  return (
    <div className={style.container}>
      <div className={style.head}>
        <div className={style.title}>
          <p>Proveedores</p>
        </div>
        <div className={style.buttons}>
          <button className='button'>Agregar</button>
          <button className={style.filterButton}>Maquinaria</button>
          <button>Terracerias</button>
          <button>Administración</button>
        </div>
      </div>
      <div className={style.body}></div>
    </div>
  );
}
