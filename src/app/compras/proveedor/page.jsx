'use client';
import style from './proveedor.module.css';
import AddProveedor from './(AddProveedor)/AddProveedor';
import { useState } from 'react';
import CardProveedor from './(CardProveedor)/CardProveedor';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';

//consultas al backend
const getProveedores = (url) => fetch(`${url}`).then((res) => res.json());

async function deleteProveedorBackend(id) {
  const response = await fetch('/api/proveedores/deleteProveedor', {
    method: 'POST', //No es la manera correcta de hace run delete, para modificar esto se tendra que implementar rutas dinamicas
    body: JSON.stringify({ id }),
  });
  return JSON.parse(await response.text());
}

//Componente Provedores
export default function Proveedores() {
  const [agregarWasClicked, setAgregarWasClicked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [cardSelected, setCardSelected] = useState({});
  const { data, error, isLoading, mutate } = useSWR(
    '/api/proveedores',
    getProveedores
  );
  const proveedoresArray = data;
  const router = useRouter();

  //cancelar la ventan de agregar o editar proveeodores
  function cancelarOnClick() {
    setIsEditing(false);
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
    const id = e.target.parentElement.value;

    const elim = confirm('Deseas eleiminarlo');
    const newprovedores = proveedoresArray.filter((obj) => obj.id !== id);

    if (elim) {
      const res = await deleteProveedorBackend(id);
      mutate([newprovedores]);
      alert(res.message);
      router.refresh();
      router.push('/compras/proveedor');
    }
  }

  //controlan el sistema de carga de los datos hecho al servidor  el useSWR
  if (error) return 'An error has occurred.';
  if (isLoading) return 'Cargando..';

  return (
    <div className={style.container}>
      <div className={style.head}>
        <div className={style.title}>
          <p>Proveedores</p>
        </div>
        <div className={style.buttons}>
          <button
            className='button'
            onClick={agregarOnClick}
          >
            Agregar
          </button>
          <button className={style.filterButton}>Maquinaria</button>
          <button className={style.filterButton}>Terracerias</button>
          <button className={style.filterButton}>Administración</button>
        </div>
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
