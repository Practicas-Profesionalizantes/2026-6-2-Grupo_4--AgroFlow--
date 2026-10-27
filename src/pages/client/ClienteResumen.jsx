import React from 'react';
import { 
  DollarSign, 
  Truck, 
  CheckCircle2, 
  Boxes, 
  Clock,
  ShieldCheck
} from 'lucide-react';
import '../../styles/ClienteResumen.css';

const ClienteResumen = () => {
  // Datos simulados de la inversión y compras del cliente
  const resumenFinanciero = {
    inversionTotal: '$16.500.000 ARS',
    lotesComprados: 3,
    enCamino: 1,
    entregados: 2
  };

  const misLotesComprados = [
    { id: 'LOTE-390', titulo: 'Novillos Angus para Faena (15 Cabezas)', monto: '$6.200.000 ARS', estadoEnvio: 'En camino (Rumbo a destino)', fecha: '24/10/2024' },
    { id: 'LOTE-385', titulo: 'Toros Hereford Reproductores (5 Cabezas)', monto: '$4.500.000 ARS', estadoEnvio: 'Entregado en Establecimiento', fecha: '18/10/2024' },
    { id: 'LOTE-380', titulo: 'Vaquillonas Destete (12 Cabezas)', monto: '$5.800.000 ARS', estadoEnvio: 'Entregado en Establecimiento', fecha: '10/10/2024' },
  ];

  return (
    <div className="res-container">
      <div className="res-wrapper">
        
        {/* ENCABEZADO */}
        <div className="res-header">
          <div>
            <h2 className="res-title">Resumen de Inversión y Envíos</h2>
            <h3 className="res-subtitle">Control financiero de compras y estado logístico de transporte</h3>
          </div>
          <div className="res-badge-client">
            <ShieldCheck className="res-icon-sm" /> Portal del Comprador
          </div>
        </div>

        {/* TARJETAS DE MÉTRICAS */}
        <div className="res-stats-grid">
          
          <div className="res-stat-card primary">
            <div className="res-stat-header">
              <span className="res-stat-title">Inversión Total</span>
              <DollarSign className="res-stat-icon" />
            </div>
            <div className="res-stat-body">
              <span className="res-stat-value">{resumenFinanciero.inversionTotal}</span>
              <span className="res-stat-desc">Acumulado en ganado adquirido</span>
            </div>
          </div>

          <div className="res-stat-card success">
            <div className="res-stat-header">
              <span className="res-stat-title">Lotes Adquiridos</span>
              <Boxes className="res-stat-icon" />
            </div>
            <div className="res-stat-body">
              <span className="res-stat-value">{resumenFinanciero.lotesComprados} Lotes</span>
              <span className="res-stat-desc">Transacciones concretadas</span>
            </div>
          </div>

          <div className="res-stat-card warning">
            <div className="res-stat-header">
              <span className="res-stat-title">Lotes en Tránsito</span>
              <Truck className="res-stat-icon" />
            </div>
            <div className="res-stat-body">
              <span className="res-stat-value">{resumenFinanciero.enCamino} Lote</span>
              <span className="res-stat-desc">En viaje a su domicilio</span>
            </div>
          </div>

          <div className="res-stat-card info">
            <div className="res-stat-header">
              <span className="res-stat-title">Lotes Entregados</span>
              <CheckCircle2 className="res-stat-icon" />
            </div>
            <div className="res-stat-body">
              <span className="res-stat-value">{resumenFinanciero.entregados} Lotes</span>
              <span className="res-stat-desc">Recibidos conforme</span>
            </div>
          </div>

        </div>

        {/* TABLA DE HISTORIAL DE COMPRAS Y LOGÍSTICA */}
        <div className="res-card">
          <div className="res-card-header-title">
            <h3 className="res-section-title">Historial de Lotes Comprados y Estados de Envío</h3>
          </div>
          <div className="res-table-responsive">
            <table className="res-table">
              <thead>
                <tr>
                  <th>N° de Lote</th>
                  <th>Descripción del Lote</th>
                  <th>Monto Acordado</th>
                  <th>Fecha de Compra</th>
                  <th className="text-right">Estado de Transporte</th>
                </tr>
              </thead>
              <tbody>
                {misLotesComprados.map((item, index) => (
                  <tr key={index}>
                    <td className="res-td-id"><strong>#{item.id}</strong></td>
                    <td>{item.titulo}</td>
                    <td className="res-td-price">{item.monto}</td>
                    <td className="res-td-muted">{item.fecha}</td>
                    <td className="text-right">
                      {item.estadoEnvio.includes('En camino') ? (
                        <span className="res-badge warning">
                          <Truck className="res-icon-xs" /> En Tránsito
                        </span>
                      ) : (
                        <span className="res-badge success">
                          <CheckCircle2 className="res-icon-xs" /> Entregado
                        </span>
                      )}
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

export default ClienteResumen;