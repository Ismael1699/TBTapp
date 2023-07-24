import style from './navbar.module.css';
import Link from 'next/link';

export default function NavWeb() {
  return (
    <>
      <div className={style.navbar}>
        <div className={style.user}>
          <div className={style.img}>
            {/* <Image src={profile} className={style.profile}></Image> */}
            <i className='bi bi-person-fill'></i>
          </div>
          <button className='button'>
            <p>Logout</p>
          </button>
        </div>
        <li>
          <ul>
            <Link href='/dasboard'>
              <i className='bi bi-house-fill'></i>
              Home
            </Link>
          </ul>
          <ul>
            <Link href='/application/compras'>
              <i className='bi bi-briefcase-fill'></i>
              Compras
            </Link>
          </ul>
        </li>
      </div>
    </>
  );
}
