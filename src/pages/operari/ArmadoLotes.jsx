import React, { useState } from 'react';
import { 
  Tag, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  Scale, 
  ChevronDown 
} from 'lucide-react';
import '../../styles/ArmadoLotes.css';

const ArmadoLotes = () => {
  const [caravanaInput, setCaravanaInput] = useState('');
  const [loteSeleccionado, setLoteSeleccionado] = useState('Lote L-204 (Faena / Exportación >420kg)');
  const [condicionSeleccionada, setCondicionSeleccionada] = useState('Novillo Apto Exportación');
  const [mensajeExito, setMensajeExito] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!caravanaInput.trim()) return;

    // Lógica para registrar el animal en el lote
    setMensajeExito(true);
    setCaravanaInput('');
    setTimeout(() => setMensajeExito(false), 3000);
  };

  return (
    <div className="al-container">
      <div className="al-wrapper-simple">
        
        {/* TÍTULO DIRECTO */}
        <div className="al-header-simple">
          <h2 className="al-title-simple">Armado de Lotes</h2>
          <span className="al-subtitle-simple">Registro operativo de ingreso de animales a lote</span>
        </div>

        {/* TARJETA ÚNICA DE FORMULARIO */}
        <div className="al-card-simple">
          
          {/* Telemetría rápida de báscula */}
          <div className="al-scale-telemetry">
            <div className="al-scale-left">
              <Scale className="al-icon-md al-text-secondary" />
              <div>
                <span className="al-scale-label">Balanza #02</span>
                <span className="al-scale-number">442.5 KG</span>
              </div>
            </div>
            <span className="al-scale-status-text">
              <span className="al-dot-green"></span> Lectura Estable
            </span>
          </div>

          {mensajeExito && (
            <div className="al-alert-success">
              <CheckCircle2 className="al-icon-sm" /> ¡Animal registrado en el lote con éxito!
            </div>
          )}

          <form onSubmit={handleSubmit} className="al-form-body">
            <div className="al-form-group">
              <label className="al-label">Código de Caravana / ID Animal</label>
              <div className="al-input-container">
                <Tag className="al-input-icon" />
                <input 
                  type="text" 
                  className="al-text-input" 
                  placeholder="Ej. #AR-4892"
                  value={caravanaInput}
                  onChange={(e) => setCaravanaInput(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="al-form-group">
              <label className="al-label">Lote de Destino</label>
              <div className="al-select-container">
                <Layers className="al-input-icon" />
                <select 
                  className="al-select-input"
                  value={loteSeleccionado}
                  onChange={(e) => setLoteSeleccionado(e.target.value)}
                >
                  <option value="Lote L-204 (Faena / Exportación >420kg)">Lote L-204 (Faena / Exportación &gt;420kg)</option>
                  <option value="Corral #2 (Observación Veterinaria)">Corral #2 (Observación Veterinaria)</option>
                  <option value="Corral #1 (Recría Liviana <400kg)">Corral #1 (Recría Liviana &lt;400kg)</option>
                  <option value="Lote L-205 (Consumo Interno Local)">Lote L-205 (Consumo Interno Local)</option>
                </select>
                <ChevronDown className="al-select-arrow" />
              </div>
            </div>

            <button type="submit" className="al-btn-submit-main">
              <span>REGISTRAR EN LOTE</span>
              <ArrowRight className="al-icon-sm" />
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};

export default ArmadoLotes;