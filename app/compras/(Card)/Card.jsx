import style from './card.module.css';
export default function Card() {
  return (
    <div className={style.card}>
      <p>Proyecto</p>
      <p>No.</p>
      <p>Departamento</p>
      <p>Fecha</p>
      <div>
        <p>Descripción</p>
        <p>precio</p>
      </div>
      <p>solicitante</p>
      <div>
        <h3>status</h3>
        <p>subido</p>
        <p>autorizado</p>
        <p>autorizado</p>
        <p>pagado</p>
      </div>
    </div>
  );
}
