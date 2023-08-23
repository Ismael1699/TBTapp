import axios from 'axios';

async function getCompra(id) {
  const res = await axios(
    process.env.NEXT_PUBLIC_URL_HOST + `/api/compras/${id}`
    // 'http://localhost:3000/api/compras/53'
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

export default async function EditarCompra({ params }) {
  const compra = await getCompra(params.id);

  const proveedor = await getProveedor(compra.proveedor);
  return <div>hola mundo</div>;
}
