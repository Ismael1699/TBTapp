import Slider from '../Slider/Slider';
import style from '../addproveedor.module.css';
export default function Bancarios({
  dataProveedores,
  inputsOnChange,
  dataSliderOnChange,
}) {
  return (
    <div className={style.bancario}>
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
    </div>
  );
}
