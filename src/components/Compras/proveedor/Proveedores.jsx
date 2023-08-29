'use client';
import style from './proveedores.module.css';
import AddProveedor from '@/components/Compras/proveedor/AddProveedor/AddProveedor';
import { useEffect, useState } from 'react';
import CardProveedor from '@/components/Compras/proveedor/CardProveedor/CardProveedor';
import { useRouter } from 'next/navigation';
import axios from 'axios';

async function deleteProveedorBackend(id) {
  const response = await fetch('/api/compras/proveedores/deleteProveedor', {
    method: 'POST', //No es la manera correcta de hace run delete, para modificar esto se tendra que implementar rutas dinamicas
    body: JSON.stringify({ id }),
  });
  return JSON.parse(await response.text());
}

async function deleteFiles(key) {
  const res = await axios.delete(
    `/api/compras/proveedores/documents?key=${key}`
  );
  return res.data;
}

//Componente Provedores
export default function Proveedores({ provedores, session }) {
  const [agregarWasClicked, setAgregarWasClicked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [cardSelected, setCardSelected] = useState({});
  const [proveedoresArray, setProveedoresArray] = useState(provedores);
  const router = useRouter();

  useEffect(() => setProveedoresArray(provedores), [provedores]);

  //cancelar la ventan de agregar o editar proveeodores
  function cancelarOnClick() {
    setIsEditing(false);
    setCardSelected({});
    return agregarOnClick();
  }

  //controaldor de abrir y cerrar la venta de proveedores
  function agregarOnClick() {
    return setAgregarWasClicked(!agregarWasClicked);
  }

  // controla que tarjeta va a ser editado, sus datos se guardan en cardSelected
  function editingProveedor(e) {
    const id = e.target.parentElement.value;
    const itemMatch = proveedoresArray.filter((obj) => obj.id + '' === id);
    setCardSelected(itemMatch[0]);
    setIsEditing(true);
    return setAgregarWasClicked(true);
  }

  // Control para eleminar del fronted y del backend la card selecionada
  async function deleteCard(e) {
    const id = parseInt(e.target.parentElement.value);

    let dataProveedorElim = '';
    const newprovedores = proveedoresArray.filter((obj) => {
      obj.id === id ? (dataProveedorElim = obj) : null;
      return obj.id !== id;
    });
    console.log(dataProveedorElim);
    const elim = confirm('Deseas eleiminarlo');
    if (elim) {
      const preKey = `compras/proveedores/${dataProveedorElim.frente.toLowerCase()}/${dataProveedorElim.name
        .split(' ')
        .join('_')}/`;

      deleteFiles(preKey + 'bancario.pdf');
      deleteFiles(preKey + 'constancia.pdf');
      const res = await deleteProveedorBackend(id);
      setProveedoresArray(newprovedores);
      alert(res.message);
    }
  }

  function updateCache(data) {
    const proveedoresArrayCopy = structuredClone(proveedoresArray);

    let indice = proveedoresArrayCopy.findIndex(
      (objeto) => objeto.id === data.id
    );

    if (indice !== -1) {
      proveedoresArrayCopy.splice(indice, 1, data);

      return setProveedoresArray(proveedoresArrayCopy);
    }
    router.replace('/application/compras/proveedor');
    router.refresh();
  }

  return (
    <div className={style.container}>
      <div className={style.head}>
        <button
          className={style.agregar}
          onClick={agregarOnClick}
        >
          <i className='bi bi-plus-lg'></i>
        </button>
      </div>
      <div className={style.body}>
        {agregarWasClicked ? (
          <AddProveedor
            agregarOnClick={agregarOnClick}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            cardSelected={cardSelected}
            setCardSelected={setCardSelected}
            cancelarOnClick={cancelarOnClick}
            session={session}
            updateCache={updateCache}
          />
        ) : (
          <></>
        )}
        {proveedoresArray.map((obj, index) => {
          return (
            <CardProveedor
              obj={obj}
              index={index}
              key={index}
              editingProveedor={editingProveedor}
              deleteCard={deleteCard}
            />
          );
        })}
      </div>
    </div>
  );
}
