'use client';
import style from './itemCard.module.css';

export default function ItemCard({ index, obj, itemDelete, editingRow }) {
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

  return (
    <div
      className={style.itemCard}
      id={obj.id}
    >
      <p className={style.title}>Articulo {index + 1}</p>
      <i
        className='bi bi-pencil-square'
        onClick={editingRow}
      ></i>
      <i
        className='bi bi-trash3-fill'
        onClick={itemDelete}
      ></i>
      <div className={style.container}>
        <p className={style.subtitle}>No. parte</p>
        <p className={style.valor}>{obj.noparte}</p>
      </div>
      <div className={style.container}>
        <p className={style.subtitle}>Unidad</p>
        <p className={style.valor}>{obj.unidad}</p>
      </div>
      <div className={style.container}>
        <p className={style.subtitle}>Cantidad</p>
        <p className={style.valor}>{obj.cantidad}</p>
      </div>
      <div className={style.container}>
        <p className={style.subtitle}>Unitario</p>
        <p className={style.valor}>{unitario}</p>
      </div>

      <div className={style.descripcion}>
        <p>Descripción</p>
        <p>{obj.descripcion}</p>
      </div>
      <div className={style.container}></div>
      <div className={style.container}>
        <p className={style.subtitle}>Precio</p>
        <p className={style.valorFinal}>{final}</p>
      </div>
    </div>
  );
}
