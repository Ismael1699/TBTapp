'use client';
import style from './SerchBar.module.css';
import { useState } from 'react';

export default function SerachBar({
  setterArrayDataFilter,
  setArrayDataFilter,
}) {
  const [search, setSearch] = useState('');

  function clear() {
    setSearch('');
    setArrayDataFilter('');
  }
  return (
    <div className={style.container}>
      <i
        className='bi bi-search'
        onClick={() => setterArrayDataFilter(search)}
      ></i>
      <input
        type='text'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) =>
          e.key === 'Enter' ? setterArrayDataFilter(e.target.value) : null
        }
      />
      <i
        className='bi bi-x-lg'
        onClick={clear}
      ></i>
    </div>
  );
}
