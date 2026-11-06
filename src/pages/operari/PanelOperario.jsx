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

        // 1. Carga segura de animales
        try {
          const listaAnimales = await obtenerTodosLosAnimales();
          if (listaAnimales) setAnimales(listaAnimales);
        } catch (errAnim) {
          console.error("Error individual al cargar animales:", errAnim);
        }

        // 2. Carga segura de viajes activos
        try {
          const listaViajes = await obtenerViajesActivos('Entregado');
          if (listaViajes) setViajesActivos(listaViajes);
        } catch (errViajes) {
          console.error("Error individual al cargar viajes:", errViajes);
        }

        // 3. Carga de auditoría enviando el operarioId como adminId y usuarioId para que se audite a sí mismo
        try {
          // Respetamos la firma exacta de tu service frontend: primero adminId, segundo usuarioId
          const historialLogs = await obtenerAuditoriaDeUsuario(operarioId, operarioId) || [];

          // Obtenemos la fecha de hoy en formato clásico de base de datos (YYYY-MM-DD)
          const hoy = new Date();
          const yyyy = hoy.getFullYear();
          const mm = String(hoy.getMonth() + 1).padStart(2, '0');
          const dd = String(hoy.getDate()).padStart(2, '0');
          const fechaHoyBD = `${yyyy}-${mm}-${dd}`; // Resultado: "2026-10-30"

          // Filtramos de forma directa buscando el texto de la fecha dentro de la columna de tu base de datos
          const logsDeHoy = historialLogs.filter(log => {
            const campoFecha = log.fecha_hora || log.fechaHora || log.fecha;
            if (!campoFecha) return false;

            // Al hacer include de "2026-10-30", machecará de forma exacta los registros de tu phpMyAdmin
            return campoFecha.toString().includes(fechaHoyBD);
          });

          setActividadesHoy(logsDeHoy);
        } catch (errAuditoria) {

          console.error("Error al obtener las actividades del operario logueado:", errAuditoria);
          setActividadesHoy([]);
        }



      } catch (error) {
        console.error("Error general en el panel:", error);
      } finally {
        setCargando(false);
      }
    };

    if (operarioId) {
      cargarDatosPanel();
    }
  }, [operarioId]);


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

      </main>
    </div>
  );
};

export default PanelOperario;