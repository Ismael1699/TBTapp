'use client';
import { useRouter } from 'next/navigation';
import style from './navbar.module.css';
import Link from 'next/link';

export default function Navbar() {
  const router = useRouter();

  return (
    <div className={style.navbar}>
      <div className={style.user}>
        <div className={style.img}>
          {/* <Image src={profile} className={style.profile}></Image> */}
          <i className='bi bi-person-fill'></i>
        </div>
        <button
          onClick={() => {
            router.push('/login');
          }}
        >
          Login
        </button>
      </div>
      <li>
        <ul>
          <Link href='/home'>
            <i className='bi bi-house-fill'></i>
            Home
          </Link>
        </ul>
        <ul>
          <Link href='/compras'>
            <i className='bi bi-briefcase-fill'></i>
            Compras
          </Link>
        </ul>
      </li>
    </div>
  );
}
