import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/distribucion';

export const programarViajeDistribucion = async (datosViaje) => {
  // El backend recibe los datos como RequestParam, por lo que usamos 'params' en axios
  const response = await axios.post(`${API_BASE_URL}/despachar`, null, {
    params: {
      operarioId: datosViaje.operarioId, // Se puede pasar el mismo ID del supervisor o un operario asignado
      supervisorId: datosViaje.supervisorId,
      conductor: datosViaje.conductorNombre,
      documento: datosViaje.conductorDocumento,
      patenteCamion: datosViaje.patenteCamion,
      patenteAcoplado: datosViaje.patenteAcoplado,
      ruta: datosViaje.rutaAsignada,
      coordenadasGps: datosViaje.coordenadasGps || '0,0' // Valor por defecto si no se ingresa GPS inicial
    }
  });
  return response.data;
};
