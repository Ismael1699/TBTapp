'use cliente';

import TableWeb from './TableWeb/TableWeb';
import TableMobile from './TableMobile/TableMobile';
import { useState } from 'react';

export default function Table({
  items,
  setItems,
  centralizeData,
  isEditing,
  deleteRequisicion,
}) {
  const [withScreen, setWithScreen] = useState(899);

  return withScreen > 900 ? (
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
