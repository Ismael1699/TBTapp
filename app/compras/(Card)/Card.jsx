import style from './card.module.css';
export default function Card() {
  return (
    <div className={style.card}>
      <p className={style.proyecto}>Proyecto</p>
      <p className={style.no}>No.</p>
      <p className={style.departamento}>Departamento</p>
      <p className={style.fecha}>Fecha</p>
      <div className={style.descripcion}>
        <p>Descripción</p>
        <p>precio</p>
      </div>
      <p className={style.requisito}>solicitante</p>
      <div className={style.status}>
        <h3>status</h3>
        <p>subido</p>
        <p>autorizado</p>
        <p>autorizado</p>
        <p>pagado</p>
      </div>
    </div>
  );
}
