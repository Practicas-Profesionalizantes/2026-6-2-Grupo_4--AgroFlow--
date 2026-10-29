import React, { useState } from 'react';
import {
  Tag,
  User,
  Truck,
  ArrowRight,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import '../../styles/CargaCamiones.css';
import { actualizarEstadoAnimal } from '../../services/animalesService';
import { obtenerViajesActivos } from '../../services/animalesService';

const CargaCamiones = () => {
  const [caravanaInput, setCaravanaInput] = useState('');
  const [viajeIdSeleccionado, setViajeIdSeleccionado] = useState('');
  const [camionesDisponibles, setCamionesDisponibles] = useState([]);
  const [listaAnimales, setListaAnimales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensajeError, setMensajeError] = useState('');
  const [mensajeExito, setMensajeExito] = useState(false);

  const usuarioLogueado = JSON.parse(localStorage.getItem('usuario'));
  const OPERARIO_ID = usuarioLogueado?.id || 1;

  React.useEffect(() => {
    const cargarDatosDespacho = async () => {
      try {
        // 1. Traemos los viajes programados en estado 'Pendiente' por el supervisor
        const viajes = await obtenerViajesActivos('Pendiente');
        setCamionesDisponibles(viajes);
        if (viajes.length > 0) setViajeIdSeleccionado(viajes[0].id.toString());

        // 2. Traemos los animales para el autocompletado
        const resAnimales = await fetch('http://localhost:8080/api/animales');
        if (resAnimales.ok) {
          const animalesData = await resAnimales.json();
          setListaAnimales(animalesData);
        }
      } catch (error) {
        setMensajeError('Error al sincronizar las órdenes de despacho.');
      }
    };
    cargarDatosDespacho();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!caravanaInput.trim() || !viajeIdSeleccionado) return;

    setLoading(true);
    setMensajeError('');
    setMensajeExito(false);

    try {
      await actualizarEstadoAnimal(
        caravanaInput.trim(),
        'Venta',
        `Despachado en Camión/Viaje ID: ${viajeIdSeleccionado}`,
        OPERARIO_ID
      );

      setMensajeExito(true);
      setCaravanaInput('');
      setTimeout(() => setMensajeExito(false), 3000);
    } catch (error) {
      setMensajeError(error.message);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="cc-container">
      <div className="cc-wrapper-simple">

        {/* TÍTULO DIRECTO */}
        <div className="cc-header-simple">
          <h2 className="cc-title-simple">Carga de Camiones</h2>
          <span className="cc-subtitle-simple">Registro operativo de despacho y salida de animales</span>
        </div>

        {/* TARJETA ÚNICA DE FORMULARIO */}
        <div className="cc-card-simple">

          {/* Indicador de sección */}
          <div className="cc-info-telemetry">
            <div className="cc-info-left">
              <Truck className="cc-icon-md cc-text-primary" />
              <div>
                <span className="cc-info-label">Despacho en Manga</span>
                <span className="cc-info-number">Registro de Salida</span>
              </div>
            </div>
            <span className="cc-info-status-text">
              <span className="cc-dot-green"></span> Activo
            </span>
          </div>

          {mensajeExito && (
            <div className="cc-alert-success">
              <CheckCircle2 className="cc-icon-sm" /> ¡Animal registrado en el camión con éxito!
            </div>
          )}

          <form onSubmit={handleSubmit} className="cc-form-body">
            <div className="cc-form-group">
              <label className="cc-label">Código de Caravana / ID Animal</label>
              <div className="cc-input-container">
                <Tag className="cc-input-icon" />
                <input
                  type="text"
                  className="cc-text-input"
                  placeholder="Ej. RFID-A001"
                  value={caravanaInput}
                  onChange={(e) => setCaravanaInput(e.target.value)}
                  list="rfid-options-carga"
                  required
                  disabled={loading}
                />
                <datalist id="rfid-options-carga">
                  {listaAnimales.filter(a => a.estado === 'Activo').map((animal) => (
                    <option key={animal.id} value={animal.codigoRfid}>
                      {animal.raza} - {animal.peso} Kg
                    </option>
                  ))}
                </datalist>
              </div>
            </div>

            {/* Select dinámico de Camiones programados por el Supervisor */}
            <div className="cc-form-group">
              <label className="cc-label">Camión / Orden de Despacho Activa</label>
              <div className="cc-select-container">
                <Truck className="cc-input-icon" />
                <select
                  className="cc-select-input"
                  value={viajeIdSeleccionado}
                  onChange={(e) => setViajeIdSeleccionado(e.target.value)}
                  disabled={loading}
                >
                  {camionesDisponibles.length === 0 ? (
                    <option value="">No hay camiones pendientes de carga...</option>
                  ) : (
                    camionesDisponibles.map((viaje) => (
                      <option key={viaje.id} value={viaje.id}>
                        Camión Patente: {viaje.patenteCamion} - Chófer: {viaje.conductorNombre}
                      </option>
                    ))
                  )}
                </select>
                <ChevronDown className="cc-select-arrow" />
              </div>
            </div>

            {mensajeError && <div style={{ color: 'red', backgroundColor: '#fee2e2', padding: '10px', borderRadius: '6px', marginBottom: '15px' }}>{mensajeError}</div>}

            <button type="submit" className="cc-btn-submit-main" disabled={loading || camionesDisponibles.length === 0}>
              <span>{loading ? 'PROCESANDO...' : 'CONFIRMAR CARGA EN CAMIÓN'}</span>
              <ArrowRight className="cc-icon-sm" />
            </button>
          </form>


        </div>

      </div>
    </div>
  );
};

export default CargaCamiones;