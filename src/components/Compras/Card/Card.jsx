import Link from 'next/link';
import style from './card.module.css';
import DownloadButton from './DownloadButton/DownloadButton';
import SegmentBarStatus from './SegmentBarStatus/SegmentBarStatus';

const fechaname = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
];

export default async function Card({ obj }) {
  const arrayFrente = obj.frente.split('').map((item, index) => {
    if (index === 0) {
      return item;
    }
    return item.toLowerCase();
  });
  const frenteLowerCase = arrayFrente.join('');
  const arrayFecha = obj.fecha.split('-');

  const total = obj.obj_table.table.reduce((acumulador, obj) => {
    let floatnumber = parseFloat(parseFloat(obj.final).toFixed(2));
    return acumulador + floatnumber;
  }, 0);

  const totalconIVA = Number.parseFloat(total * 1.16).toFixed(2);

  return (
    <div className={style.card}>
      <div className={style.header}>
        <div className={style.downloadIcon}>
          <DownloadButton obj={obj} />
        </div>
        <div className={style.title}>
          <p className={style.orden}>Orden de compra {obj.numero}</p>
          <p className={style.fecha}>
            {arrayFecha[2]} de {fechaname[parseInt(arrayFecha[1], 10) - 1]} de{' '}
            {arrayFecha[0]}
          </p>
        </div>
        <div className={style.options}>
          <Link href={`/application/compras/${obj.id}`}>
            <i className='bi bi-three-dots'></i>
          </Link>
        </div>
      </div>
      <div className={style.body}>
        <div className={style.frente}>
          <p>{frenteLowerCase}</p>
          <p>{obj.proyecto}</p>
        </div>
        <p className={style.cantidad}>{obj.obj_table.table[0].cantidad}</p>
        <div className={style.descripcion}>
          {obj.obj_table.table[0].descripcion}
        </div>
        <p className={style.unitario}>
          {(
            parseFloat(obj.obj_table.table[0].unitario) *
            parseFloat(obj.obj_table.table[0].cantidad)
          )
            .toLocaleString('en', {
              style: 'currency',
              currency: 'MXN',
            })
            .split('')
            .filter((item) => item !== 'M' && item !== 'X')
            .join('')}
        </p>
        <div className={style.more1}>
          <i className='bi bi-three-dots'></i>
        </div>
        <div className={style.more2}>
          <i className='bi bi-three-dots'></i>
        </div>
        <p className={style.total}>
          {parseFloat(totalconIVA)
            .toLocaleString('en', {
              style: 'currency',
              currency: 'MXN',
            })
            .split('')
            .filter((item) => item !== 'M' && item !== 'X')
            .join('')}
        </p>
      </div>
      <div className={style.status}>
        <SegmentBarStatus formSegment='initial' />
        <SegmentBarStatus formSegment='center' />
        <SegmentBarStatus formSegment='center' />
        <SegmentBarStatus formSegment='final' />
      </div>
    </div>
  );
}
