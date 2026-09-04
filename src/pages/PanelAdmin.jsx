import React from 'react';
import Card from '../components/Card';
import { 
  DollarSign, 
  Calendar, 
  Beef, 
  Truck, 
  ArrowLeftRight, 
  Zap, 
  PlusCircle, 
  FileText, 
  Download, 
  ArrowRight 
} from 'lucide-react';
import '../styles/PanelAdmin.css';

function PanelAdmin() {
  return (
    <div className="panel-admin-container">
        
      <div className="cards-grid">
        <Card 
          titulo="GANANCIAS TOTALES"
          valor="$18.450.000"
          subtexto="ARS"
          tendencia="+12% vs mes anterior"
          icono={<DollarSign className="w-5 h-5 text-emerald-600" />}
        />

        <Card 
          titulo="GANANCIAS DEL MES"
          valor="$4.200.000"
          subtexto="ARS"
          tendencia="+5% vs meta"
          icono={<Calendar className="w-5 h-5 text-blue-600" />}
        />

        <Card 
          titulo="TOTAL DE ANIMALES"
          valor="1.240"
          unidadValor="Cabezas"
          subtexto="En 4 establecimientos"
          icono={<Beef className="w-5 h-5 text-amber-700" />}
        />

        <Card 
          titulo="LOGÍSTICA EN CURSO"
          valor="3"
          unidadValor="Camiones en Ruta"
          linkTexto="Ver rastreo →"
          linkUrl="#rastreo"
          icono={<Truck className="w-5 h-5 text-indigo-600" />}
          esLogistica={true}
        />
      </div>

      <div className="dashboard-content-grid">
        <div className="table-card">
          <div className="section-title">
            <ArrowLeftRight className="w-5 h-5 text-slate-600" />
            <h3>Logística y Ventas Recientes</h3>
          </div>

          <table className="recent-sales-table">
            <thead>
              <tr>
                <th>ID / FECHA</th>
                <th>CLIENTE / DESTINO</th>
                <th>LOTE (CABEZAS)</th>
                <th>ESTADO</th>
                <th>ACCIÓN</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>

          <div className="table-empty-state">
            <p>No hay transacciones registradas por el momento.</p>
          </div>

          <div className="table-footer">
            <button className="btn-view-all">Ver historial completo</button>
          </div>
        </div>

        <div className="quick-access-card">
          <div className="section-title">
            <Zap className="w-5 h-5 text-amber-500" />
            <h3>Accesos Rápidos</h3>
          </div>

          <div className="quick-buttons-list">
            <button className="quick-btn primary">
              <span className="btn-icon-left"><PlusCircle className="w-4 h-4" /></span>
              <span>Registrar Nueva Venta</span>
              <span className="btn-icon-right"><ArrowRight className="w-4 h-4" /></span>
            </button>

            <button className="quick-btn primary">
              <span className="btn-icon-left"><Truck className="w-4 h-4" /></span>
              <span>Programar Despacho</span>
              <span className="btn-icon-right"><ArrowRight className="w-4 h-4" /></span>
            </button>

            <button className="quick-btn primary">
              <span className="btn-icon-left"><Beef className="w-4 h-4" /></span>
              <span>Ingreso de Hacienda</span>
              <span className="btn-icon-right"><ArrowRight className="w-4 h-4" /></span>
            </button>

            <button className="quick-btn outline">
              <span className="btn-icon-left"><FileText className="w-4 h-4" /></span>
              <span>Generar Reporte</span>
              <span className="btn-icon-right"><Download className="w-4 h-4" /></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PanelAdmin;