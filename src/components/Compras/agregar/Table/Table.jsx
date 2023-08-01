'use cliente';

import TableWeb from './TableWeb/TableWeb';
import TableMobile from './TableMobile/TableMobile';
import { useEffect, useState } from 'react';

export default function Table({
  items,
  setItems,
  centralizeData,
  isEditing,
  deleteRequisicion,
}) {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : ''
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', setSize);
      return () => window.removeEventListener('resize', setSize);
    }
  }, []);

  function setSize() {
    setWidth(window.innerWidth);
  }

  return width > 900 ? (
    <TableWeb
      items={items}
      setItems={setItems}
      centralizeData={centralizeData}
      isEditing={isEditing}
      deleteRequisicion={deleteRequisicion}
    />
  ) : (
    <TableMobile
      items={items}
      setItems={setItems}
      centralizeData={centralizeData}
      isEditing={isEditing}
      deleteRequisicion={deleteRequisicion}
    />
  );
}
