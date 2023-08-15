'use client';
import style from './addproveedor.module.css';
import { useState } from 'react';
import Slider from './Slider/Slider';
import Proveedor from '@/components/Compras/proveedor/AddProveedor/Proveedor/Proveedor';
import Bancarios from './Bancarios/Bancarios';
import Contacto from './Contacto/Contacto';

async function sendProveedor(data, method) {
  const res = await fetch('/api/compras/proveedores', {
    method: method,
    body: JSON.stringify(data),
  });
  return JSON.parse(await res.text());
}

const dataStruct = {
  name: '',
  rfc: '',
  direccion: '',
  banco: '',
  clabe: '',
  cuenta: '',
  telefono: '',
  correo: '',
  frente: '',
  contacto: '',
  factura: 0,
};

export default function AddProveedor({
  isEditing,
  cardSelected,
  setCardSelected,
  cancelarOnClick,
  session,
}) {
  const [dataProveedores, setDataProveedores] = useState(
    Object.entries(cardSelected).length === 0 ? dataStruct : cardSelected
  );
  const whatUser =
    session.user.rol === 'DIRECTOR' ||
    session.user.rol === 'SUPER-INTENDENTE' ||
    session.user.rol === 'CONTADOR' ||
    session.user.rol === 'SUPER-USER-ROOT';

  function inputsOnChange(e) {
    const item = e.target.id;
    const value = e.target.value;
    return setDataProveedores({ ...dataProveedores, [item]: value });
  }

  function dataSliderOnChange(data) {
    setDataProveedores({ ...dataProveedores, factura: data });
  }

  function checkCompleteInformation() {
    const arrayValuesDataProvedores = Object.values(dataProveedores);
    let allInfomationIs = false;
    arrayValuesDataProvedores.map((value) =>
      value === '' ? (allInfomationIs = false) : (allInfomationIs = true)
    );

    if (allInfomationIs) {
      if (isEditing) {
        return sendDataToDB(dataProveedores, 'PUT');
      }
      return sendDataToDB(dataProveedores, 'POST');
    }
    return alert('Por favor termina de completar los datos para ser enviados');
  }

  async function sendDataToDB(data, method) {
    const response = await sendProveedor(data, method);

    alert(response.message);
    setCardSelected({});
    cancelarOnClick();
  }

  return (
    <>
      <div className={style.container}>
        <div className={style.title}>
          <p>Agregar nuevo proveedor</p>
          <button
            className={style.cancelar}
            onClick={cancelarOnClick}
          >
            <i className='bi bi-x-circle-fill'></i>
          </button>
        </div>
        {/* <div className={style.proveedor}>
          <p className={style.subtitle}>Proveedor</p>
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
                {whatUser ? (
                  <option value='MAQUINARIA'>Maquinaria</option>
                ) : null}
                {whatUser ? (
                  <option value='MAQUINARIA'>Planeacion</option>
                ) : null}
              </select>
            </div>
          </form>
        </div> */}
        <Proveedor
          dataProveedores={dataProveedores}
          inputsOnChange={inputsOnChange}
          session={session}
          whatUser={whatUser}
        />

        {/* <div className={style.bancario}>
          <p className={style.subtitle}>Datos bancarios</p>
          <form>
            <div className={style.clabe}>
              <label
                className={style.labbel}
                htmlFor='clabe'
              >
                Clabe
              </label>
              <input
                type='text'
                id='clabe'
                value={dataProveedores.clabe}
                onChange={inputsOnChange}
              />
            </div>
            <div className={style.slidercontainer}>
              <Slider
                dataSliderOnChange={dataSliderOnChange}
                factura={dataProveedores.factura}
              />
            </div>
            <div className={style.banco}>
              <label htmlFor='banco'>Banco</label>
              <input
                type='text'
                id='banco'
                value={dataProveedores.banco}
                onChange={inputsOnChange}
              />
            </div>
            <div className={style.cuenta}>
              <label htmlFor='cuenta'>Cuenta</label>
              <input
                type='text'
                id='cuenta'
                value={dataProveedores.cuenta}
                onChange={inputsOnChange}
              />
            </div>
          </form>
        </div> */}

        <Bancarios
          dataProveedores={dataProveedores}
          inputsOnChange={inputsOnChange}
          dataSliderOnChange={dataSliderOnChange}
        />

        {/* <div className={style.contacto}>
          <p className={style.subtitle}>Contacto</p>
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
        </div> */}

        <Contacto
          dataProveedores={dataProveedores}
          inputsOnChange={inputsOnChange}
        />

        <div className={style.buttons}>
          {isEditing ? (
            <button
              className={style.button}
              onClick={checkCompleteInformation}
            >
              Editar
            </button>
          ) : (
            <button
              className={style.button}
              onClick={checkCompleteInformation}
            >
              Agregar
            </button>
          )}
        </div>
      </div>
      <div className={style.blur}></div>
    </>
  );
}
