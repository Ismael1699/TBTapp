import style from './card.module.css';

export default async function Card({ obj }) {
  return (
    <div className={style.card}>
      <p className={style.proyecto}>{obj.proyecto}</p>
      <p className={style.no}>No. {obj.numero}</p>
      <p className={style.departamento}>{obj.frente}</p>
      <p className={style.fecha}>{obj.fecha} </p>
      <div className={style.descripcion}>
        <p>
          Descripción
          <br />
          {/* {obj.table[0].descripcion} */}
          hola
        </p>
        <p>
          precio <br />
          {/* {parseInt(obj.table[0].unitario).toLocaleString('en', {
            style: 'currency',
            currency: 'MXN',
          })} */}
        </p>
      </div>
      <p className={style.requisito}>
        solicitante:
        <br /> {obj.frente}
      </p>
      <div className={style.status}>
        <h3 className={style.statustitle}>status</h3>
        <div className={style.barsubida}></div>
        <div className={style.barautorizada1}></div>
        <div className={style.barautorizada2}></div>
        <div className={style.barpagada}></div>
      </div>
    </div>
  );
}
