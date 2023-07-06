import Link from 'next/link';
import Card from './(Card)/Card';
import style from './layout.module.css';

async function getData() {
  return await (
    await fetch('http://localhost:3000/api/conectionDB', {
      cache: 'no-store',
    })
  ).json();
}
export default async function Compras() {
  const dataRequisiciones = await getData();
  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.title}>
          <p>Requisiciones</p>
        </div>
        <div className={style.containerbuscador}>
          <i className='bi bi-search'></i>
          <form>
            <label htmlFor='search'></label>
            <input
              className={style.buscador}
              type='text'
              placeholder='buscar compra'
              id='search'
            />
          </form>

          <Link
            href='/compras/agregar'
            className='button'
          >
            <i className='bi bi-plus-lg'></i>
            <p>Compra</p>
          </Link>
          <Link
            href='/compras/proveedor'
            className='button'
          >
            <i className='bi bi-plus-lg'></i>
            <p>Provedor</p>
          </Link>
        </div>
      </div>
      <div className={style.containercard}>
        {dataRequisiciones.data.map((obj, index) => (
          <Card
            obj={obj}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
