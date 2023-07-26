'use client';

import style from './navMobile.module.css';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function NavMobile() {
  function logOutHandle() {
    signOut();
  }
  return (
    <div className={style.navMobile}>
      <div>
        <i className='bi bi-person-fill'></i>
      </div>
      <div>
        <Link href='/application'>
          <i className='bi bi-grid-fill'></i>
        </Link>
      </div>
      <div className={style.more}>
        <div className={style.round}>
          <i className='bi bi-list'></i>
        </div>
      </div>
      <div>
        <Link href='/application/compras'>
          <i className='bi bi-briefcase-fill'></i>
        </Link>
      </div>
      <div>
        <i
          onClick={logOutHandle}
          className='bi bi-door-open-fill'
        ></i>
      </div>
    </div>
  );
}
