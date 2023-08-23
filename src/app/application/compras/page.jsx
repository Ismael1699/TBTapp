import Link from 'next/link';
import style from './layout.module.css';
import GenerateCards from '@/components/Compras/GenerateCards/GenerateCards';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function Compras() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.title}>
          <p>Compras</p>
        </div>
        <div className={style.botonera}>
          <Link
            href='compras/agregar'
            className='button'
          >
            <i className='bi bi-plus-lg'></i>
            <p>Compra</p>
          </Link>
          <Link
            href='compras/proveedor'
            className='button'
          >
            <i className='bi bi-plus-lg'></i>
            <p>Provedor</p>
          </Link>
        </div>
      </div>
      <div className={style.containerCards}>
        <GenerateCards />
      </div>
    </div>
  );
}
