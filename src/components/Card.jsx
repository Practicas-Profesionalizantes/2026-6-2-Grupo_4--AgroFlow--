import React from 'react';
import { Activity } from 'lucide-react';

function Card({ 
  titulo = "TÍTULO", 
  valor = "$0", 
  unidadValor = "", 
  subtexto = "", 
  tendencia = "", 
  tipoTendencia = "success", 
  icono = <Activity className="w-5 h-5 text-blue-600" />,
  esLogistica = false,
  linkTexto = "",
  linkUrl = "#"
}) {
  return (
    <div className={`metric-card ${esLogistica ? 'card-logistica' : ''}`}>
      <div className="card-header">
        <span className="card-title">{titulo}</span>
        <div className="card-icon blue-light">{icono}</div>
      </div>

      <h2 className="card-value">
        {valor} {unidadValor && <span className="card-value-sub">{unidadValor}</span>}
      </h2>

      {subtexto && <span className="card-subtext">{subtexto}</span>}

      {tendencia && (
        <div className={`card-trend ${tipoTendencia}`}>
          📈 {tendencia}
        </div>
      )}

      {linkTexto && (
        <a href={linkUrl} className="link-rastreo">
          {linkTexto}
        </a>
      )}

      {esLogistica && <div className="watermark-icon">{icono}</div>}
    </div>
  );
}

export default Card;