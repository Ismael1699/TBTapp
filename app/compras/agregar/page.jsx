import style from './agregar.module.css';

export default function Agregar() {
  return (
    <div>
      <h3>Proyecto</h3>
      <select name='proyecto'>
        <option value='2103'>2103 SCT Pachuca</option>
      </select>

      <h3>Frente</h3>
      <select name='frente'>
        <option value='terracerias'>Terracerias</option>
        <option value='maquinaria'>Maquinaria</option>
        <option value='administracion'>Administración</option>
      </select>

      <h3>Grupo de suministro</h3>
      <select name='grupo de suministro'>
        <option value='materiales de construccion'>
          Materiales de construcción
        </option>
        <option value='refacciones'>Refacciones</option>
        <option value='combustibles y aceites'>Combustible y aceites</option>
        <option value='resguardo consumo'>Resguardo cosumo</option>
        <option value='equipo auxiliar'>Equipo auxiliar</option>
        <option value='papeleria'>papeleria</option>
        <option value='Otros'>Otros</option>
      </select>

      <h3>Fecha</h3>
      <input type='date'></input>

      <h3>Lugar de compra</h3>
      <select name='lugar de compra'>
        <option value='local'>Compra local</option>
        <option value='regional'>Compra regional</option>
        <option value='nacional'>Compra nacional</option>
      </select>

      <h3>Provedor</h3>
      <select name='proverdores'>
        <option value='provedor1'>Provedor 1</option>
        <option value='provedor2'>Provedor 2</option>
      </select>

      <table className={style.table}>
        <tr>
          <th>partida</th>
          <th>No parte</th>
          <th>Descripción</th>
          <th>Unidad</th>
          <th>Cantidad</th>
          <th>Precio Unitario</th>
          <th>Precio Final</th>
        </tr>
      </table>
    </div>
  );
}
