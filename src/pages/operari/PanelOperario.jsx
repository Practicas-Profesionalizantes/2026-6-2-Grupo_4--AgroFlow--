import React from 'react';
import { 
  Footprints, 
  ClipboardList, 
  Truck, 
  CheckSquare, 
  RotateCcw, 
  ArrowRight, 
  RefreshCw,
  Package,
  FileText,
  Clock
} from 'lucide-react';
import '../../styles/PanelOperario.css';

const PanelOperario = () => {
  return (
    <div className="po-container">
      {/* Header del Panel */}
      <header className="po-header">
        <div>
          <h2 className="po-title">Panel de Control - Operario</h2>
          <h3 className="po-subtitle">Resumen de Tareas y Accesos Rápidos</h3>
        </div>

        <div className="po-header-right">
          <span className="po-badge-turno">Turno Tarde: Manga Abierta</span>
        </div>
      </header>

      {/* Grilla de Métricas: 4 columnas */}
      <main className="po-metrics-grid">
        {/* Card 1 */}
        <div className="po-card">
          <span className="po-tag po-tag-urgent">Urgente</span>
          <div className="po-card-header">
            <div className="po-icon-box po-bg-blue">
              <Footprints className="po-icon po-text-blue" />
            </div>
            <span className="po-card-title">Animales por Agrupar</span>
          </div>
          <h2 className="po-card-value">
            30 <span className="po-card-unit">cabezas</span>
          </h2>
          <div className="po-card-footer-link">
            <a href="#traslado" className="po-link">
              <ArrowRight className="po-link-icon po-text-amber" />
              <span>Pendientes de traslado al Corral #3</span>
            </a>
          </div>
        </div>

        {/* Card 2 */}
        <div className="po-card">
          <span className="po-tag po-tag-general">General</span>
          <div className="po-card-header">
            <div className="po-icon-box po-bg-green">
              <ClipboardList className="po-icon po-text-green" />
            </div>
            <span className="po-card-title">Estado del Ganado</span>
          </div>
          <h2 className="po-card-value">
            1.200 <span className="po-card-unit">cabezas</span>
          </h2>
          <span className="po-active-label">Activos</span>
          <div className="po-tags-group">
            <span className="po-mini-tag po-tag-envio">2 En Envío</span>
            <span className="po-mini-tag po-tag-fallecido">1 Fallecido</span>
            <span className="po-mini-tag po-tag-obs">12 Observación</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="po-card">
          <span className="po-tag po-tag-anden">En Andén</span>
          <div className="po-card-header">
            <div className="po-icon-box po-bg-orange">
              <Truck className="po-icon po-text-orange" />
            </div>
            <span className="po-card-title">Camión en Andén</span>
          </div>
          <h2 className="po-card-value">
            1 <span className="po-card-unit">unidad</span>
          </h2>
          <div className="po-card-footer-link">
            <a href="#transp" className="po-link">
              <Truck className="po-link-icon po-text-navy" />
              <span>Transp. Don Pedro • Pate...</span>
            </a>
          </div>
        </div>

        {/* Card 4 */}
        <div className="po-card">
          <span className="po-tag po-tag-hoy">Hoy</span>
          <div className="po-card-header">
            <div className="po-icon-box po-bg-slate">
              <CheckSquare className="po-icon po-text-slate" />
            </div>
            <span className="po-card-title">Registros Guardados</span>
          </div>
          <h2 className="po-card-value">
            14 <span className="po-card-unit">fichas</span>
          </h2>
          <div className="po-sync-info">
            <RefreshCw className="po-sync-icon" />
            <span>Última sincronización: hace 8 min</span>
          </div>
        </div>
      </main>

      {/* Sección Inferior: 2 Columnas (Instrucciones e Historial) */}
      <section className="po-bottom-grid">
        {/* Columna Izquierda: Instrucciones Pendientes */}
        <div className="po-bottom-card">
          <div>
            <div className="po-bottom-card-header">
              <div className="po-bottom-title-wrapper">
                <ClipboardList className="po-bottom-header-icon" />
                <h3 className="po-bottom-title">Instrucciones Pendientes del Supervisor</h3>
              </div>
              <span className="po-badge-nuevas">3 Nuevas</span>
            </div>

            {/* Sub-item 1 */}
            <div className="po-sub-item">
              <div className="po-sub-item-top">
                <span className="po-time-blue">14:45 hs</span>
                <span className="po-badge-alta">Prioridad Alta</span>
              </div>
              <p className="po-sub-title">Enviar 15 Novillos al Corral de Agrupamiento #3</p>
              <p className="po-sub-desc">Revisar caravana visual amarilla. Separar los más pesados.</p>
            </div>

            {/* Sub-item 2 */}
            <div className="po-sub-item">
              <div className="po-sub-item-top">
                <span className="po-time-blue">13:20 hs</span>
                <span className="po-badge-media">Prioridad Media</span>
              </div>
              <p className="po-sub-title">Verificar caravanas electrónicas del Lote L-204 antes de pesaje</p>
              <p className="po-sub-desc">Usar lector bastón Bluetooth #04. Chequear batería previa.</p>
            </div>

            {/* Sub-item 3 */}
            <div className="po-sub-item">
              <div className="po-sub-item-top">
                <span className="po-time-gray">11:15 hs</span>
                <span className="po-badge-completada">✓ Completada</span>
              </div>
              <p className="po-sub-title po-completed">Revisión de bebederos y manga en Corral-4B</p>
              <p className="po-sub-desc po-green-text">Finalizado sin novedades de rotura o fuga de agua.</p>
            </div>
          </div>

          <div className="po-bottom-footer">
            <a href="#todas" className="po-footer-link">
              <span>Ver todas las instrucciones del supervisor</span>
              <ArrowRight className="po-footer-arrow" />
            </a>
          </div>
        </div>

        {/* Columna Derecha: Últimas Actualizaciones */}
        <div className="po-bottom-card">
          <div>
            <div className="po-bottom-card-header">
              <div className="po-bottom-title-wrapper">
                <Clock className="po-bottom-header-icon" />
                <h3 className="po-bottom-title">Últimas Actualizaciones de Estado y Registros</h3>
              </div>
              <span className="po-badge-actividad">Actividad de hoy</span>
            </div>

            {/* Log item 1 */}
            <div className="po-sub-item">
              <div className="po-sub-item-top">
                <span className="po-time-blue">14:10 hs</span>
                <span className="po-status-envio">En Envío</span>
              </div>
              <p className="po-sub-title">ID #4821 registrado como En Envío</p>
              <p className="po-sub-desc">Transporte Lote L-204</p>
            </div>

            {/* Log item 2 */}
            <div className="po-sub-item">
              <div className="po-sub-item-top">
                <span className="po-time-blue">13:10 hs</span>
                <span className="po-status-despachada">Despachada</span>
              </div>
              <p className="po-sub-title">Carga confirmada en Camión AB123CD</p>
              <p className="po-sub-desc">32 animales embarcados exitosamente hacia Frigorífico Sur.</p>
            </div>

            {/* Log item 3 */}
            <div className="po-sub-item">
              <div className="po-sub-item-top">
                <span className="po-time-blue">12:05 hs</span>
                <span className="po-status-fallecido">Fallecido</span>
              </div>
              <p className="po-sub-title">Novillo ID #3910 registrado como Fallecido</p>
              <p className="po-sub-desc">Reporte de baja en Corral #2</p>
            </div>

            {/* Log item 4 */}
            <div className="po-sub-item">
              <div className="po-sub-item-top">
                <span className="po-time-blue">10:50 hs</span>
                <span className="po-status-activa">Activa</span>
              </div>
              <p className="po-sub-title">Movimiento y verificación de 15 animales activos</p>
              <p className="po-sub-desc">Traslado completado desde piquete 2 al corral de reposo.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PanelOperario;