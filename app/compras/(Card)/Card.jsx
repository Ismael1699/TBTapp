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
        <h3 className={style.statustitle}>status</h3>
        {/*<p className={style.subida}>subido</p>
        <p className={style.autorizada1}>autorizado</p>
        <p className={style.autorizada2}>autorizado</p>
        <p className={style.pagada}>pagado</p> */}
        <div className={style.barsubida}></div>
        <div className={style.barautorizada1}></div>
        <div className={style.barautorizada2}></div>
        <div className={style.barpagada}></div>
      </div>
    </div>
  );
}
