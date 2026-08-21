import axios from 'axios';

const API_URL = 'http://localhost:8080/api/usuarios';

export const loginUsuario = async (email, contrasena) => {
  const response = await axios.post(`${API_URL}/login`, { email, contrasena });
  return response.data;
};

export const registrarUsuario = async (datosUsuario, adminId) => {
  const response = await axios.post(`${API_URL}/gestionar`, datosUsuario, {
    params: { adminId: adminId }
  });
  return response.data;
};

export const logoutUsuario = () => {
  localStorage.removeItem('usuario');
  localStorage.removeItem('token'); 
  localStorage.clear(); 
};

export const solicitarCodigoRecuperacion = async (email) => {
  const response = await axios.post(`${API_URL}/solicitar-codigo`, null, {
    params: { email }
  });
  return response.data;
};

export const confirmarRecuperacion = async (email, codigo, nuevaContrasena) => {
  const response = await axios.post(`${API_URL}/confirmar-recuperacion`, null, {
    params: { email, codigo, nuevaContrasena }
  });
  return response.data;
};