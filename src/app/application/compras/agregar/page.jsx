'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Table from '@/components/Compras/agregar/Table/Table';
import HeadInputs from '@/components/Compras/agregar/HeadInputs/HeadInputs';

const structHead = {
  proyecto: '',
  frente: '',
  suministro: '',
  fecha: '',
  lugar: '',
  proveedor: '',
  numero: '',
};

async function sendBackend(data) {
  return await fetch(`/api/compras`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export default function Agregar() {
  const [headData, setHeadData] = useState(structHead);
  const [dataProveedor, setDataProveedor] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [items, setItems] = useState([]);
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
      const data = { ...headData, table: items };
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
    <div>
      <HeadInputs
        headData={headData}
        setHeadData={setHeadData}
        isEditing={isEditing}
        setDataProveedor={setDataProveedor}
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
