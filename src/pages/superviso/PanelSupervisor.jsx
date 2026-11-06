import React, { useState, useEffect } from 'react';
import { 
  Layers, 
  Truck, 
  ClipboardList, 
  ShieldAlert, 
  History,
  FileCheck,
  Boxes
} from 'lucide-react';
import { supervisorService } from '../../services/supervisorService';
import '../../styles/PanelSupervisor.css';

const PanelSupervisor = () => {
  // ID del supervisor actual logueado
  const supervisorId = 2; 

  const [animales, setAnimales] = useState([]);
  const [lotes, setLotes] = useState([]);
  const [actividades, setActividades] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar datos reales desde el backend al montar el componente
  useEffect(() => {
    const cargarDatosSupervisor = async () => {
      try {
        const [dataAnimales, dataLotes, dataActividades] = await Promise.all([
          supervisorService.obtenerAnimales(),
          supervisorService.obtenerLotes(supervisorId),
          supervisorService.obtenerActividades(supervisorId)
        ]);

        setAnimales(dataAnimales);
        setLotes(dataLotes);
        setActividades(dataActividades);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar el panel de supervisor:", error);
        setLoading(false);
      }
    };

    cargarDatosSupervisor();
  }, [supervisorId]);

  // Cálculo del stock actual (total de animales activos o en predio)
  const stockActual = animales.filter(a => (a.estado || '').toLowerCase() === 'activo').length;

  const getStockStatus = (stock) => {
    if (stock <= 25) return { text: 'CRÍTICO (< 25)', className: 'alert-red' };
    if (stock <= 50) return { text: 'BAJO (< 50)', className: 'alert-yellow' };
    return { text: 'NORMAL', className: 'alert-green' };
  };

  const stockStatus = getStockStatus(stockActual);

  // Procesar lotes activos con su cantidad de animales y peso promedio
  const lotesProcesados = lotes.map(lote => {
    const animalesDelLote = animales.filter(a => a.agrupamiento && a.agrupamiento.id === lote.id);
    const cantidad = animalesDelLote.length;
    
    let pesoTotal = 0;
    animalesDelLote.forEach(a => {
      pesoTotal += Number(a.peso || 0);
    });
    const promedioPeso = cantidad > 0 ? (pesoTotal / cantidad).toFixed(1) : '0.0';

    return {
      id: lote.id,
      nombre: lote.nombreLote || 'Lote General',
      cantidad: cantidad,
      pesoPromedio: `${promedioPeso} kg`
    };
  });

  // Tomar las últimas 5 actividades recientes de la auditoría
  const actividadesRecientes = actividades.slice(-5).reverse().map(act => ({
    operario: act.usuario ? `${act.usuario.nombre} ${act.usuario.apellido || ''}` : 'Sistema / Operario',
    accion: act.accion,
    hora: act.fecha ? new Date(act.fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''
  }));

  return (
    <div className="ps-container">
      <div className="ps-wrapper">
        
        {/* TÍTULO DIRECTO */}
        <div className="ps-header">
          <h2 className="ps-title">Panel de Supervisor</h2>
          <span className="ps-subtitle">Resumen general de stock, auditoría de operarios y control de lotes en tiempo real</span>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', padding: '40px', color: '#666' }}>Cargando información del servidor...</p>
        ) : (
          /* GRID DE RESÚMENES */
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
                <span className="ps-stock-unit">Cabezas Activas en Predio</span>
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
                {lotesProcesados.length === 0 ? (
                  <p style={{ padding: '15px', color: '#666', textAlign: 'center' }}>No hay lotes activos registrados.</p>
                ) : (
                  lotesProcesados.slice(0, 3).map((lote) => (
                    <div key={lote.id} className="ps-list-item">
                      <div className="ps-list-row">
                        <strong>{lote.nombre}</strong>
                        <span className="ps-status-tag green">{lote.cantidad} Cabezas</span>
                      </div>
                      <p className="ps-list-text">Peso promedio: {lote.pesoPromedio}</p>
                    </div>
                  ))
                )}
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
                {actividadesRecientes.length === 0 ? (
                  <p style={{ padding: '15px', color: '#666', textAlign: 'center' }}>No hay actividades registradas.</p>
                ) : (
                  actividadesRecientes.map((act, idx) => (
                    <div key={idx} className="ps-list-item">
                      <div className="ps-list-row">
                        <strong>{act.operario}</strong>
                        <span className="ps-list-sub">{act.hora}</span>
                      </div>
                      <p className="ps-list-text">{act.accion}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default PanelSupervisor;