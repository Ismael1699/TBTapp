import style from './home.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default async function App() {
  return (
    <div className={style.home}>
      <p>Triturados Basálticos Tepetlaoxtoc</p>
      <div className={style.img}>
        <Image
          src='/IMG_0428.jpg'
          alt='criba'
          fill={true}
          priority={true}
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      </div>

      <button className='button'>
        <Link href='/application/compras'>Comenzar</Link>
      </button>
    </div>
  );
}
