import Link from 'next/link';
import style from './layout.module.css';
import GenerateCards from '@/components/Compras/GenerateCards/GenerateCards';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import axios from 'axios';

async function getCompras(rol) {
  const res = await axios(
    process.env.NEXT_PUBLIC_URL_HOST + `/api/compras?rol=${rol}`
  );
  return res.data.data;
}

export default async function Compras() {
  const session = await getServerSession(authOptions);
  const compras = await getCompras(session.user.rol);

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
        <GenerateCards compras={compras} />
      </div>
    </div>
  );
}
