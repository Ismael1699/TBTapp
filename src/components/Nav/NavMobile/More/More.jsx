import style from './more.module.css';
import Link from 'next/link';

export default function More({ isMoreClicked, clickMore, clickPageHandle }) {
  function excueteFunctions(e) {
    clickPageHandle(e);
    clickMore();
  }
  return (
    <div className={isMoreClicked ? style.more : style.moreOcult}>
      <Link
        href='/application'
        onClick={excueteFunctions}
        id='dashboard'
        className={style.Link}
      >
        Dashboard
        <i className='bi bi-caret-right-fill'></i>
      </Link>
      <Link
        href='/application/user'
        onClick={excueteFunctions}
        id='user'
        className={style.Link}
      >
        Perfil
        <i className='bi bi-caret-right-fill'></i>
      </Link>
      <Link
        href='/application/compras'
        onClick={excueteFunctions}
        id='compras'
        className={style.Link}
      >
        Compras
        <i className='bi bi-caret-right-fill'></i>
      </Link>
    </div>
  );
}
