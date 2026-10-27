import React from 'react';
import { 
  Users, 
  Boxes, 
  Truck, 
  ShieldCheck, 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle, 
  History 
} from 'lucide-react';
import '../../styles/PanelAdmin.css';

const PanelAdmin = () => {
  // Datos de resumen general para el Administrador
  const estadisticas = [
    { titulo: 'Usuarios Totales', valor: '4', descripcion: '1 Admin, 1 Supervisor, 2 Operarios', icono: <Users className="pa-stat-icon" />, color: 'primary' },
    { titulo: 'Stock en Predio', valor: '55', descripcion: 'Cabezas activas distribuidas en lotes', icono: <Boxes className="pa-stat-icon" />, color: 'success' },
    { titulo: 'Camiones en Tránsito', valor: '2', descripcion: 'Operaciones logísticas activas', icono: <Truck className="pa-stat-icon" />, color: 'warning' },
    { titulo: 'Certificaciones', valor: '1 Pendiente', descripcion: 'Guías DTE / Sanitarias a fiscalizar', icono: <ShieldCheck className="pa-stat-icon" />, color: 'danger' }
  ];

  const ultimasActividades = [
    { operario: 'Martín Rivas', accion: 'Registró animal #AR-4892 en Lote L-204', fecha: '24/10/2024 - 16:10 hs' },
    { operario: 'Juan Pérez', accion: 'Cargó animal #AR-4842 en Camión AB123CD', fecha: '24/10/2024 - 15:20 hs' },
  ];

  return (
    <div className="pa-container">
      <div className="pa-wrapper">
        
        {/* ENCABEZADO */}
        <div className="pa-header">
          <div>
            <h2 className="pa-title">Panel de Administración General</h2>
            <h3 className="pa-subtitle">Centro de control ejecutivo y visión global de la plataforma AgroFlow</h3>
          </div>
          <div className="pa-badge-live">
            <TrendingUp className="pa-icon-xs" /> Sistema Operativo Activo
          </div>
        </div>

        {/* TARJETAS DE MÉTRICAS */}
        <div className="pa-stats-grid">
          {estadisticas.map((stat, idx) => (
            <div key={idx} className={`pa-stat-card ${stat.color}`}>
              <div className="pa-stat-header">
                <span className="pa-stat-title">{stat.titulo}</span>
                {stat.icono}
              </div>
              <div className="pa-stat-body">
                <span className="pa-stat-value">{stat.valor}</span>
                <span className="pa-stat-desc">{stat.descripcion}</span>
              </div>
            </div>
          ))}
        </div>

        {/* SECCIÓN DE RESÚMENES SECUNDARIOS */}
        <div className="pa-grid-sections">
          
          {/* Columna Izquierda: Actividad Reciente del Sistema */}
          <div className="pa-card">
            <div className="pa-card-header">
              <History className="pa-icon-sm" />
              <h3 className="pa-card-title">Auditoría Global de Operaciones</h3>
            </div>
            <div className="pa-list">
              {ultimasActividades.map((act, index) => (
                <div key={index} className="pa-list-item">
                  <div className="pa-list-row">
                    <strong>{act.operario}</strong>
                    <span className="pa-list-date">{act.fecha}</span>
                  </div>
                  <p className="pa-list-text">{act.accion}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Columna Derecha: Estado de Alertas y Stock */}
          <div className="pa-card">
            <div className="pa-card-header">
              <AlertTriangle className="pa-icon-sm pa-text-warning" />
              <h3 className="pa-card-title">Alertas y Límites de Stock</h3>
            </div>
            <div className="pa-alert-box">
              <div className="pa-alert-content">
                <strong>Punto de Reposición / Alarma Mínima</strong>
                <p>Las alertas de stock mínimo están configuradas en 50 y 25 cabezas. Actualmente el rodeo activo se encuentra en niveles normales de estabilidad.</p>
              </div>
              <span className="pa-badge-stable">
                <CheckCircle className="pa-icon-xs" /> Estado Estable
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default PanelAdmin;