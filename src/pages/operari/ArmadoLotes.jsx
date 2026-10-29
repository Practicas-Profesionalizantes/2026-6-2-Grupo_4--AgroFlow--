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
import { asignarLoteAAnimal, obtenerTodosLosLotes, registrarPesajeAnimal } from '../../services/animalesService';

const ArmadoLotes = () => {
  const [caravanaInput, setCaravanaInput] = useState('');
  const [loteIdSeleccionado, setLoteIdSeleccionado] = useState('1');
  const [loading, setLoading] = useState(false);
  const [mensajeError, setMensajeError] = useState('');
  const [mensajeExito, setMensajeExito] = useState(false);
  const [lotes, setLotes] = useState([]);
  const usuarioLogueado = JSON.parse(localStorage.getItem('usuario'));
  const OPERARIO_ID = usuarioLogueado?.id;
  const [pesoBalanza, setPesoBalanza] = useState(0);
  const [listaAnimales, setListaAnimales] = useState([]);

  React.useEffect(() => {
    const cargarDatosIniciales = async () => {
      try {

        const listaLotes = await obtenerTodosLosLotes(OPERARIO_ID);
        setLotes(listaLotes);
        if (listaLotes.length > 0) {
          setLoteIdSeleccionado(listaLotes[0].id.toString());
        }

        const resAnimales = await fetch('http://localhost:8080/api/animales');
        if (resAnimales.ok) {
          const animalesData = await resAnimales.json();
          setListaAnimales(animalesData);
        }
      } catch (error) {
        setMensajeError('No se pudieron cargar los datos del sistema.');
      }
    };

    if (OPERARIO_ID) {
      cargarDatosIniciales();
    }
  }, [OPERARIO_ID]);


  const buscarPesoAnimal = async (rfid) => {
    if (!rfid.trim()) {
      setPesoBalanza(0);
      return;
    }
    try {
      const res = await fetch(`http://localhost:8080/api/animales/rfid/${rfid.trim()}`);
      if (res.ok) {
        const animal = await res.json();
        setPesoBalanza(animal.peso || 0);
      } else {
        setPesoBalanza(0);
      }
    } catch (error) {
      setPesoBalanza(0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!caravanaInput.trim()) return;

    setLoading(true);
    setMensajeError('');
    setMensajeExito(false);

    const loteObjeto = {
      id: parseInt(loteIdSeleccionado)
    };

    try {
      await asignarLoteAAnimal(caravanaInput.trim(), loteObjeto, OPERARIO_ID);

      await registrarPesajeAnimal(caravanaInput.trim(), pesoBalanza, OPERARIO_ID);

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
                <span className="al-scale-number">{pesoBalanza} KG</span>
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

          {mensajeError && <div style={{ color: 'red', backgroundColor: '#fee2e2', padding: '10px', borderRadius: '6px', marginBottom: '15px' }}>{mensajeError}</div>}


          <form onSubmit={handleSubmit} className="al-form-body">
            <div className="al-form-group">
              <label className="al-label">Código de Caravana / ID Animal</label>
              <div className="al-input-container">
                <Tag className="al-input-icon" />
                <input
                  type="text"
                  className="al-text-input"
                  placeholder="Ej. RFID-A001"
                  value={caravanaInput}
                  onChange={(e) => setCaravanaInput(e.target.value)}
                  onBlur={(e) => buscarPesoAnimal(e.target.value)}
                  list="rfid-options"
                  required
                />
                <datalist id="rfid-options">
                  {listaAnimales.map((animal) => (
                    <option key={animal.id} value={animal.codigoRfid}>
                      {animal.raza} - {animal.peso} Kg
                    </option>
                  ))}
                </datalist>
              </div>
            </div>

            <div className="al-form-group">
              <label className="al-label">Lote de Destino</label>
              <div className="al-select-container">
                <Layers className="al-input-icon" />
                <select
                  className="al-select-input"
                  value={loteIdSeleccionado}
                  onChange={(e) => setLoteIdSeleccionado(e.target.value)}
                  disabled={loading}
                >
                  {lotes.length === 0 ? (
                    <option value="">Cargando lotes disponibles...</option>
                  ) : (
                    lotes.map((lote) => (
                      <option key={lote.id} value={lote.id}>
                        {lote.nombreLote} ({lote.lote})
                      </option>
                    ))
                  )}
                </select>

                <ChevronDown className="al-select-arrow" />
              </div>
            </div>

            <button type="submit" className="al-btn-submit-main" disabled={loading}>
              <span>{loading ? 'PROCESANDO...' : 'REGISTRAR EN LOTE'}</span>
              <ArrowRight className="al-icon-sm" />
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};

export default ArmadoLotes;