import React, { useState, useEffect } from 'react';
import { 
  Boxes, 
  Layers, 
  Activity, 
  Scale, 
  Search, 
  CheckCircle, 
  AlertTriangle 
} from 'lucide-react';
import { inventarioService } from '../../services/inventarioService';
import '../../styles/Inventario.css';

const Inventario = () => {
  // ID del supervisor/usuario actual logueado
  const supervisorId = 2;

  const [pestanaActiva, setPestanaActiva] = useState('lotes');
  const [lotes, setLotes] = useState([]);
  const [animales, setAnimales] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar datos reales desde el backend al montar el componente
  useEffect(() => {
    const cargarDatosInventario = async () => {
      try {
        const [dataLotes, dataAnimales] = await Promise.all([
          inventarioService.obtenerLotes(supervisorId),
          inventarioService.obtenerAnimales()
        ]);
        setLotes(dataLotes);
        setAnimales(dataAnimales);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar el inventario:", error);
        setLoading(false);
      }
    };

    cargarDatosInventario();
  }, [supervisorId]);

  // Procesar dinámicamente los lotes calculando cantidad de animales y peso promedio
  const datosLotesProcesados = lotes.map(lote => {
    const animalesDelLote = animales.filter(a => a.agrupamiento && a.agrupamiento.id === lote.id);
    const cantidad = animalesDelLote.length;
    
    let pesoTotal = 0;
    animalesDelLote.forEach(a => {
      pesoTotal += Number(a.peso || 0);
    });
    const promedioPeso = cantidad > 0 ? (pesoTotal / cantidad).toFixed(1) : '0.0';

    return {
      id: lote.id,
      nombre: lote.nombreLote || 'Sin Nombre',
      codigoLote: lote.lote || 'N/A',
      cantidad: cantidad,
      pesoPromedio: `${promedioPeso} kg`,
      estado: 'Activo'
    };
  });

  // Procesar dinámicamente los estados de los animales basados en la BD
  const totalAnimales = animales.length;
  
  const contarPorEstado = (estadoBuscado) => {
    return animales.filter(a => (a.estado || '').toLowerCase() === estadoBuscado.toLowerCase()).length;
  };

  const cantActivos = contarPorEstado('Activo');
  const cantEnfermos = contarPorEstado('Enfermo');
  const cantVendidos = contarPorEstado('Vendido');
  const cantMuertos = contarPorEstado('Muerto');

  const datosEstados = [
    { estado: 'Activos (En Predio)', cantidad: cantActivos, color: 'success' },
    { estado: 'Enfermos / En Observación', cantidad: cantEnfermos, color: 'warning' },
    { estado: 'Vendidos / Despachados', cantidad: cantVendidos, color: 'primary' },
    { estado: 'Muertos / Bajas', cantidad: cantMuertos, color: 'danger' },
  ];

  return (
    <div className="inv-container">
      <div className="inv-wrapper">
        
        {/* ENCABEZADO */}
        <div className="inv-header">
          <div>
            <h2 className="inv-title">Inventario de Ganado</h2>
            <h3 className="inv-subtitle">Control integral del rodeo, distribución por lotes, estados y clasificación en tiempo real</h3>
          </div>
        </div>

        {/* PESTAÑAS DE NAVEGACIÓN */}
        <div className="inv-tabs-row">
          <button 
            className={`inv-tab-btn ${pestanaActiva === 'lotes' ? 'active' : ''}`}
            onClick={() => setPestanaActiva('lotes')}
          >
            <Layers className="inv-icon-sm" /> Desglose por Lotes Activos
          </button>
          <button 
            className={`inv-tab-btn ${pestanaActiva === 'estados' ? 'active' : ''}`}
            onClick={() => setPestanaActiva('estados')}
          >
            <Activity className="inv-icon-sm" /> Estado Actual del Rodeo
          </button>
        </div>

        {/* CONTENIDO SEGÚN PESTAÑA */}
        <div className="inv-card">
          
          {loading ? (
            <p style={{ textAlign: 'center', padding: '40px', color: '#666' }}>Cargando inventario desde el servidor...</p>
          ) : (
            <>
              {/* VISTA 1: LOTES */}
              {pestanaActiva === 'lotes' && (
                <div className="inv-tab-content">
                  <div className="inv-table-header">
                    <h3 className="inv-card-section-title">Distribución de Animales por Lote Operativo</h3>
                    <span className="inv-badge-count">Total general en animales: {totalAnimales} cabezas</span>
                  </div>
                  <div className="inv-table-responsive">
                    <table className="inv-table">
                      <thead>
                        <tr>
                          <th>ID Lote</th>
                          <th>Nombre del Lote</th>
                          <th>Código Lote</th>
                          <th>Cabezas Asignadas</th>
                          <th>Peso Promedio</th>
                          <th className="text-right">Estado Operativo</th>
                        </tr>
                      </thead>
                      <tbody>
                        {datosLotesProcesados.length === 0 ? (
                          <tr>
                            <td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: '#666' }}>No hay lotes registrados.</td>
                          </tr>
                        ) : (
                          datosLotesProcesados.map((lote) => (
                            <tr key={lote.id}>
                              <td className="inv-td-id">#L-{lote.id}</td>
                              <td><strong>{lote.nombre}</strong></td>
                              <td>{lote.codigoLote}</td>
                              <td className="font-semibold">{lote.cantidad} cabezas</td>
                              <td>{lote.pesoPromedio}</td>
                              <td className="text-right">
                                <span className="inv-status-pill active">
                                  {lote.estado}
                                </span>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* VISTA 2: ESTADOS */}
              {pestanaActiva === 'estados' && (
                <div className="inv-tab-content">
                  <div className="inv-table-header">
                    <h3 className="inv-card-section-title">Resumen por Estado Actual de Animales</h3>
                    <span className="inv-badge-count">Base total analizada: {totalAnimales} registros</span>
                  </div>
                  <div className="inv-table-responsive">
                    <table className="inv-table">
                      <thead>
                        <tr>
                          <th>Estado en Sistema</th>
                          <th>Cantidad de Cabezas</th>
                          <th className="text-right">Indicador</th>
                        </tr>
                      </thead>
                      <tbody>
                        {datosEstados.map((est, idx) => (
                          <tr key={idx}>
                            <td><strong>{est.estado}</strong></td>
                            <td className="font-semibold">{est.cantidad} cabezas</td>
                            <td className="text-right">
                              <span className={`inv-state-pill ${est.color}`}>
                                {est.color === 'success' && '✔ Normal'}
                                {est.color === 'warning' && '⚠ Requiere Atención'}
                                {est.color === 'primary' && '🚚 Despachado'}
                                {est.color === 'danger' && '✕ Sin Novedad'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default Inventario;