import React, { useState } from 'react';
import PanelOperario from '../operari/PanelOperario';
import EstadoAnimales from '../operari/EstadoAnimales';
import ArmadoLotes from '../operari/ArmadoLotes';
import CargaCamiones from '../operari/CargaCamiones';
import '../../styles/ModuloContenedor.css';

const ModuloOperario = () => {
  const [subVista, setSubVista] = useState('inicio');

  return (
    <div className="mod-container">
      {/* BARRA SUPERIOR CON PESTAÑAS */}
      <div className="mod-header">
        <div className="mod-title-group">
          <h2 className="mod-title">Módulo de Operaciones de Campo</h2>
          <span className="mod-subtitle">Acceso directo a las vistas operativas de campo</span>
        </div>

        <div className="mod-tabs">
          <button 
            className={`mod-tab-btn ${subVista === 'inicio' ? 'active' : ''}`}
            onClick={() => setSubVista('inicio')}
          >
            Inicio
          </button>
          <button 
            className={`mod-tab-btn ${subVista === 'estado' ? 'active' : ''}`}
            onClick={() => setSubVista('estado')}
          >
            Estado Animales
          </button>
          <button 
            className={`mod-tab-btn ${subVista === 'lotes' ? 'active' : ''}`}
            onClick={() => setSubVista('lotes')}
          >
            Armado Lotes
          </button>
          <button 
            className={`mod-tab-btn ${subVista === 'camiones' ? 'active' : ''}`}
            onClick={() => setSubVista('camiones')}
          >
            Carga Camiones
          </button>
        </div>
      </div>

      {/* RENDERIZADO DINÁMICO */}
      <div className="mod-body">
        {subVista === 'inicio' && <PanelOperario />}
        {subVista === 'estado' && <EstadoAnimales />}
        {subVista === 'lotes' && <ArmadoLotes />}
        {subVista === 'camiones' && <CargaCamiones />}
      </div>
    </div>
  );
};

export default ModuloOperario;