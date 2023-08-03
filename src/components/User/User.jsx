'use client';

import style from './User.module.css';
import { useSession } from 'next-auth/react';

const moth = {
  '01': 'enero',
  '02': 'febrero',
  '03': 'marzo',
  '04': 'abril',
  '05': 'mayo',
  '06': 'junio',
  '07': 'julio',
  '08': 'agosto',
  '09': 'septiembre',
  10: 'obtubre',
  11: 'noviembre',
  12: 'diciembre',
};

export default function User() {
  const { data: session, status, update } = useSession();

  const date = session.expires.split('T')[0].split('-');

  const dateLetter =
    date[2][0] === '0'
      ? date[2][1] + ' de ' + moth[date[1]] + ' de ' + date[0]
      : date[2] + ' de ' + moth[date[1]] + ' de ' + date[0];
  return (
    <div className={style.container}>
      <div className={style.user}>
        <i className='bi bi-person-fill'></i>
      </div>
      <p className={style.name}>{session.user.user}</p>
      <p className={style.rol}>{session.user.rol}</p>
      <p className={style.session}>Tu session expira el: {dateLetter}</p>
    </div>
  );
}
