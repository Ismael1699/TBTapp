'use client';
import axios from 'axios';
import style from './generateCards.module.css';
import { useSession } from 'next-auth/react';
import Card from '../Card/Card';
import useSWR from 'swr';
import SerachBar from '../SearchBar/SerchBar';
import { useEffect, useState } from 'react';
import searchMatch from '@/utils/searchMatch';

async function getProveedores(url) {
  const res = await axios(url);
  return res.data.data;
}

export default function GenerateCards() {
  const [arrayDataFilter, setArrayDataFilter] = useState('');
  const { data: session, status, update } = useSession();
  const {
    data: proveedoresData,
    error,
    isLoading,
    mutate,
  } = useSWR(`/api/compras?rol=${session?.user.rol}`, getProveedores);

  function setterArrayDataFilter(value) {
    value
      ? setArrayDataFilter(
          searchMatch(proveedoresData, value, ['numero', 'proyecto'])
        )
      : null;
  }

  function renderCards() {
    if (arrayDataFilter === '') {
      return proveedoresData?.map((obj, index) => (
        <Card
          obj={obj}
          key={index}
        />
      ));
    }

    if (arrayDataFilter.length === 0) {
      return (
        <p className={style.noCoincidencia}>No se encontro coincidencias</p>
      );
    }

    return arrayDataFilter?.map((obj, index) => (
      <Card
        obj={obj}
        key={index}
      />
    ));
  }

  return (
    <div className={style.container}>
      <div className={style.filtrosContainer}>
        <div className={style.searchContainer}>
          <SerachBar
            setterArrayDataFilter={setterArrayDataFilter}
            setArrayDataFilter={setArrayDataFilter}
          />
        </div>
      </div>
      <div className={style.cardsContainer}>{renderCards()}</div>
    </div>
  );
}
