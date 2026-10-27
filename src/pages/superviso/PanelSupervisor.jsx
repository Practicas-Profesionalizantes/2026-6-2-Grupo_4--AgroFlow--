import React from 'react';
import { 
  Layers, 
  Truck, 
  ClipboardList, 
  ShieldAlert, 
  History,
  FileCheck,
  Boxes
} from 'lucide-react';
import '../../styles/PanelSupervisor.css';

const PanelSupervisor = () => {
  // Stock simulado actual (puedes cambiarlo para probar las alertas: ej. 20, 42 u 80)
  const stockActual = 42; 

  const getStockStatus = (stock) => {
    if (stock <= 25) return { text: 'CRÍTICO (< 25)', className: 'alert-red' };
    if (stock <= 50) return { text: 'BAJO (< 50)', className: 'alert-yellow' };
    return { text: 'NORMAL', className: 'alert-green' };
  };

  const stockStatus = getStockStatus(stockActual);

  // Resumen de últimas actividades de operarios (conectado al módulo de Actividades)
  const actividadesRecientes = [
    { operario: 'Martín R.', accion: 'Registró animal #AR-4892 en Lote L-204', hora: '16:10 hs' },
    { operario: 'Juan P.', accion: 'Cargó animal #AR-4842 en Camión AB123CD', hora: '15:20 hs' }
  ];

  // Resumen de certificaciones pendientes (conectado al módulo de Certificaciones)
  const certificacionesResumen = [
    { id: 'DTE-84895', tipo: 'Guía de Tránsito', estado: 'Pendiente Revisión' }
  ];

  const estadoCamiones = [
    { camion: 'AB123CD - Frigorífico Sur', lote: 'Lote L-204', estado: 'Cargando (12/15 cabezas)' },
    { camion: 'EF456GH - Mercado Central', lote: 'Lote L-203', estado: 'Despachado' }
  ];

  return (
    <div className="ps-container">
      <div className="ps-wrapper">
        
        {/* TÍTULO DIRECTO */}
        <div className="ps-header">
          <h2 className="ps-title">Panel de Supervisor</h2>
          <span className="ps-subtitle">Resumen general de stock, auditoría de operarios y control de certificaciones</span>
        </div>

        {/* GRID DE RESÚMENES */}
        <div className="ps-grid">
          
          {/* Card 1: Stock Actual con Alertas Inteligentes */}
          <div className={`ps-card ps-stock-card ${stockStatus.className}`}>
            <div className="ps-card-header">
              <div className="ps-card-title-group">
                <Layers className="ps-icon ps-text-primary" />
                <h3 className="ps-card-title">Stock Actual de Animales</h3>
              </div>
              <span className={`ps-badge ${stockStatus.className}`}>{stockStatus.text}</span>
            </div>
            <div className="ps-stock-content">
              <span className="ps-stock-number">{stockActual}</span>
              <span className="ps-stock-unit">Cabezas en Predio</span>
            </div>
            <p className="ps-card-desc">
              {stockActual <= 25 
                ? '⚠️ Alerta Roja: El stock se encuentra por debajo del límite crítico de 25 cabezas.' 
                : stockActual <= 50 
                ? '⚡ Alerta Amarilla: El stock está por debajo de las 50 cabezas operativas recomendadas.' 
                : '✔ Stock óptimo dentro de los parámetros normales.'}
            </p>
          </div>

          {/* Card 2: Resumen de Inventario de Ganado (Lotes Activos) */}
          <div className="ps-card">
            <div className="ps-card-header">
              <div className="ps-card-title-group">
                <Boxes className="ps-icon ps-text-primary" />
                <h3 className="ps-card-title">Inventario y Lotes Activos</h3>
              </div>
            </div>
            <div className="ps-list">
              <div className="ps-list-item">
                <div className="ps-list-row">
                  <strong>Lote L-204 (Faena)</strong>
                  <span className="ps-status-tag green">12 Cabezas</span>
                </div>
                <p className="ps-list-text">Destino: Frigorífico Sur | Peso prom: 436.2 kg</p>
              </div>
              <div className="ps-list-item">
                <div className="ps-list-row">
                  <strong>Corral #1 (Recría)</strong>
                  <span className="ps-status-tag blue">25 Cabezas</span>
                </div>
                <p className="ps-list-text">Destino: Recría Predio | Peso prom: 385.0 kg</p>
              </div>
            </div>
          </div>

          {/* Card 3: Auditoría de Actividades Recientes */}
          <div className="ps-card">
            <div className="ps-card-header">
              <div className="ps-card-title-group">
                <History className="ps-icon ps-text-primary" />
                <h3 className="ps-card-title">Últimas Acciones de Operarios</h3>
              </div>
            </div>
            <div className="ps-list">
              {actividadesRecientes.map((act, idx) => (
                <div key={idx} className="ps-list-item">
                  <div className="ps-list-row">
                    <strong>{act.operario}</strong>
                    <span className="ps-list-sub">{act.hora}</span>
                  </div>
                  <p className="ps-list-text">{act.accion}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Card 4: Control de Certificaciones y Transportes */}
          <div className="ps-card">
            <div className="ps-card-header">
              <div className="ps-card-title-group">
                <FileCheck className="ps-icon ps-text-warning" />
                <h3 className="ps-card-title">Estado de Certificaciones</h3>
              </div>
            </div>
            <div className="ps-list">
              {certificacionesResumen.map((cert, idx) => (
                <div key={idx} className="ps-list-item warning-bg">
                  <div className="ps-list-row">
                    <strong className="ps-caravana">{cert.id}</strong>
                    <span className="ps-dest">{cert.estado}</span>
                  </div>
                  <span className="ps-motivo">Tipo: {cert.tipo} (Requiere revisión de guía)</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default PanelSupervisor;