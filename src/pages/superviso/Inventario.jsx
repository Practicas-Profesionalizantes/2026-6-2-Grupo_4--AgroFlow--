import React, { useState } from 'react';
import { 
  Boxes, 
  Layers, 
  Activity, 
  Scale, 
  Search, 
  CheckCircle, 
  AlertTriangle 
} from 'lucide-react';
import '../../styles/Inventario.css';

const Inventario = () => {
  const [pestanaActiva, setPestanaActiva] = useState('lotes'); // 'lotes' | 'estados' | 'razas'
  const [busqueda, setBusqueda] = useState('');

  // 1. Datos por Lotes (Tabla agrupamiento / animales)
  const datosLotes = [
    { id: 1, lote: 'Lote L-204 (Faena / Exportación)', cantidad: 12, pesoPromedio: '436.2 kg', destino: 'Frigorífico Sur', estado: 'Activo' },
    { id: 2, lote: 'Corral #1 (Recría Liviana)', cantidad: 25, pesoPromedio: '385.0 kg', destino: 'Recría Predio', estado: 'Activo' },
    { id: 3, lote: 'Corral #2 (Observación Sanitaria)', cantidad: 3, pesoPromedio: '410.5 kg', destino: 'Sanidad', estado: 'Revisión' },
    { id: 4, lote: 'Lote L-203 (Consumo Interno)', cantidad: 15, pesoPromedio: '425.0 kg', destino: 'Despacho Local', estado: 'Cerrado' },
  ];

  // 2. Datos por Estado Actual (Tabla animales.estado)
  const datosEstados = [
    { estado: 'Activos (En Predio)', cantidad: 55, porcentaje: '84.6%', color: 'success' },
    { estado: 'Enfermos / En Observación', cantidad: 3, porcentaje: '4.6%', color: 'warning' },
    { estado: 'Vendidos / Despachados', cantidad: 7, porcentaje: '10.8%', color: 'primary' },
    { estado: 'Muertos / Bajas', cantidad: 0, porcentaje: '0.0%', color: 'danger' },
  ];

  // 3. Datos por Raza y Peso
  const datosRazas = [
    { raza: 'Brangus Negro', cabezas: 35, pesoPromedio: '432.0 kg', rango: '> 420 kg (Apto Exportación)' },
    { raza: 'Braford', cabezas: 20, pesoPromedio: '395.5 kg', rango: '380 - 420 kg (Recría)' },
    { raza: 'Hereford', cabezas: 5, pesoPromedio: '410.0 kg', rango: '400 - 420 kg' },
  ];

  return (
    <div className="inv-container">
      <div className="inv-wrapper">
        
        {/* ENCABEZADO */}
        <div className="inv-header">
          <div>
            <h2 className="inv-title">Inventario de Ganado</h2>
            <h3 className="inv-subtitle">Control integral del rodeo, distribución por lotes, estados y clasificación</h3>
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
          <button 
            className={`inv-tab-btn ${pestanaActiva === 'razas' ? 'active' : ''}`}
            onClick={() => setPestanaActiva('razas')}
          >
            <Scale className="inv-icon-sm" /> Clasificación por Raza y Peso
          </button>
        </div>

        {/* CONTENIDO SEGÚN PESTAÑA */}
        <div className="inv-card">
          
          {/* VISTA 1: LOTES */}
          {pestanaActiva === 'lotes' && (
            <div className="inv-tab-content">
              <div className="inv-table-header">
                <h3 className="inv-card-section-title">Distribución de Animales por Lote Operativo</h3>
                <span className="inv-badge-count">Total en predio: 55 cabezas</span>
              </div>
              <div className="inv-table-responsive">
                <table className="inv-table">
                  <thead>
                    <tr>
                      <th>ID Lote</th>
                      <th>Nombre del Lote / Destino</th>
                      <th>Cabezas</th>
                      <th>Peso Promedio</th>
                      <th>Destino Logístico</th>
                      <th className="text-right">Estado Operativo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datosLotes.map((lote) => (
                      <tr key={lote.id}>
                        <td className="inv-td-id">#L-{200 + lote.id}</td>
                        <td><strong>{lote.lote}</strong></td>
                        <td className="font-semibold">{lote.cantidad} cabezas</td>
                        <td>{lote.pesoPromedio}</td>
                        <td>{lote.destino}</td>
                        <td className="text-right">
                          <span className={`inv-status-pill ${lote.estado === 'Activo' ? 'active' : 'review'}`}>
                            {lote.estado}
                          </span>
                        </td>
                      </tr>
                    ))}
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
                <span className="inv-badge-count">Base total analizada: 65 registros</span>
              </div>
              <div className="inv-table-responsive">
                <table className="inv-table">
                  <thead>
                    <tr>
                      <th>Estado en Sistema</th>
                      <th>Cantidad de Cabezas</th>
                      <th>Porcentaje del Total</th>
                      <th className="text-right">Indicador</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datosEstados.map((est, idx) => (
                      <tr key={idx}>
                        <td><strong>{est.estado}</strong></td>
                        <td className="font-semibold">{est.cantidad} cabezas</td>
                        <td>{est.porcentaje}</td>
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

          {/* VISTA 3: RAZA Y PESO */}
          {pestanaActiva === 'razas' && (
            <div className="inv-tab-content">
              <div className="inv-table-header">
                <h3 className="inv-card-section-title">Homogeneidad del Rodeo por Raza y Rangos</h3>
                <span className="inv-badge-count">Clasificación zootécnica</span>
              </div>
              <div className="inv-table-responsive">
                <table className="inv-table">
                  <thead>
                    <tr>
                      <th>Raza Registrada</th>
                      <th>Cabezas Totales</th>
                      <th>Peso Promedio</th>
                      <th className="text-right">Rango Comercial / Destino</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datosRazas.map((raz, idx) => (
                      <tr key={idx}>
                        <td><strong>{raz.raza}</strong></td>
                        <td className="font-semibold">{raz.cabezas} cabezas</td>
                        <td>{raz.pesoPromedio}</td>
                        <td className="text-right">
                          <span className="inv-unit-pill">{raz.rango}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default Inventario;