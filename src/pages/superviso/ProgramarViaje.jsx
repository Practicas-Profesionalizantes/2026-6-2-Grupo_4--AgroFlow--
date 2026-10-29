import React, { useState } from 'react';
import { Truck, User, FileText, Navigation, CheckCircle2, ArrowRight } from 'lucide-react';
import { programarViajeDistribucion } from '../../services/supervisorService';
import '../../styles/CargaCamiones.css';

const ProgramarViaje = () => {
  const [conductorNombre, setConductorNombre] = useState('');
  const [conductorDocumento, setConductorDocumento] = useState('');
  const [patenteCamion, setPatenteCamion] = useState('');
  const [patenteAcoplado, setPatenteAcoplado] = useState('');
  const [rutaAsignada, setRutaAsignada] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [mensajeError, setMensajeError] = useState('');
  const [mensajeExito, setMensajeExito] = useState(false);

  // Obtenemos el ID del Supervisor que inició sesión
  const usuarioLogueado = JSON.parse(localStorage.getItem('usuario'));
  const SUPERVISOR_ID = usuarioLogueado?.id || 2; // ID de prueba (ej: María Gómez)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensajeError('');
    setMensajeExito(false);

    const datosViaje = {
      operarioId: SUPERVISOR_ID,
      supervisorId: SUPERVISOR_ID,
      conductorNombre,
      conductorDocumento,
      patenteCamion,
      patenteAcoplado,
      rutaAsignada
    };

    try {
      await programarViajeDistribucion(datosViaje);
      
      setMensajeExito(true);
      // Limpiamos el formulario
      setConductorNombre('');
      setConductorDocumento('');
      setPatenteCamion('');
      setPatenteAcoplado('');
      setRutaAsignada('');
    } catch (error) {
      setMensajeError(error.response?.data?.message || 'Error al programar el viaje de distribución.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cc-container">
      <div className="cc-wrapper-simple">
        
        <div className="cc-header-simple">
          <h2 className="cc-title-simple">Programar Órdenes de Despacho</h2>
          <span className="cc-subtitle-simple">Alta de transportes y asignación de rutas logísticas</span>
        </div>

        <div className="cc-card-simple">
          {mensajeExito && (
            <div className="cc-alert-success" style={{ backgroundColor: '#dcfce7', color: '#15803d', padding: '10px', borderRadius: '6px', marginBottom: '15px' }}>
              <CheckCircle2 className="cc-icon-sm" /> ¡Orden de viaje generada con éxito! Ya está disponible para los operarios.
            </div>
          )}

          {mensajeError && (
            <div className="cc-alert-error" style={{ color: 'red', backgroundColor: '#fee2e2', padding: '10px', borderRadius: '6px', marginBottom: '15px' }}>
              {mensajeError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="cc-form-body">
            
            {/* Datos del Chofer */}
            <div className="cc-form-group">
              <label className="cc-label">Nombre Completo del Conductor</label>
              <div className="cc-input-container">
                <User className="cc-input-icon" />
                <input 
                  type="text" 
                  className="cc-text-input" 
                  placeholder="Ej. Pedro Picapiedra"
                  value={conductorNombre}
                  onChange={(e) => setConductorNombre(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="cc-form-group">
              <label className="cc-label">Documento del Conductor (DNI/Pasaporte)</label>
              <div className="cc-input-container">
                <FileText className="cc-input-icon" />
                <input 
                  type="text" 
                  className="cc-text-input" 
                  placeholder="Ej. 22333444"
                  value={conductorDocumento}
                  onChange={(e) => setConductorDocumento(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Patentes */}
            <div style={{ display: 'flex', gap: '15px' }}>
              <div className="cc-form-group" style={{ flex: 1 }}>
                <label className="cc-label">Patente Camión</label>
                <input 
                  type="text" 
                  className="cc-text-input" 
                  placeholder="Ej. AA123BB"
                  value={patenteCamion}
                  onChange={(e) => setPatenteCamion(e.target.value)}
                  required
                />
              </div>
              <div className="cc-form-group" style={{ flex: 1 }}>
                <label className="cc-label">Patente Acoplado</label>
                <input 
                  type="text" 
                  className="cc-text-input" 
                  placeholder="Ej. AB456CD"
                  value={patenteAcoplado}
                  onChange={(e) => setPatenteAcoplado(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Ruta */}
            <div className="cc-form-group">
              <label className="cc-label">Ruta Asignada / Destino Comercial</label>
              <div className="cc-input-container">
                <Navigation className="cc-input-icon" />
                <input 
                  type="text" 
                  className="cc-text-input" 
                  placeholder="Ej. Ruta Nacional 3 Km 400 - Frigorífico Regional"
                  value={rutaAsignada}
                  onChange={(e) => setRutaAsignada(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="cc-btn-submit-main" disabled={loading}>
              <span>{loading ? 'GENERANDO ORDEN...' : 'HABILITAR VIAJE EN MANGA'}</span>
              <ArrowRight className="cc-icon-sm" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ProgramarViaje;
