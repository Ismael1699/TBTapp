'use client';

import style from './generateCards.module.css';

import Card from '../Card/Card';

import SerachBar from '../SearchBar/SerchBar';
import { useState } from 'react';
import searchMatch from '@/utils/searchMatch';

export default function GenerateCards({ compras }) {
  const [arrayDataFilter, setArrayDataFilter] = useState('');
  const [proveedoresData, setProveedoresData] = useState(compras);

  function setterArrayDataFilter(value) {
    value
      ? setArrayDataFilter(
          searchMatch(proveedoresData, value, ['numero', 'proyecto'])
        )
      : null;
  }

  function renderCards() {
    if (arrayDataFilter === '') {
      return proveedoresData.map((obj, index) => (
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
