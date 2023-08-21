import style from '../addproveedor.module.css';

export default function Proveedor({
  dataProveedores,
  inputsOnChange,
  session,
  whatUser,
}) {
  return (
    <div className={style.proveedor}>
      <form>
        <div>
          <label
            className={style.labbel}
            htmlFor='name'
          >
            Nombre
          </label>
          <input
            type='text'
            id='name'
            value={dataProveedores.name}
            onChange={inputsOnChange}
          />
        </div>
        <div>
          <label
            htmlFor='rfc'
            className={style.labbel}
          >
            RFC
          </label>
          <input
            id='rfc'
            value={dataProveedores.rfc}
            onChange={inputsOnChange}
            type='text'
          />
        </div>
        <div>
          <label htmlFor='frente'>Frente</label>
          <select
            name='frente'
            id='frente'
            value={dataProveedores.frente}
            onChange={inputsOnChange}
          >
            <option
              value=''
              disabled
            >
              Elegir alguna
            </option>
            {session.user.rol === 'MAQUINARIA' ? (
              <option value='MAQUINARIA'>Maquinaria</option>
            ) : null}
            {session.user.rol === 'PLANEACION' ? (
              <option value='MAQUINARIA'>Planeacion</option>
            ) : null}
            {whatUser ? <option value='MAQUINARIA'>Maquinaria</option> : null}
            {whatUser ? <option value='PLANEACION'>Planeacion</option> : null}
          </select>
        </div>
      </form>
    </div>
  );
}
