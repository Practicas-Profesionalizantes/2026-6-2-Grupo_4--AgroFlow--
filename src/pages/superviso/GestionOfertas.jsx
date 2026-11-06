import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, Clock, ShieldCheck, DollarSign } from 'lucide-react';
import { supervisorService } from '../../services/supervisorService';
import { clienteService } from '../../services/clienteService'; // O usa tu servicio para listar animales

const GestionOfertas = () => {
  const supervisorId = 2; // ID del supervisor logueado
  const [negociaciones, setNegociaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar las negociaciones pendientes (aquí simulamos trayendo los animales y sus ofertas)
  useEffect(() => {
    const cargarOfertasPendientes = async () => {
      try {
        // Obtenemos los animales para revisar sus negociaciones
        const animales = await clienteService.listarAnimales();
        let todasLasNegociaciones = [];

        for (let animal of animales) {
          const negs = await supervisorService.obtenerNegociacionesAnimal(animal.id);
          todasLasNegociaciones = [...todasLasNegociaciones, ...negs];
        }

        setNegociaciones(todasLasNegociaciones);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar las ofertas:", error);
        setLoading(false);
      }
    };

    cargarOfertasPendientes();
  }, []);

  const handleResponder = async (idNegociacion, nuevoEstado) => {
    try {
      await supervisorService.responderOferta(idNegociacion, supervisorId, nuevoEstado);
      // Actualizamos el estado localmente para reflejar el cambio al instante
      setNegociaciones(prev => prev.map(n => 
        n.id === idNegociacion ? { ...n, estadoOferta: nuevoEstado } : n
      ));
      alert(`Oferta marcada como: ${nuevoEstado}`);
    } catch (error) {
      console.error("Error al responder oferta:", error);
      alert("No se pudo actualizar la oferta en el servidor.");
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <div>
          <h2 style={{ color: '#111', fontSize: '24px', fontWeight: 'bold' }}>Gestión de Solicitudes y Ofertas</h2>
          <p style={{ color: '#666', fontSize: '14px' }}>Aprobe o rechace los pedidos de compra realizados por los clientes.</p>
        </div>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', padding: '40px', color: '#666' }}>Cargando solicitudes...</p>
      ) : negociaciones.length === 0 ? (
        <div style={{ background: '#fff', padding: '40px', textAlign: 'center', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <p style={{ color: '#666' }}>No hay solicitudes de compra pendientes en este momento.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {negociaciones.map((neg) => (
            <div key={neg.id} style={{ background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '12px', background: '#e0f2fe', color: '#0369a1', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold' }}>
                  Lote / Animal ID: #{neg.animal ? neg.animal.id : 'N/D'}
                </span>
                <h4 style={{ margin: '10px 0 5px 0', fontSize: '16px', color: '#333' }}>
                  Cliente ID: {neg.proponente ? `${neg.proponente.nombre} ${neg.proponente.apellido || ''}` : 'Comprador'}
                </h4>
                <p style={{ margin: '0', color: '#666', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <DollarSign size={16} /> Monto Ofertado: <strong>${Number(neg.precioOfertado || 0).toLocaleString()} ARS</strong>
                </p>
                <p style={{ margin: '5px 0 0 0', color: '#888', fontSize: '12px' }}>
                  Fecha: {neg.fechaOferta ? new Date(neg.fechaOferta).toLocaleString() : 'N/D'}
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                <span style={{ 
                  padding: '6px 12px', 
                  borderRadius: '20px', 
                  fontSize: '13px', 
                  fontWeight: 'bold',
                  backgroundColor: neg.estadoOferta === 'Aceptada' ? '#e6f4ea' : neg.estadoOferta === 'Rechazada' ? '#fce8e6' : '#fef7e0',
                  color: neg.estadoOferta === 'Aceptada' ? '#137333' : neg.estadoOferta === 'Rechazada' ? '#c5221f' : '#b06000'
                }}>
                  {neg.estadoOferta}
                </span>

                {neg.estadoOferta === 'Pendiente' && (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      onClick={() => handleResponder(neg.id, 'Aceptada')}
                      style={{ background: '#10b981', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 'bold', fontSize: '13px' }}
                    >
                      <CheckCircle2 size={16} /> Aprobar
                    </button>
                    <button 
                      onClick={() => handleResponder(neg.id, 'Rechazada')}
                      style={{ background: '#ef4444', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 'bold', fontSize: '13px' }}
                    >
                      <XCircle size={16} /> Rechazar
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GestionOfertas;