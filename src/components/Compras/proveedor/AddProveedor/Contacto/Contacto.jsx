import style from '../addproveedor.module.css';

export default function Contacto({ dataProveedores, inputsOnChange }) {
  return (
    <div className={style.contacto}>
      <form>
        <div className={style.nombrecontacto}>
          <label
            className={style.labbel}
            htmlFor='contacto'
          >
            Nombre
          </label>
          <input
            type='text'
            id='contacto'
            value={dataProveedores.contacto}
            onChange={inputsOnChange}
          />
        </div>
        <div className={style.direccion}>
          <label
            className={style.labbel}
            htmlFor='direccion'
          >
            Dirección
          </label>
          <input
            type='text'
            id='direccion'
            value={dataProveedores.direccion}
            onChange={inputsOnChange}
          />
        </div>
        <div className={style.correo}>
          <label
            className={style.labbel}
            htmlFor='correo'
          >
            Correo
          </label>
          <input
            type='text'
            id='correo'
            value={dataProveedores.correo}
            onChange={inputsOnChange}
          />
        </div>
        <div className={style.telefono}>
          <label
            className={style.labbel}
            htmlFor='telefono'
          >
            telefono
          </label>
          <input
            type='text'
            id='telefono'
            value={dataProveedores.telefono}
            onChange={inputsOnChange}
          />
        </div>
      </form>
    </div>
  );
}
