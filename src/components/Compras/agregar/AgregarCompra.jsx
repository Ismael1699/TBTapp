'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import HeadInputs from '@/components/Compras/agregar/HeadInputs/HeadInputs';
import dynamic from 'next/dynamic';
import style from './agregarCompra.module.css';

const Table = dynamic(
  () => import('@/components/Compras/agregar/Table/Table'),
  { ssr: false }
);

const structHead = {
  proyecto: '',
  frente: '',
  suministro: '',
  fecha: '',
  lugar: '',
  proveedor: '',
  ISR: '0',
  numero: '',
};

async function sendBackend(data) {
  return await fetch(`/api/compras`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export default function AgregarCompra({ proveedores, user }) {
  const [headData, setHeadData] = useState(structHead);
  const [dataProveedor, setDataProveedor] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [items, setItems] = useState([]);
  const router = useRouter();
  console.log(headData);

  function centralizeData() {
    let rowContentData = false;

    if (items.length === 0) {
      rowContentData = false;
    } else {
      items.map((obj) => {
        const valuesObj = Object.values(obj);
        valuesObj.map((values) =>
          values === '' || values === 0 || values === '0'
            ? (rowContentData = false)
            : (rowContentData = true)
        );
      });
    }
    const value = Object.values(headData);
    let headContentData = true;
    value.map((item) =>
      item === '' ? (headContentData = false) : (headContentData = true)
    );

    if (rowContentData && headContentData) {
      const precioTotal = parseFloat(
        items.reduce((acumulador, obj) => {
          return acumulador + parseFloat(parseFloat(obj.final).toFixed(2));
        }, 0)
      ).toFixed(2);

      const precioFinal =
        dataProveedor.factura === 1
          ? parseFloat(precioTotal * 1.16).toFixed(2)
          : precioTotal;

      const data = { ...headData, precio: precioFinal, table: items };
      return saveData(data);
    } else {
      alert('Por favor terminina de llenar los datos');
    }
  }

  async function saveData(data) {
    const res = await sendBackend(data);

    if (res.ok) {
      const res1 = JSON.parse(await res.text());
      alert(res1.message);
      router.push('/application/compras');
    } else {
      alert('Status: ' + res.status + ' ' + res.statusText);
    }
  }

  return (
    <div className={style.container}>
      <HeadInputs
        headData={headData}
        setHeadData={setHeadData}
        isEditing={isEditing}
        setDataProveedor={setDataProveedor}
        proveedores={proveedores}
        user={user}
      />
      <Table
        items={items}
        setItems={setItems}
        centralizeData={centralizeData}
        isEditing={isEditing}
      />
    </div>
  );
}
