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

const CargaCamiones = () => {
  const [caravanaInput, setCaravanaInput] = useState('');
  const [supervisorInput, setSupervisorInput] = useState('Ing. Roberto Maidana');
  const [camionInput, setCamionInput] = useState('Camión AB123CD - Frigorífico Sur');
  const [mensajeExito, setMensajeExito] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!caravanaInput.trim()) return;

    // Lógica para registrar la carga del animal en el camión
    setMensajeExito(true);
    setCaravanaInput('');
    setTimeout(() => setMensajeExito(false), 3000);
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
                  placeholder="Ej. #AR-4892"
                  value={caravanaInput}
                  onChange={(e) => setCaravanaInput(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="cc-form-group">
              <label className="cc-label">Supervisor / Quien envió la orden</label>
              <div className="cc-input-container">
                <User className="cc-input-icon" />
                <input 
                  type="text" 
                  className="cc-text-input" 
                  placeholder="Ej. Ing. Roberto Maidana"
                  value={supervisorInput}
                  onChange={(e) => setSupervisorInput(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="cc-form-group">
              <label className="cc-label">Camión / Destino Asignado</label>
              <div className="cc-select-container">
                <Truck className="cc-input-icon" />
                <select 
                  className="cc-select-input"
                  value={camionInput}
                  onChange={(e) => setCamionInput(e.target.value)}
                >
                  <option value="Camión AB123CD - Frigorífico Sur">Camión AB123CD - Frigorífico Sur</option>
                  <option value="Camión EF456GH - Mercado Central">Camión EF456GH - Mercado Central</option>
                  <option value="Camión JKL789 - Exportación Directa">Camión JKL789 - Exportación Directa</option>
                </select>
                <ChevronDown className="cc-select-arrow" />
              </div>
            </div>

            <button type="submit" className="cc-btn-submit-main">
              <span>CONFIRMAR CARGA EN CAMIÓN</span>
              <ArrowRight className="cc-icon-sm" />
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};

export default CargaCamiones;