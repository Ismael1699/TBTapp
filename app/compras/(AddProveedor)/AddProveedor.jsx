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
              id='proveedor'
              name='proveedor'
              type='text'
            />
            <label htmlFor='rfc'>RFC</label>
            <input
              id='rfc'
              name='rfc'
              type='text'
            />
            <label htmlFor='direccion'>Dirección</label>
            <input
              id='direccion'
              name='direccion'
              type='text'
            />
          </div>
        </div>
        <div className={style.form}>
          <div className={style.subtitle}>
            <p>Datos Bancarios</p>
          </div>
          <div className={style.grupInputs}>
            <label htmlFor='banco'>Banco</label>
            <input
              id='banco'
              name='banco'
              type='text'
            />
            <label htmlFor='clabe'>Clabe</label>
            <input
              id='clabe'
              name='clabe'
              type='text'
            />
            <label htmlFor='cuenta'>Cuenta</label>
            <input
              id='cuenta'
              name='cuenta'
              type='text'
            />
          </div>
        </div>
        <div className={style.form}>
          <div className={style.subtitle}>
            <p>Contacto</p>
          </div>
          <div className={style.grupInputs}>
            <label htmlFor='telefono'>Teléfono</label>
            <input
              id='telefono'
              name='telefono'
              type='text'
            />
            <label htmlFor='correo'>Correo</label>
            <input
              id='correo'
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
