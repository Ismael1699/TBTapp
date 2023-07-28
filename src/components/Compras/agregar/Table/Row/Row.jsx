import style from './row.module.css';

export default function Row({ index, obj, itemDelete, editingRow }) {
  const unitario =
    obj.unitario !== ''
      ? parseFloat(obj.unitario)
          .toLocaleString('en', {
            style: 'currency',
            currency: 'MXN',
          })
          .split('')
          .filter((item) => item !== 'M' && item !== 'X')
      : 'MX$0.0';
  const final =
    obj.final !== ''
      ? parseFloat(obj.final)
          .toLocaleString('en', {
            style: 'currency',
            currency: 'MXN',
          })
          .split('')
          .filter((item) => item !== 'M' && item !== 'X')
      : '$0.0';

  const isPar = (index + 1) % 2 == 0;

  return (
    <div
      id={obj.id}
      className={isPar ? style.rowPar : style.row}
    >
      <p>{index + 1}</p>
      <p>{obj.noparte}</p>
      <p>{obj.descripcion}</p>
      <p>{obj.unidad}</p>
      <p>{obj.cantidad}</p>
      <p>{unitario}</p>
      <p>{final}</p>
      <div
        className={style.modos}
        id={obj.id}
      >
        <i
          className='bi bi-x-lg'
          onClick={itemDelete}
        ></i>
        <i
          className='bi bi-pencil-square'
          onClick={editingRow}
        ></i>
      </div>
    </div>
  );
}
