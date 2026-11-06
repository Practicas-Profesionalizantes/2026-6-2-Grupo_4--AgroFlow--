const API_BASE_URL = 'http://localhost:8080/api';

export const actualizarEstadoAnimal = async (rfid, motivo, detalles, operarioId) => {
  // 1. Busca el animal
  const resAnimal = await fetch(`${API_BASE_URL}/animales/rfid/${rfid}`);
  if (!resAnimal.ok) throw new Error('No se encontró el animal con ese RFID.');
  const animal = await resAnimal.json();

  // 2. Registra el cambio/baja
  const urlBaja = `${API_BASE_URL}/bajas/registrar?operarioId=${operarioId}&motivo=${motivo}&detalles=${encodeURIComponent(detalles)}`;
  const resBaja = await fetch(urlBaja, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(animal)
  });

  if (!resBaja.ok) {
    const errorData = await resBaja.json();
    throw new Error(errorData.message || 'Error al actualizar el estado.');
  }
  return await resBaja.json();
};

export const asignarLoteAAnimal = async (rfid, loteObjeto, empleadoId) => {
  const resAnimal = await fetch(`http://localhost:8080/api/animales/rfid/${rfid}`);
  if (!resAnimal.ok) throw new Error('No se encontró el animal con ese RFID.');
  const animal = await resAnimal.json();

  const urlAsignar = `http://localhost:8080/api/animales/${animal.id}/asignar-lote?empleadoId=${empleadoId}`;
  const resAsignar = await fetch(urlAsignar, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loteObjeto)
  });

  if (!resAsignar.ok) throw new Error('Error al asignar el lote en el servidor.');
  return await resAsignar.json();
};

export const obtenerTodosLosLotes = async (usuarioId) => {
  const res = await fetch(`http://localhost:8080/api/agrupamientos?usuarioId=${usuarioId}`);
  if (!res.ok) throw new Error('Error al cargar la lista de lotes.');
  return await res.json();
};

export const registrarPesajeAnimal = async (rfid, peso, operarioId) => {
  // 1. Buscamos primero al animal por su RFID para obtener el objeto completo
  const resAnimal = await fetch(`http://localhost:8080/api/animales/rfid/${rfid}`);
  if (!resAnimal.ok) throw new Error('No se encontró el animal para registrar el pesaje.');
  const animal = await resAnimal.json();

  // 2. Registramos el pesaje pasándole el peso y el operario por parámetro, y el animal en el body
  const urlPesaje = `http://localhost:8080/api/pesajes/registrar?operarioId=${operarioId}&nuevoPeso=${peso}`;
  const resPesaje = await fetch(urlPesaje, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(animal)
  });

  if (!resPesaje.ok) throw new Error('Error al registrar el pesaje en la base de datos.');
  return await resPesaje.json();
};

export const obtenerViajesActivos = async (estado) => {
  const res = await fetch(`http://localhost:8080/api/distribucion/estado?estado=${estado}`);
  if (!res.ok) throw new Error('Error al obtener los camiones asignados.');
  return await res.json();
};

export const obtenerTodosLosAnimales = async () => {
  const res = await fetch('http://localhost:8080/api/animales');
  if (!res.ok) throw new Error('Error al cargar la lista general de animales.');
  return await res.json();
};

export const animalesService = {
  registrarAnimal: async (adminId, animalData) => {
    const res = await fetch(`${API_BASE_URL}/animales/crear?adminId=${adminId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(animalData)
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error al registrar el animal en el servidor.');
    }
    
    return await res.json();
  }
};