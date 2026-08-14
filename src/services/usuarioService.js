import axios from 'axios';

const API_URL = 'http://localhost:8080/api/usuarios';

export const loginUsuario = async (email, contrasena) => {
  const response = await axios.post(`${API_URL}/login`, { email, contrasena });
  return response.data;
};
