'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Table from '@/components/Compras/agregar/Table/Table';
import HeadInputs from '@/components/Compras/agregar/HeadInputs/HeadInputs';
import axios from 'axios';

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
  // return await fetch(`/api/conectionDB`, {
  //   method: 'PUT',
  //   body: JSON.stringify(data),
  // });
  return await axios.put('/api/compras', data);
}

async function getDataCompra(id) {
  const res = await fetch(`/api/compras/getCompra?id=${id}`);
  return JSON.parse(await res.text());
}

async function deleteCompra(id) {
  const res = await fetch(`/api/compras?id=${id}`, {
    method: 'DELETE',
  });
  return JSON.parse(await res.text());
}

export default function RequisicionDetails({ params }) {
  const [headData, setHeadData] = useState(structHead);
  const [dataProveedor, setDataProveedor] = useState({});
  const [isEditing, setIsEditing] = useState(true);
  const [items, setItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function dataCompra() {
      const res = await getDataCompra(params.id);
      setHeadData(res);
      setItems(res.obj_table.table);
    }
    dataCompra();
  }, [params.id]);

  function centralizeData() {
    let rowContentData = false;

    if (items.length === 0) {
      rowContentData = false;
    } else {
      items.map((obj) => {
        const valuesObj = Object.values(obj);
        valuesObj.map((values) =>
          values === '' ? (rowContentData = false) : (rowContentData = true)
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
    if (res.statusText == 'OK') {
      const res1 = await res.data;
      alert(res1.message);
      router.push('/application/compras');
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
        deleteRequisicion={deleteRequisicion}
        isEditing={isEditing}
      />
    </div>
  );
}
