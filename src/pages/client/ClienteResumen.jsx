import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  Truck, 
  CheckCircle2, 
  Boxes, 
  ShieldCheck
} from 'lucide-react';
import { clienteService } from '../../services/clienteService';
import '../../styles/ClienteResumen.css';

const ClienteResumen = () => {
  // ID del cliente logueado
  const clienteId = 3; 

  const [negociaciones, setNegociaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    clienteService.obtenerResumenCliente(clienteId)
      .then((data) => {
        setNegociaciones(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar el resumen del cliente:", err);
        setLoading(false);
      });
  }, [clienteId]);

  // Filtrar solo las ofertas aceptadas para las métricas financieras
  const ofertasAceptadas = negociaciones.filter(n => (n.estadoOferta || '').toLowerCase() === 'aceptada');

  const inversionTotal = ofertasAceptadas.reduce((acc, curr) => acc + Number(curr.precioOfertado || 0), 0);
  const lotesCompradosCount = ofertasAceptadas.length;

  // Mapeo de los datos para la tabla y métricas de envío
  const misLotesComprados = negociaciones.map(n => {
    const esAceptada = (n.estadoOferta || '').toLowerCase() === 'aceptada';
    return {
      id: n.animal ? `LOTE-${n.animal.id}` : `NEG-${n.id}`,
      titulo: n.animal ? `${n.animal.especie || 'Lote de Ganado'} - Raza: ${n.animal.raza || 'General'}` : 'Oferta de Ganado',
      monto: `$${Number(n.precioOfertado || 0).toLocaleString()} ARS`,
      fecha: n.fechaOferta ? new Date(n.fechaOferta).toLocaleDateString() : 'N/D',
      estadoEnvio: esAceptada ? 'Entregado en Establecimiento' : `Estado: ${n.estadoOferta}`,
      esAceptada: esAceptada
    };
  });

  const entregados = misLotesComprados.filter(item => item.esAceptada).length;
  const enCamino = 0; // Puedes ajustarlo si integras el módulo de distribución logística

  return (
    <div className="res-container">
      <div className="res-wrapper">
        
        {/* ENCABEZADO */}
        <div className="res-header">
          <div>
            <h2 className="res-title">Resumen de Inversión y Envíos</h2>
            <h3 className="res-subtitle">Control financiero de compras y estado logístico en tiempo real</h3>
          </div>
          <div className="res-badge-client">
            <ShieldCheck className="res-icon-sm" /> Portal del Comprador
          </div>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', padding: '40px', color: '#666' }}>Cargando resumen financiero...</p>
        ) : (
          <>
            {/* TARJETAS DE MÉTRICAS */}
            <div className="res-stats-grid">
              
              <div className="res-stat-card primary">
                <div className="res-stat-header">
                  <span className="res-stat-title">Inversión Total</span>
                  <DollarSign className="res-stat-icon" />
                </div>
                <div className="res-stat-body">
                  <span className="res-stat-value">${inversionTotal.toLocaleString()} ARS</span>
                  <span className="res-stat-desc">Acumulado en ofertas aceptadas</span>
                </div>
              </div>

              <div className="res-stat-card success">
                <div className="res-stat-header">
                  <span className="res-stat-title">Lotes Adquiridos</span>
                  <Boxes className="res-stat-icon" />
                </div>
                <div className="res-stat-body">
                  <span className="res-stat-value">{lotesCompradosCount} Lotes</span>
                  <span className="res-stat-desc">Transacciones concretadas</span>
                </div>
              </div>

              <div className="res-stat-card warning">
                <div className="res-stat-header">
                  <span className="res-stat-title">Lotes en Tránsito</span>
                  <Truck className="res-stat-icon" />
                </div>
                <div className="res-stat-body">
                  <span className="res-stat-value">{enCamino} Lote</span>
                  <span className="res-stat-desc">En viaje a su domicilio</span>
                </div>
              </div>

              <div className="res-stat-card info">
                <div className="res-stat-header">
                  <span className="res-stat-title">Lotes Entregados</span>
                  <CheckCircle2 className="res-stat-icon" />
                </div>
                <div className="res-stat-body">
                  <span className="res-stat-value">{entregados} Lotes</span>
                  <span className="res-stat-desc">Recibidos conforme</span>
                </div>
              </div>

            </div>

            {/* TABLA DE HISTORIAL DE COMPRAS Y LOGÍSTICA */}
            <div className="res-card">
              <div className="res-card-header-title">
                <h3 className="res-section-title">Historial de Lotes Comprados y Estados de Negociación</h3>
              </div>
              <div className="res-table-responsive">
                <table className="res-table">
                  <thead>
                    <tr>
                      <th>ID Registro</th>
                      <th>Descripción del Lote</th>
                      <th>Monto Ofertado / Acordado</th>
                      <th>Fecha de Solicitud</th>
                      <th className="text-right">Estado de Transporte / Oferta</th>
                    </tr>
                  </thead>
                  <tbody>
                    {misLotesComprados.length === 0 ? (
                      <tr>
                        <td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                          No tienes compras o solicitudes registradas.
                        </td>
                      </tr>
                    ) : (
                      misLotesComprados.map((item, index) => (
                        <tr key={index}>
                          <td className="res-td-id"><strong>#{item.id}</strong></td>
                          <td>{item.titulo}</td>
                          <td className="res-td-price">{item.monto}</td>
                          <td className="res-td-muted">{item.fecha}</td>
                          <td className="text-right">
                            {item.esAceptada ? (
                              <span className="res-badge success">
                                <CheckCircle2 className="res-icon-xs" /> Aceptado / Entregado
                              </span>
                            ) : (
                              <span className="res-badge warning">
                                <Truck className="res-icon-xs" /> {item.estadoEnvio}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default ClienteResumen;