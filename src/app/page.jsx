import style from './home.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default async function App() {
  return (
    <div className={style.home}>
      <p>Triturados Basálticos Tepetlaoxtoc</p>

      {/* <p>
        En TBT, hemos diseñado una app poderosa y versátil para simplificar y
        optimizar la gestión de nuestos proyectos. Nuestra app está
        especialmente diseñada para proyectos en la rama de la construcción y
        mantenimiento de carreteras, adaptando nuestros procesos a la era
        digital.
      </p> */}
      <button className={style.button}>
        <Link href='/application/compras'>Comenzar</Link>
      </button>
    </div>
  );
}
