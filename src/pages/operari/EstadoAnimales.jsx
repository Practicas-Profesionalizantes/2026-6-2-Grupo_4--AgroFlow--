import React, { useState } from 'react';
import { 
  Tag, 
  ClipboardList, 
  ArrowRight, 
  CheckCircle2, 
  Activity, 
  ChevronDown 
} from 'lucide-react';
import '../../styles/EstadoAnimales.css';

const EstadoAnimales = () => {
  const [caravanaInput, setCaravanaInput] = useState('');
  const [nuevoEstado, setNuevoEstado] = useState('Enfermo');
  const [observacion, setObservacion] = useState('');
  const [mensajeExito, setMensajeExito] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!caravanaInput.trim()) return;

    // Lógica para actualizar el estado del animal en la base de datos
    setMensajeExito(true);
    setCaravanaInput('');
    setObservacion('');
    setTimeout(() => setMensajeExito(false), 3000);
  };

  return (
    <div className="ea-container">
      <div className="ea-wrapper-simple">
        
        {/* TÍTULO DIRECTO */}
        <div className="ea-header-simple">
          <h2 className="ea-title-simple">Estado de Animales</h2>
          <span className="ea-subtitle-simple">Actualización de estado clínico y logístico del ganado</span>
        </div>

        {/* TARJETA ÚNICA DE FORMULARIO */}
        <div className="ea-card-simple">
          
          {/* Indicador de sección */}
          <div className="ea-info-telemetry">
            <div className="ea-info-left">
              <Activity className="ea-icon-md ea-text-primary" />
              <div>
                <span className="ea-info-label">Módulo Operativo</span>
                <span className="ea-info-number">Registro de Novedades</span>
              </div>
            </div>
            <span className="ea-info-status-text">
              <span className="al-dot-green"></span> Sistema Conectado
            </span>
          </div>

          {mensajeExito && (
            <div className="ea-alert-success">
              <CheckCircle2 className="ea-icon-sm" /> ¡Estado del animal actualizado con éxito!
            </div>
          )}

          <form onSubmit={handleSubmit} className="ea-form-body">
            <div className="ea-form-group">
              <label className="ea-label">Código de Caravana / ID Animal</label>
              <div className="ea-input-container">
                <Tag className="ea-input-icon" />
                <input 
                  type="text" 
                  className="ea-text-input" 
                  placeholder="Ej. #AR-4892"
                  value={caravanaInput}
                  onChange={(e) => setCaravanaInput(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="ea-form-group">
              <label className="ea-label">Nuevo Estado del Animal</label>
              <div className="ea-select-container">
                <ClipboardList className="ea-input-icon" />
                <select 
                  className="ea-select-input"
                  value={nuevoEstado}
                  onChange={(e) => setNuevoEstado(e.target.value)}
                >
                  <option value="Activo">Activo</option>
                  <option value="Enfermo">Enfermo / Observación Sanitaria</option>
                  <option value="Muerto">Muerto / Baja</option>
                  <option value="Vendido">Vendido / Despachado</option>
                </select>
                <ChevronDown className="ea-select-arrow" />
              </div>
            </div>

            <div className="ea-form-group">
              <label className="ea-label">Detalles / Motivo (Opcional)</label>
              <textarea 
                className="ea-textarea-input"
                placeholder="Ingrese observaciones clínicas o logísticas..."
                value={observacion}
                onChange={(e) => setObservacion(e.target.value)}
                rows="3"
              ></textarea>
            </div>

            <button type="submit" className="ea-btn-submit-main">
              <span>ACTUALIZAR ESTADO</span>
              <ArrowRight className="ea-icon-sm" />
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};

export default EstadoAnimales;