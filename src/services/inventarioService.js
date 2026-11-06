import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const inventarioService = {
  obtenerLotes: async (usuarioId) => {
    const response = await axios.get(`${API_URL}/agrupamientos`, {
      params: { usuarioId }
    });
    return response.data;
  },

  obtenerAnimales: async () => {
    const response = await axios.get(`${API_URL}/animales`);
    return response.data;
  }
};