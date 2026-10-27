import React, { useState } from 'react';
import PanelSupervisor from '../superviso/PanelSupervisor';
import Inventario from '../superviso/Inventario';
import RegistroActividades from '../superviso/RegistroActividades';
import Certificaciones from '../superviso/Certificaciones';
import '../../styles/ModuloContenedor.css';

const ModuloSupervisor = () => {
  const [subVista, setSubVista] = useState('inicio');

  return (
    <div className="mod-container">
      {/* BARRA SUPERIOR CON PESTAÑAS */}
      <div className="mod-header">
        <div className="mod-title-group">
          <h2 className="mod-title">Módulo de Control y Supervisión</h2>
          <span className="mod-subtitle">Acceso integral a auditoría, inventario y certificaciones</span>
        </div>

        <div className="mod-tabs">
          <button 
            className={`mod-tab-btn ${subVista === 'inicio' ? 'active' : ''}`}
            onClick={() => setSubVista('inicio')}
          >
            Inicio
          </button>
          <button 
            className={`mod-tab-btn ${subVista === 'inventario' ? 'active' : ''}`}
            onClick={() => setSubVista('inventario')}
          >
            Inventario
          </button>
          <button 
            className={`mod-tab-btn ${subVista === 'actividades' ? 'active' : ''}`}
            onClick={() => setSubVista('actividades')}
          >
            Actividades
          </button>
          <button 
            className={`mod-tab-btn ${subVista === 'certificaciones' ? 'active' : ''}`}
            onClick={() => setSubVista('certificaciones')}
          >
            Certificaciones
          </button>
        </div>
      </div>

      {/* RENDERIZADO DINÁMICO */}
      <div className="mod-body">
        {subVista === 'inicio' && <PanelSupervisor />}
        {subVista === 'inventario' && <Inventario />}
        {subVista === 'actividades' && <RegistroActividades />}
        {subVista === 'certificaciones' && <Certificaciones />}
      </div>
    </div>
  );
};

export default ModuloSupervisor;