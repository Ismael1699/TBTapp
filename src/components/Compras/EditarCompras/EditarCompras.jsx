'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import HeadInputs from '@/components/Compras/agregar/HeadInputs/HeadInputs';
import axios from 'axios';
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
  return await axios.put('/api/compras', data);
}

async function deleteCompra(id) {
  const res = await fetch(`/api/compras?id=${id}`, {
    method: 'DELETE',
  });
  return JSON.parse(await res.text());
}

export default function RequisicionDetails({
  params,
  compra,
  proveedor,
  proveedores,
  user,
}) {
  const [headData, setHeadData] = useState({
    ...compra,
    proveedor: proveedor.name,
  });
  const [dataProveedor, setDataProveedor] = useState(proveedor);
  const [isEditing, setIsEditing] = useState(true);
  const [items, setItems] = useState(compra.obj_table.table);
  const router = useRouter();

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
    if (res.status == 200) {
      const res1 = await res.data;
      alert(res1.message);
      router.push('/application/compras');
      router.refresh();
    } else {
      alert('Status: ' + res.status + ' ' + res.statusText);
    }
  }

  async function deleteRequisicion() {
    const isDelete = confirm(
      '¿Quiéres eleminar permanentemente esta requisición?'
    );
    if (isDelete) {
      const res = await deleteCompra(params.id);
      alert(res.message);
      router.push('/application/compras');
      router.refresh();
    }
  }
  return (
    <div className={style.container}>
      <HeadInputs
        headData={headData}
        setHeadData={setHeadData}
        isEditing={isEditing}
        setDataProveedor={setDataProveedor}
        dataProveedor={dataProveedor}
        proveedores={proveedores}
        user={user}
      />
      <Table
        items={items}
        setItems={setItems}
        centralizeData={centralizeData}
        deleteRequisicion={deleteRequisicion}
        isEditing={isEditing}
      />
    </div>
  );
}
