import React, { useState } from 'react';
import { 
  Search, 
  ShieldCheck, 
  MessageSquareText, 
  ArrowLeft, 
  Scale, 
  MapPin, 
  Tag,
  X,
  ExternalLink
} from 'lucide-react';
import '../../styles/ClienteInicio.css';

const ClienteInicio = () => {
  const [busqueda, setBusqueda] = useState('');
  const [animalSeleccionado, setAnimalSeleccionado] = useState(null);
  const [certificadoModal, setCertificadoModal] = useState(null);

  // Datos simulados de vacas/lotes en venta estilo Mercado Libre
  const catalogoAnimales = [
    {
      id: 'LOTE-401',
      titulo: 'Lote Toros Hereford Seleccionados (10 Cabezas)',
      precio: '$4.500.000 ARS',
      pesoPromedio: '480 kg',
      categoria: 'Toros Reproductores',
      origen: 'Estancia El Retiro, Buenos Aires',
      imagen: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80',
      certificadoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
      descripcion: 'Lote de excelente genética Hereford, ideales para reproducción. Vacunación al día, aptos para traslado inmediato con DTE de Senasa emitido.'
    },
    {
      id: 'LOTE-402',
      titulo: 'Novillos Angus para Faena (15 Cabezas)',
      precio: '$6.200.000 ARS',
      pesoPromedio: '430 kg',
      categoria: 'Novillos Gordos',
      origen: 'Estancia La Constancia, Córdoba',
      imagen: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80',
      certificadoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
      descripcion: 'Novillos terminados a grano, excelente rendimiento de gancho estimado en 58%. Documentación sanitaria completa disponible.'
    },
    {
      id: 'LOTE-403',
      titulo: 'Vaquillonas Terneras Destete (20 Cabezas)',
      precio: '$5.800.000 ARS',
      pesoPromedio: '260 kg',
      categoria: 'Recría / Invernada',
      origen: 'Campo San José, Santa Fe',
      imagen: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80',
      certificadoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
      descripcion: 'Terneras Angus y Hereford destetadas, con buen desarrollo óseo y sanitarios completos (Brucelosis y Carbunclo negativos).'
    }
  ];

  const filtrados = catalogoAnimales.filter(item => 
    item.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
    item.categoria.toLowerCase().includes(busqueda.toLowerCase()) ||
    item.origen.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="cli-container">
      <div className="cli-wrapper">
        
        {/* VISTA 1: DETALLE DE PRODUCTO (TIPO MERCADO LIBRE) */}
        {animalSeleccionado ? (
          <div className="cli-detail-view">
            <button className="cli-btn-back" onClick={() => setAnimalSeleccionado(null)}>
              <ArrowLeft className="cli-icon-sm" /> Volver al catálogo
            </button>

            <div className="cli-detail-card">
              <div className="cli-detail-img-container">
                <img src={animalSeleccionado.imagen} alt={animalSeleccionado.titulo} className="cli-detail-img" />
              </div>
              
              <div className="cli-detail-info">
                <span className="cli-badge-cat">{animalSeleccionado.categoria}</span>
                <h2 className="cli-detail-title">{animalSeleccionado.titulo}</h2>
                <div className="cli-detail-price">{animalSeleccionado.precio}</div>
                <p className="cli-detail-subtext">Precio referencial sujeto a negociación directa.</p>

                <div className="cli-specs-box">
                  <div className="cli-spec-item">
                    <Scale className="cli-icon-xs text-primary" />
                    <span>Peso promedio: <strong>{animalSeleccionado.pesoPromedio}</strong></span>
                  </div>
                  <div className="cli-spec-item">
                    <MapPin className="cli-icon-xs text-primary" />
                    <span>Origen: <strong>{animalSeleccionado.origen}</strong></span>
                  </div>
                </div>

                <div className="cli-actions-box">
                  <button 
                    className="cli-btn-cert"
                    onClick={() => setCertificadoModal(animalSeleccionado.certificadoUrl)}
                  >
                    <ShieldCheck className="cli-icon-sm" /> Ver Certificado Sanitario (DTE)
                  </button>
                  <button className="cli-btn-chat" onClick={() => alert('Redirigiendo al chat con el Administrador/Supervisor...')}>
                    <MessageSquareText className="cli-icon-sm" /> Consultar Precio por Chat
                  </button>
                </div>

                <div className="cli-description-section">
                  <h4>Descripción del Lote</h4>
                  <p>{animalSeleccionado.descripcion}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* VISTA 2: CATÁLOGO GENERAL (ESTILO E-COMMERCE) */
          <>
            <div className="cli-header">
              <div>
                <h2 className="cli-title">Catálogo de Ganado</h2>
                <h3 className="cli-subtitle">Explore lotes disponibles y consulte condiciones directamente</h3>
              </div>
            </div>

            {/* BARRA DE BÚSQUEDA */}
            <div className="cli-toolbar">
              <div className="cli-search-container">
                <Search className="cli-search-icon" />
                <input 
                  type="text" 
                  placeholder="Buscar por raza, categoría u origen..." 
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="cli-search-input"
                />
              </div>
            </div>

            {/* GRID DE PRODUCTOS */}
            <div className="cli-grid">
              {filtrados.map((item) => (
                <div 
                  key={item.id} 
                  className="cli-product-card"
                  onClick={() => setAnimalSeleccionado(item)}
                >
                  <div className="cli-product-img-box">
                    <img src={item.imagen} alt={item.titulo} className="cli-product-img" />
                    <span className="cli-card-badge">{item.categoria}</span>
                  </div>
                  <div className="cli-product-content">
                    <span className="cli-product-id">#{item.id}</span>
                    <h3 className="cli-product-title">{item.titulo}</h3>
                    <div className="cli-product-price">{item.precio}</div>
                    <div className="cli-product-footer">
                      <span className="cli-product-weight"><Scale className="cli-icon-xs" /> {item.pesoPromedio}</span>
                      <span className="cli-product-link">Ver detalle →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

      </div>

      {/* MODAL PARA VER EL CERTIFICADO */}
      {certificadoModal && (
        <div className="cli-modal-overlay" onClick={() => setCertificadoModal(null)}>
          <div className="cli-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="cli-modal-close" onClick={() => setCertificadoModal(null)}>
              <X className="cli-icon-sm" />
            </button>
            <h3 className="cli-modal-title">Certificado Sanitario Oficial (Senasa)</h3>
            <div className="cli-modal-img-container">
              <img src={certificadoModal} alt="Certificado Sanitario" className="cli-modal-img" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClienteInicio;