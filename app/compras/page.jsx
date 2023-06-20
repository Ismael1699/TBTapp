import Link from 'next/link';
import Card from './(Card)/Card';
import style from './layout.module.css';

async function getCol() {
  const response = await fetch('http://localhost:3000/api/getColFirebase', {
    method: 'POST',
    body: JSON.stringify({ col: 'requisiciones' }),
  });
  return response.json();
}

export default async function Compras() {
  const dataRequisiciones = await getCol();
  return (
    <div className={style.container}>
      <div className={style.header}>
        <h1>Requisiciones</h1>
        <div className={style.containerbuscador}>
          <i className='bi bi-search'></i>
          <input
            className={style.buscador}
            type='text'
            placeholder='buscar compra'
          />
          <Link
            href='/compras/agregar'
            className={style.button}
          >
            <i className='bi bi-plus-lg'></i>
            <p>Compra</p>
          </Link>
          <button
            href=''
            className={style.button}
          >
            <i className='bi bi-plus-lg'></i>
            <p>Provedor</p>
          </button>
        </div>
      </div>
      <div className={style.containercard}>
        <Card />
        {JSON.stringify(dataRequisiciones.data)}
      </div>
    </div>
  );
}
