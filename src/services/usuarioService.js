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

export const cambiarContrasenaDirecto = async (email, nuevaContrasena) => {
  const response = await axios.post(`${API_URL}/restablecer-password`, {
    email,
    nuevaContrasena
  });
  return response.data;
};