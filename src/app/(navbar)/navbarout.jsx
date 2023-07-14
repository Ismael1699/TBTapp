import style from './navbar.module.css';
import { useRouter } from 'next/navigation';
export default function NavbarOut() {
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
          className='button'
        >
          Login
        </button>
      </div>
    </div>
  );
}
