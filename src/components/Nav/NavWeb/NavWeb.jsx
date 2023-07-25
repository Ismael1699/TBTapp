'use client';

import style from './navweb.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';

export default function NavWeb() {
  const [whatPage, setWhatPage] = useState('');
  const { data: session, status, update } = useSession();

  useEffect(() => {
    const splitUrl = window.location.pathname.split('/');
    const pathName = splitUrl.length > 2 ? splitUrl[2] : 'dashboard';
    return setWhatPage(pathName);
  }, []);

  function clickPageHandle(e) {
    setWhatPage(e.target.parentElement.id);
  }

  function logOutHandle() {
    signOut();
  }
  return (
    <div className={style.navbar}>
      <div className={style.tbt}>
        <p>
          TBT App <span className={style.marca}>&#174;</span>
        </p>
      </div>
      <li>
        <ul
          className={whatPage === 'dashboard' ? style.pageSelect : null}
          value='dashboard'
        >
          <Link
            className={style.link}
            href='/application'
            id='dashboard'
          >
            <i
              onClick={clickPageHandle}
              className='bi bi-grid-fill'
            ></i>
            <p onClick={clickPageHandle}>Dashboard</p>
          </Link>
        </ul>
        <ul className={whatPage === 'compras' ? style.pageSelect : ''}>
          <Link
            className={style.link}
            href='/application/compras'
            id='compras'
          >
            <i
              className='bi bi-briefcase-fill'
              onClick={clickPageHandle}
            ></i>
            <p onClick={clickPageHandle}>Compras</p>
          </Link>
        </ul>
      </li>
      <div className={style.user}>
        <div className={style.botonera}>
          <i className='bi bi-gear-fill'></i>
          <i
            className='bi bi-door-open-fill'
            onClick={logOutHandle}
          ></i>
        </div>
        <div className={style.img}>
          {/* <Image src={profile} className={style.profile}></Image> */}
          <i className='bi bi-person-fill'></i>
        </div>
        <p>{session ? session.user.user : ''}</p>
      </div>
    </div>
  );
}
