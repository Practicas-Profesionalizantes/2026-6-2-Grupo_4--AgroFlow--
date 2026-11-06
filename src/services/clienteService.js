import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const clienteService = {
  listarAnimales: async () => {
    const response = await axios.get(`${API_URL}/animales`);
    return response.data;
  },

  crearOferta: async (clienteId, precio, animal) => {
    const response = await axios.post(`${API_URL}/negociaciones/ofertar`, animal, {
      params: {
        clienteId: clienteId,
        precioDeslizador: precio
      }
    });
    return response.data;
  },

  obtenerResumenCliente: async (clienteId) => {
    const response = await axios.get(`${API_URL}/negociaciones/cliente/${clienteId}`);
    return response.data;
  }
};