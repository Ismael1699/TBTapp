import style from './navbar.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import auth from '../../services/firebaseAuth';

export default function NavbarIn() {
  const router = useRouter();
  return (
    <>
      <div className={style.navbar}>
        <div className={style.user}>
          <div className={style.img}>
            {/* <Image src={profile} className={style.profile}></Image> */}
            <i className='bi bi-person-fill'></i>
          </div>
          <button
            onClick={async () => {
              await auth.userLogout();
            }}
            className='button'
          >
            <p>Logout</p>
          </button>
        </div>
        <li>
          <ul>
            <Link href='/'>
              <i className='bi bi-house-fill'></i>
              Home
            </Link>
          </ul>
          <ul>
            <Link href='/compras'>
              <i className='bi bi-briefcase-fill'></i>
              Requisiciones
            </Link>
          </ul>
        </li>
      </div>
    </>
  );
}
