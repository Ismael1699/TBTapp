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
    </div>
  );
}
