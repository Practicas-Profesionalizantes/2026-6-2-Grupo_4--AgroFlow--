import axios from 'axios';

const API_URL = 'http://localhost:8080/api/actividades';

// Trae todos los logs generales (Solo para Admin o Supervisor)
export const obtenerAuditoriaGeneral = async (usuarioConsultaId) => {
  const response = await axios.get(`${API_URL}/auditoria`, {
    params: { usuarioConsultaId }
  });
  return response.data;
};

export const obtenerAuditoriaDeUsuario = async (adminId, usuarioId) => {
  const response = await axios.get(`${API_URL}/usuario/${usuarioId}`, {
    params: { adminId }
  });
  return response.data;
};
