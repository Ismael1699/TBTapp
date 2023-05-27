import style from './layout.module.css';

export default function Compras() {
  return (
    <>
      <div className={style.header}>
        <h1>Requisiciones</h1>
        <div className={style.containerbuscador}>
          <i className='bi bi-search'></i>
          <input
            className={style.buscador}
            type='text'
            placeholder='buscar compra'
          />
          <button className=''>
            <i className='bi bi-plus-lg'></i>
            <p>Agregar</p>
          </button>
        </div>
      </div>
    </>
  );
}
