import React, { useState } from 'react';
import { 
  FileCheck, 
  Search, 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  ShieldCheck,
  Eye,
  Upload,
  X
} from 'lucide-react';
import '../../styles/Certificaciones.css';

const Certificaciones = () => {
  const [busqueda, setBusqueda] = useState('');
  const [imagenModal, setImagenModal] = useState(null); // Estado para abrir la foto del comprobante

  // Datos simulados de certificaciones con la referencia al archivo adjunto
  const [certificados, setCertificados] = useState([
    { id: 'DTE-84920', tipo: 'Guía / DTE Senasa', emisor: 'Estancia El Retiro', vehiculo: 'Camión AB123CD', estado: 'Aprobado', fecha: '24/10/2024', archivo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80' },
    { id: 'DTE-84921', tipo: 'Certificado Sanitario Aftosa', emisor: 'Veterinaria Zonal Norte', vehiculo: 'Camión AB123CD', estado: 'Aprobado', fecha: '24/10/2024', archivo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80' },
    { id: 'DTE-84895', tipo: 'Guía de Tránsito Animal', emisor: 'Estancia La Constancia', vehiculo: 'Camión EF456GH', estado: 'Pendiente', fecha: '24/10/2024', archivo: null },
    { id: 'DTE-84712', tipo: 'Permiso de Despacho Exportación', emisor: 'Senasa Central', vehiculo: 'Camión JKL789', estado: 'Rechazado', fecha: '23/10/2024', archivo: null },
  ]);

  const filtrados = certificados.filter(item => 
    item.id.toLowerCase().includes(busqueda.toLowerCase()) ||
    item.tipo.toLowerCase().includes(busqueda.toLowerCase()) ||
    item.vehiculo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="cert-container">
      <div className="cert-wrapper">
        
        {/* ENCABEZADO */}
        <div className="cert-header">
          <div>
            <h2 className="cert-title">Control de Certificaciones</h2>
            <h3 className="cert-subtitle">Verificación de DTE, guías de traslado y comprobantes digitales</h3>
          </div>
          <div className="cert-badge-total">
            <ShieldCheck className="cert-icon-sm" /> Módulo de Fiscalización
          </div>
        </div>

        {/* BARRA DE BÚSQUEDA Y ACCIÓN */}
        <div className="cert-toolbar">
          <div className="cert-search-container">
            <Search className="cert-search-icon" />
            <input 
              type="text" 
              placeholder="Buscar por N° DTE, tipo o vehículo..." 
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="cert-search-input"
            />
          </div>
          <label className="cert-btn-upload">
            <Upload className="cert-icon-sm" /> Subir Certificado / Imagen
            <input type="file" style={{ display: 'none' }} accept="image/*,.pdf" />
          </label>
        </div>

        {/* TABLA DE CERTIFICACIONES */}
        <div className="cert-card">
          <div className="cert-table-responsive">
            <table className="cert-table">
              <thead>
                <tr>
                  <th>N° Certificado / DTE</th>
                  <th>Tipo de Documento</th>
                  <th>Origen / Emisor</th>
                  <th>Transporte Asociado</th>
                  <th>Comprobante</th>
                  <th>Estado</th>
                  <th className="text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtrados.map((item) => (
                  <tr key={item.id}>
                    <td className="cert-td-id"><strong>#{item.id}</strong></td>
                    <td>{item.tipo}</td>
                    <td className="cert-td-muted">{item.emisor}</td>
                    <td><span className="cert-pill-transport">{item.vehiculo}</span></td>
                    <td>
                      {item.archivo ? (
                        <button 
                          className="cert-btn-view" 
                          onClick={() => setImagenModal(item.archivo)}
                        >
                          <Eye className="cert-icon-xs" /> Ver Imagen
                        </button>
                      ) : (
                        <span className="cert-text-none">Sin adjunto</span>
                      )}
                    </td>
                    <td>
                      {item.estado === 'Aprobado' && (
                        <span className="cert-badge success">
                          <CheckCircle className="cert-icon-xs" /> Aprobado
                        </span>
                      )}
                      {item.estado === 'Pendiente' && (
                        <span className="cert-badge warning">
                          <AlertCircle className="cert-icon-xs" /> Pendiente
                        </span>
                      )}
                      {item.estado === 'Rechazado' && (
                        <span className="cert-badge danger">
                          <XCircle className="cert-icon-xs" /> Rechazado
                        </span>
                      )}
                    </td>
                    <td className="text-right">
                      <button className="cert-btn-action">Revisar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* MODAL PARA PREVISUALIZAR LA IMAGEN */}
      {imagenModal && (
        <div className="cert-modal-overlay" onClick={() => setImagenModal(null)}>
          <div className="cert-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="cert-modal-close" onClick={() => setImagenModal(null)}>
              <X className="cert-icon-sm" />
            </button>
            <h3 className="cert-modal-title">Vista previa del Comprobante</h3>
            <div className="cert-modal-img-container">
              <img src={imagenModal} alt="Comprobante Certificado" className="cert-modal-img" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certificaciones;