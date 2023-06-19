'use client';
import style from './addproveedor.module.css';

export default function AddProveedor({ handleButtonProveedor }) {
  return (
    <>
      <div className={style.container}>
        <div className={style.title}>
          <p>Agregar nuevo proveedor</p>
        </div>
        <div className={style.form}>
          <div className={style.subtitle}>
            <p>Proveedor</p>
          </div>
          <div className={style.grupInputs}>
            <label htmlFor='proveedor'>Proveedor</label>
            <input
              name='proveedor'
              type='text'
            />
            <label htmlFor='rfc'>RFC</label>
            <input
              name='rfc'
              type='text'
            />
            <label htmlFor='direccion'>Dirección</label>
            <input type='text' />
          </div>
        </div>
        <div className={style.form}>
          <div className={style.subtitle}>
            <p>Datos Bancarios</p>
          </div>
          <div className={style.grupInputs}>
            <label htmlFor='banco'>Banco</label>
            <input
              name='banco'
              type='text'
            />
            <label htmlFor='clabe'>Clabe</label>
            <input type='text' />
            <label htmlFor='cuenta'>Cuenta</label>
            <input type='text' />
          </div>
        </div>
        <div className={style.form}>
          <div className={style.subtitle}>
            <p>Contacto</p>
          </div>
          <div className={style.grupInputs}>
            <label htmlFor='telefono'>Teléfono</label>
            <input
              name='telefono'
              type='text'
            />
            <label htmlFor='coreo'>Correo</label>
            <input
              name='correo'
              type='text'
            />
          </div>
        </div>
        <div className={style.buttons}>
          <button
            className={style.cancelar}
            onClick={handleButtonProveedor}
          >
            Cancelar
          </button>
          <button className={style.button}>Agregar</button>
        </div>
      </div>
      <div className={style.blur}></div>
    </>
  );
}
