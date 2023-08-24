import AgregarCompra from '@/components/Compras/agregar/AgregarCompra';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import axios from 'axios';

async function getProveedores(rol) {
  const res = await axios(
    process.env.NEXT_PUBLIC_URL_HOST + `/api/compras/proveedores?rol=${rol}`
  );
  return res.data;
}

export default async function Agregar() {
  const session = await getServerSession(authOptions);
  const proveedores = await getProveedores(session.user.rol);
  return (
    <AgregarCompra
      proveedores={proveedores}
      user={session.user}
    />
  );
}
