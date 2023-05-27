import style from './layout.module.css';

export default function Compras() {
  return (
    <>
      <div className={style.header}>
        <h1>Requisiciones</h1>
        <div>
          <input
            className={style.buscador}
            type='text'
            placeholder='buscar compra'
          />
          <button className=''> Agregar compra</button>
        </div>
      </div>
    </>
  );
}
