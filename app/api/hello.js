export default function createExcel(req, res) {
  if (req.method === 'GET') {
    // Lógica para la solicitud GET
    const data = { message: 'Hola desde la API' };
    res.status(200).json(data);
  } else if (req.method === 'POST') {
    // Lógica para la solicitud POST
    // ...
  } else {
    // Manejar otros métodos de solicitud
    res.status(404).send('Recurso no encontrado');
  }
}
