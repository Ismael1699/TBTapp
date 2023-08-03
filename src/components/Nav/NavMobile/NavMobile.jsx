'use client';

import style from './navMobile.module.css';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import More from './More/More';

export default function NavMobile() {
  const [whatPage, setWhatPage] = useState('');
  const [isMoreClicked, setIsMoreClicked] = useState(false);

  useEffect(() => {
    const splitUrl = window.location.pathname.split('/');
    const pathName = splitUrl.length > 2 ? splitUrl[2] : 'dashboard';
    return setWhatPage(pathName);
  }, []);

  function logOutHandle(e) {
    clickPageHandle(e);
    signOut();
  }
  function clickPageHandle(e) {
    setWhatPage(e.target.id);
  }

  function clickMore() {
    setIsMoreClicked(!isMoreClicked);
  }

  return (
    <>
      <More
        isMoreClicked={isMoreClicked}
        clickMore={clickMore}
        clickPageHandle={clickPageHandle}
      />
      <div className={style.navMobile}>
        <div className={style.efecct}>
          <Link
            href='/application/user'
            className={whatPage === 'user' ? style.clicked : ''}
          >
            <i
              className='bi bi-person-fill'
              id='user'
              onClick={clickPageHandle}
            ></i>
          </Link>
        </div>
        <div className={style.efecct}>
          <Link
            href='/application'
            className={whatPage === 'dashboard' ? style.clicked : ''}
          >
            <i
              className='bi bi-grid-fill'
              id='dashboard'
              onClick={clickPageHandle}
            ></i>
          </Link>
        </div>
        <div className={style.more}>
          <div className={style.round}>
            <i
              className='bi bi-list'
              onClick={clickMore}
            ></i>
          </div>
        </div>
        <div className={style.efecct}>
          <Link
            href='/application/compras'
            className={whatPage === 'compras' ? style.clicked : ''}
          >
            <i
              className='bi bi-briefcase-fill'
              id='compras'
              onClick={clickPageHandle}
            ></i>
          </Link>
        </div>
        <div className={whatPage === 'logout' ? style.clicked : style.efecct}>
          <i
            onClick={(e) => logOutHandle(e)}
            className='bi bi-door-open-fill'
            id='logout'
          ></i>
        </div>
      </div>
    </>
  );
}
