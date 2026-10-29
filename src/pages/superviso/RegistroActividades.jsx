import React, { useState, useEffect } from 'react';
import {
  Activity,
  Search,
  User,
  Clock,
  Calendar,
  ShieldCheck
} from 'lucide-react';
import '../../styles/RegistroActividades.css';
import { obtenerAuditoriaGeneral } from '../../services/actividadesService';

const RegistroActividades = () => {
  const [busqueda, setBusqueda] = useState('');
  const [logs, setLogs] = useState([]);
  const [cargando, setCargando] = useState(true);

  const usuarioLogueado = JSON.parse(localStorage.getItem('usuario'));
  const OPERARIO_ID = usuarioLogueado?.id;

  useEffect(() => {
    if (!OPERARIO_ID) {
      setCargando(false);
      return;
    }

    // Usamos parseInt para asegurarnos de extraer SOLO el número limpio (ej: transformará "6:1" o 6 en 6)
    const idLimpio = parseInt(OPERARIO_ID, 10);
    if (isNaN(idLimpio)) {
      setCargando(false);
      return;
    }

    obtenerAuditoriaGeneral(idLimpio)
      .then(data => {
        setLogs(data);
        setCargando(false);
      })
      .catch(err => {
        console.error("Error al cargar la auditoría general:", err);
        setCargando(false);
      });
  }, [OPERARIO_ID]);

  const logsFiltrados = logs.filter(log => {
    // 1. Verificamos que el usuario que hizo la acción tenga el rol de "Operario"
    const esUnOperario = log.usuario?.rol?.toLowerCase() === 'operario';

    // 2. Mantenemos el filtro de la barra de búsqueda por texto
    const accion = log.accionDescription || '';
    const coincideBusqueda = accion.toLowerCase().includes(busqueda.toLowerCase());

    return esUnOperario && coincideBusqueda;
  });


  return (
    <div className="ra-container">
      <div className="ra-wrapper">

        {/* ENCABEZADO */}
        <div className="ra-header">
          <div>
            <h2 className="ra-title">Registro de Actividades</h2>
            <h3 className="ra-subtitle">Auditoría en tiempo real de las acciones realizadas por los operarios</h3>
          </div>
          <div className="ra-badge-total">
            <ShieldCheck className="ra-icon-sm" /> Auditoría Activa
          </div>
        </div>

        {/* BARRA DE BÚSQUEDA */}
        <div className="ra-toolbar">
          <div className="ra-search-container">
            <Search className="ra-search-icon" />
            <input
              type="text"
              placeholder="Buscar por operario o acción..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="ra-search-input"
            />
          </div>
        </div>

        {/* TABLA DE LOGS */}
        <div className="ra-card">
          <div className="ra-table-responsive">
            <table className="ra-table">
              <thead>
                <tr>
                  <th>ID Log</th>
                  <th>Operario (Usuario)</th>
                  <th>Acción Registrada</th>
                  <th className="text-right">Fecha y Hora</th>
                </tr>
              </thead>
              <tbody>
                {!OPERARIO_ID ? (
                  <tr>
                    <td colSpan="4" className="text-center" style={{ color: 'red', fontWeight: 'bold' }}>
                      ⚠️ Debe iniciar sesión para ver sus actividades.
                    </td>
                  </tr>
                ) : cargando ? (
                  <tr>
                    <td colSpan="4" className="text-center">Cargando registros desde el servidor...</td>
                  </tr>
                ) : logsFiltrados.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center">No se encontraron actividades.</td>
                  </tr>
                ) : (
                  logsFiltrados.map((log) => (
                    <tr key={log.id}>
                      <td className="ra-td-id">#LOG-{100 + log.id}</td>
                      <td>
                        <span className="ra-user-badge">
                          <User className="ra-icon-xs" /> {log.usuario?.nombre} ({log.usuario?.rol})
                        </span>
                      </td>
                      <td><strong>{log.accion}</strong></td>
                      <td className="text-right ra-td-date">
                        {/* Como tu base de datos genera la fecha en el backend, usamos un valor por defecto si no viniera */}
                        <Clock className="ra-icon-xs" /> {log.fecha || 'Reciente'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RegistroActividades;
