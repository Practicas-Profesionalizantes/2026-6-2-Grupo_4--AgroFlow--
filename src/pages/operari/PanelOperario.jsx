import React, { useState, useEffect } from 'react';
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
import { obtenerTodosLosAnimales, obtenerViajesActivos } from '../../services/animalesService';
import '../../styles/PanelOperario.css';

const PanelOperario = () => {
  const [animales, setAnimales] = useState([]);
  const [viajesActivos, setViajesActivos] = useState([]);
  const [actividadesHoy, setActividadesHoy] = useState([]);
  const [cargando, setCargando] = useState(true);

  // 2. Obtención de la sesión del operario actual
  const usuarioLogueado = JSON.parse(localStorage.getItem('usuario')) || {};
  const operarioId = usuarioLogueado.id;

  // 3. Llamada a la API al cargar el componente
  useEffect(() => {
    const cargarDatosPanel = async () => {
      try {
        setCargando(true);
        const listaAnimales = await obtenerTodosLosAnimales();
        const listaViajes = await obtenerViajesActivos('Entregado'); // Filtra por el estado correspondiente

        setAnimales(listaAnimales);
        setViajesActivos(listaViajes);
      } catch (error) {
        console.error("Error al cargar datos del backend:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarDatosPanel();
  }, []);

  // 4. Mapeo y contadores dinámicos sincronizados con phpMyAdmin
  const totalCabezas = animales.filter(a => a.estado !== 'Muerto' && a.estado !== 'MUERTO').length;

  // 1. Filtramos todos los animales que están vivos
  const animalesVivos = animales.filter(a => a.estado !== 'Muerto' && a.estado !== 'MUERTO');

  // 2. IMPRIMIMOS EN CONSOLA: Abre la consola del navegador (F12) para ver cómo se llama el campo del lote
  console.log("REVISAR ESTO -> Estructura del primer animal recibido:", animales[0]);

  // 3. Filtro adaptativo: Si no detecta 'agrupamiento_id' o 'agrupamientoId', usamos una propiedad alternativa para identificar al Hereford sin lote
  const porAgrupar = animalesVivos.filter(a => {
    // 1. Si el backend envía la relación como un objeto (ej: agrupamiento: null o lote: null)
    if (a.hasOwnProperty('agrupamiento') && !a.agrupamiento) return true;
    if (a.hasOwnProperty('lote') && !a.lote) return true;

    // 2. Si el objeto existe pero evaluamos su ID interno (ej: agrupamiento.id)
    if (a.agrupamiento && typeof a.agrupamiento === 'object') return !a.agrupamiento.id;
    if (a.lote && typeof a.lote === 'object') return !a.lote.id;

    // 3. Si viene como un campo plano (agrupamientoId, agrupamiento_id, loteId, lote_id)
    const idDelLote = a.agrupamientoId ?? a.agrupamiento_id ?? a.loteId ?? a.lote_id;

    // Si el campo existe en el JSON, es sin lote si vale null, 0 o strings equivalentes
    if (idDelLote !== undefined) {
      return idDelLote === null || idDelLote === 0 || idDelLote === '0' || idDelLote === 'null';
    }

    // 4. Si el JSON no tiene ninguna propiedad de lote/agrupamiento, asumimos que no está agrupado
    return true;
  }).length;




  const activos = animales.filter(a => a.estado === 'Activo' || a.estado === 'ACTIVO').length;
  const enEnvio = animales.filter(a => a.estado === 'En Envío' || a.estado === 'EN_ENVIO' || a.estado === 'Vendido').length;
  const fallecidos = animales.filter(a => a.estado === 'Fallecido' || a.estado === 'FALLECIDO' || a.estado === 'Muerto' || a.estado === 'MUERTO').length;
  const observacion = animales.filter(a => a.estado === 'Observación' || a.estado === 'Baja' || a.estado === 'Enfermo').length;



  // 5. Pantalla de carga preventiva antes de renderizar la interfaz
  if (cargando) {
    return <div className="po-loading" style={{ padding: '2rem', textAlign: 'center' }}>Cargando panel de control...</div>;
  }

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
            {porAgrupar} <span className="po-card-unit">cabezas</span>
          </h2>
          <div className="po-card-footer-link">
            <a href="#" className="po-link">
              <ArrowRight className="po-link-icon po-text-amber" />
              <span>Sin lote asignado en el sistema</span>
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
            {totalCabezas} <span className="po-card-unit">cabezas</span>
          </h2>
          <span className="po-active-label">{activos} Activos</span>
          <div className="po-tags-group">
            <span className="po-mini-tag po-tag-envio">{enEnvio} En Envío</span>
            <span className="po-mini-tag po-tag-fallecido">{fallecidos} Fallecido</span>
            <span className="po-mini-tag po-tag-obs">{observacion} Observación</span>
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
            {viajesActivos.length} <span className="po-card-unit">{viajesActivos.length === 1 ? 'unidad' : 'unidades'}</span>
          </h2>
          <div className="po-card-footer-link">
            <a href="#transp" className="po-link">
              <Truck className="po-link-icon po-text-navy" />
              <span>
                {viajesActivos.length > 0
                  ? `${viajesActivos[0].transporte || 'En viaje'} • ${viajesActivos[0].patente || ''}`
                  : 'Sin camiones activos'}
              </span>
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