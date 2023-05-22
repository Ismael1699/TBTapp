'use client';
import { useRouter } from 'next/navigation';
import style from './navbar.module.css';

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
        <ul>home</ul>
        <ul>compras</ul>
      </li>
    </div>
  );
}
