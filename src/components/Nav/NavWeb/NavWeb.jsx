'use client';

import style from './navweb.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

export default function NavWeb() {
  const { data, status, update } = useSession();
  console.log(data);
  return (
    <div className={style.navbar}>
      <div className={style.tbt}>
        <p>
          TBT App <span className={style.marca}>&#174;</span>
        </p>
      </div>
      <li>
        <ul>
          <Link
            className={style.link}
            href='/dasboard'
          >
            <i className='bi bi-grid-fill'></i>
            <p>Dashboard</p>
          </Link>
        </ul>
        <ul>
          <Link
            className={style.link}
            href='/application/compras'
          >
            <i className='bi bi-briefcase-fill'></i>
            <p>Compras</p>
          </Link>
        </ul>
      </li>
      <div className={style.user}>
        <div className={style.img}>
          {/* <Image src={profile} className={style.profile}></Image> */}
          <i className='bi bi-person-fill'></i>
        </div>
        <p>Ismael Sarmiento</p>
      </div>
    </div>
  );
}
