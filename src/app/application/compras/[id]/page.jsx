import axios from 'axios';
import EditarCompra from '@/components/Compras/EditarCompras/EditarCompras';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

async function getCompra(id) {
  const res = await axios(
    process.env.NEXT_PUBLIC_URL_HOST + `/api/compras/${id}`
  );
  return res.data;
}

async function getProveedor(proveedor) {
  const res = await axios(
    process.env.NEXT_PUBLIC_URL_HOST +
      `/api/compras/proveedores/getProveedor?name=${proveedor}`
  );
  return res.data;
}

async function getProveedores(rol) {
  const res = await axios(
    process.env.NEXT_PUBLIC_URL_HOST + `/api/compras/proveedores?rol=${rol}`
  );
  return res.data;
}

export default async function CompraDetails({ params }) {
  const session = await getServerSession(authOptions);
  const compra = await getCompra(params.id);
  const proveedor = await getProveedor(compra.proveedor);
  const proveedores = await getProveedores(session.user.rol);
  return (
    <EditarCompra
      params={params}
      compra={compra}
      proveedor={proveedor}
      proveedores={proveedores}
      user={session.user}
    />
  );
}
