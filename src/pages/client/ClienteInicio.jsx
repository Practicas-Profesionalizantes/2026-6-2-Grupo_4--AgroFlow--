import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ArrowLeft, 
  Scale, 
  MapPin,
  CheckCircle2,
  ShoppingCart
} from 'lucide-react';
import { clienteService } from '../../services/clienteService';
import '../../styles/ClienteInicio.css';

const ClienteInicio = () => {
  const clienteId = 3; 

  const [busqueda, setBusqueda] = useState('');
  const [animalSeleccionado, setAnimalSeleccionado] = useState(null);
  const [catalogoAnimales, setCatalogoAnimales] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Estado para manejar cuando el pedido ya fue enviado
  const [pedidoEnCurso, setPedidoEnCurso] = useState(false);

  const obtenerImagenPorDefecto = (especie) => {
    const esp = (especie || '').toLowerCase();
    if (esp.includes('toro')) {
      return 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80';
    } else if (esp.includes('novillo')) {
      return 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80';
    }
    return 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80';
  };

  useEffect(() => {
    clienteService.listarAnimales()
      .then((data) => {
        const animalesActivos = data.filter(a => (a.estado || '').toLowerCase() === 'activo');
        const animalesMapeados = data.map(a => ({
          id: a.id,
          idString: `LOTE-${a.id}`,
          titulo: `${a.especie || 'Lote de Ganado'} - Raza: ${a.raza || 'General'}`,
          precio: a.peso ? (a.peso * 10000) : 5000000,
          precioFormateado: `$${(a.peso ? a.peso * 10000 : 5000000).toLocaleString()} ARS`,
          pesoPromedio: `${a.peso || 400} kg`,
          categoria: a.estado || 'Activo',
          origen: a.agrupamiento ? a.agrupamiento.nombreLote : 'Estancia AgroFlow',
          imagen: obtenerImagenPorDefecto(a.especie),
          descripcion: `Animal caravana RFID: ${a.codigoRfid || 'N/A'}. Edad: ${a.edad || 'N/D'} años. Sanidad y trazabilidad al día bajo normas de control.`,
          raw: a
        }));
        
        setCatalogoAnimales(animalesMapeados);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error al cargar el catálogo de animales:", err);
        setLoading(false);
      });
  }, []);

  const filtrados = catalogoAnimales.filter(item => 
    item.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
    item.categoria.toLowerCase().includes(busqueda.toLowerCase()) ||
    item.origen.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleComprar = async () => {
    try {
      // Envía la compra/oferta al backend con el precio predeterminado del animal
      await clienteService.crearOferta(clienteId, animalSeleccionado.precio, animalSeleccionado.raw);
      setPedidoEnCurso(true);
    } catch (error) {
      console.error("Error al procesar la compra:", error);
      alert("No se pudo registrar el pedido en el servidor.");
    }
  };

  return (
    <div className="cli-container">
      <div className="cli-wrapper">
        
        {animalSeleccionado ? (
          <div className="cli-detail-view">
            <button className="cli-btn-back" onClick={() => { setAnimalSeleccionado(null); setPedidoEnCurso(false); }}>
              <ArrowLeft className="cli-icon-sm" /> Volver al catálogo
            </button>

            <div className="cli-detail-card">
              <div className="cli-detail-img-container">
                <img src={animalSeleccionado.imagen} alt={animalSeleccionado.titulo} className="cli-detail-img" />
              </div>
              
              <div className="cli-detail-info">
                <span className="cli-badge-cat">{animalSeleccionado.categoria}</span>
                <h2 className="cli-detail-title">{animalSeleccionado.titulo}</h2>
                <div className="cli-detail-price">{animalSeleccionado.precioFormateado}</div>

                <div className="cli-specs-box">
                  <div className="cli-spec-item">
                    <Scale className="cli-icon-xs text-primary" />
                    <span>Peso: <strong>{animalSeleccionado.pesoPromedio}</strong></span>
                  </div>
                  <div className="cli-spec-item">
                    <MapPin className="cli-icon-xs text-primary" />
                    <span>Origen: <strong>{animalSeleccionado.origen}</strong></span>
                  </div>
                </div>

                {/* BOTÓN DE COMPRA DIRECTA */}
                <div className="cli-actions-box" style={{ marginTop: '20px' }}>
                  {pedidoEnCurso ? (
                    <div style={{ padding: '15px', backgroundColor: '#e6f4ea', borderRadius: '8px', border: '1px solid #34a853', color: '#137333', textAlign: 'center' }}>
                      <CheckCircle2 style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} />
                      <strong>¡Pedido en curso!</strong> Su solicitud de compra ha sido enviada con éxito y está pendiente de aprobación.
                    </div>
                  ) : (
                    <button 
                      onClick={handleComprar}
                      style={{ 
                        width: '100%', 
                        backgroundColor: '#10b981', 
                        color: 'white', 
                        border: 'none', 
                        padding: '14px', 
                        borderRadius: '8px', 
                        cursor: 'pointer', 
                        fontWeight: 'bold',
                        fontSize: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        boxShadow: '0 4px 6px rgba(16, 185, 129, 0.2)'
                      }}
                    >
                      <ShoppingCart size={20} /> Comprar / Solicitar Pedido
                    </button>
                  )}
                </div>

                <div className="cli-description-section" style={{ marginTop: '20px' }}>
                  <h4>Descripción del Animal / Lote</h4>
                  <p>{animalSeleccionado.descripcion}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="cli-header">
              <div>
                <h2 className="cli-title">Catálogo de Ganado (AgroFlow)</h2>
                <h3 className="cli-subtitle">Explore los lotes disponibles y realice su compra de forma directa</h3>
              </div>
            </div>

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

            <div className="cli-grid">
              {loading ? (
                <p style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#666' }}>Cargando animales desde la base de datos...</p>
              ) : filtrados.length === 0 ? (
                <p style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#666' }}>No se encontraron animales registrados.</p>
              ) : (
                filtrados.map((item) => (
                  <div 
                    key={item.id} 
                    className="cli-product-card"
                    onClick={() => { setAnimalSeleccionado(item); setPedidoEnCurso(false); }}
                  >
                    <div className="cli-product-img-box">
                      <img src={item.imagen} alt={item.titulo} className="cli-product-img" />
                      <span className="cli-card-badge">{item.categoria}</span>
                    </div>
                    <div className="cli-product-content">
                      <span className="cli-product-id">#{item.idString}</span>
                      <h3 className="cli-product-title">{item.titulo}</h3>
                      <div className="cli-product-price">{item.precioFormateado}</div>
                      <div className="cli-product-footer">
                        <span className="cli-product-weight"><Scale className="cli-icon-xs" /> {item.pesoPromedio}</span>
                        <span className="cli-product-link">Ver detalle →</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default ClienteInicio;