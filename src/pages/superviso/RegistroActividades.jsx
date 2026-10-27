import React, { useState } from 'react';
import { 
  Activity, 
  Search, 
  User, 
  Clock, 
  Calendar, 
  ShieldCheck 
} from 'lucide-react';
import '../../styles/RegistroActividades.css';

const RegistroActividades = () => {
  const [busqueda, setBusqueda] = useState('');

  // Datos simulados basados en la tabla `actividades` de la BD
  const [logs, setLogs] = useState([
    { id: 1, usuario: 'Martín Rivas (Operario)', accion: 'Registró animal #AR-4892 en Lote L-204', fecha: '24/10/2024 - 16:10 hs' },
    { id: 2, usuario: 'Martín Rivas (Operario)', accion: 'Actualizó estado de animal #AR-4876 a Enfermo', fecha: '24/10/2024 - 15:54 hs' },
    { id: 3, usuario: 'Juan Pérez (Operario)', accion: 'Confirmó carga de animal #AR-4842 en Camión AB123CD', fecha: '24/10/2024 - 15:20 hs' },
    { id: 4, usuario: 'Martín Rivas (Operario)', accion: 'Registró animal #AR-4835 en Lote L-204', fecha: '24/10/2024 - 15:05 hs' },
    { id: 5, usuario: 'Juan Pérez (Operario)', accion: 'Inició sesión en el sistema', fecha: '24/10/2024 - 13:00 hs' },
  ]);

  const logsFiltrados = logs.filter(log => 
    log.usuario.toLowerCase().includes(busqueda.toLowerCase()) ||
    log.accion.toLowerCase().includes(busqueda.toLowerCase())
  );

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
                {logsFiltrados.map((log) => (
                  <tr key={log.id}>
                    <td className="ra-td-id">#LOG-{100 + log.id}</td>
                    <td>
                      <span className="ra-user-badge">
                        <User className="ra-icon-xs" /> {log.usuario}
                      </span>
                    </td>
                    <td><strong>{log.accion}</strong></td>
                    <td className="text-right ra-td-date">
                      <Clock className="ra-icon-xs" /> {log.fecha}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RegistroActividades;