import Proveedores from '@/components/Compras/proveedor/Proveedores';
import style from './proveedor.module.css';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import axios from 'axios';

async function getProveedores(rol) {
  const res = await axios(
    process.env.NEXT_PUBLIC_URL_HOST + `/api/compras/proveedores?rol=${rol}`
  );
  return res.data;
}

export default async function ProvedoresPage() {
  const session = await getServerSession(authOptions);
  const proveedores = await getProveedores(session.user.rol);
  return (
    <div className={style.container}>
      <div className={style.title}>
        <p>Proveedores</p>
      </div>
      <Proveedores
        provedores={proveedores}
        session={session}
      />
    </div>
  );
}
