'use client';
import { useRouter } from 'next/navigation';
import style from './navbar.module.css';
import Link from 'next/link';

export default function Navbar() {
  const router = useRouter();

  return (
    <div className={style.navbar}>
      <div className={style.user}>
        <div className={style.img}></div>
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
          <Link href='/home'>Home</Link>
        </ul>
        <ul>
          <Link href='/compras'>Compras</Link>
        </ul>
      </li>
    </div>
  );
}
