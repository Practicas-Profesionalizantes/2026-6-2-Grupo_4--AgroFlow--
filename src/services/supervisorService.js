import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const supervisorService = {
  obtenerActividades: async (usuarioConsultaId) => {
    const response = await axios.get(`${API_URL}/actividades/auditoria`, {
      params: { usuarioConsultaId }
    });
    return response.data;
  },

  obtenerAnimales: async () => {
    const response = await axios.get(`${API_URL}/animales`);
    return response.data;
  },

  obtenerLotes: async (usuarioId) => {
    const response = await axios.get(`${API_URL}/agrupamientos`, {
      params: { usuarioId }
    });
    return response.data;
  },

  // Obtener historial o negociaciones por animal (o puedes crear un endpoint general si prefieres)
  obtenerNegociacionesAnimal: async (animalId) => {
    const response = await axios.get(`${API_URL}/negociaciones/animal/${animalId}`);
    return response.data;
  },

  // Responder a la oferta (Aceptar / Rechazar)
  responderOferta: async (idNegociacion, supervisorId, nuevoEstado) => {
    const response = await axios.put(`${API_URL}/negociaciones/responder/${idNegociacion}`, null, {
      params: {
        empleadoId: supervisorId,
        nuevoEstado: nuevoEstado
      }
    });
    return response.data;
  }
};