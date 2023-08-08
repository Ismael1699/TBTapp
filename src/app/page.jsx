import style from './home.module.css';
import Link from 'next/link';

export default async function App() {
  return (
    <div className={style.home}>
      <p>Triturados Basálticos Tepetlaoxtoc</p>
      <button className={style.button}>
        <Link href='/application'>Comenzar</Link>
      </button>
    </div>
  );
}
