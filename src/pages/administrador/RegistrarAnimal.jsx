import React, { useState } from 'react';
import { PlusCircle, Image, CheckCircle2, ShieldAlert } from 'lucide-react';
import { animalesService } from '../../services/animalesService';

const RegistrarAnimal = () => {
  // ID del administrador actual (puedes cambiarlo según tu sesión o localStorage)
  const adminId = 1; 

  const [formData, setFormData] = useState({
    especie: '',
    raza: '',
    peso: '',
    edad: '',
    codigoRfid: '',
    estado: 'Activo',
    imagen: ''
  });

  const [mensajeExito, setMensajeExito] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      await animalesService.registrarAnimal(adminId, formData);
      setMensajeExito(true);
      setFormData({
        especie: '',
        raza: '',
        peso: '',
        edad: '',
        codigoRfid: '',
        estado: 'Activo',
        imagen: ''
      });
      setTimeout(() => setMensajeExito(false), 4000);
    } catch (err) {
      console.error("Error al registrar animal:", err);
      setError("No se pudo registrar el animal en el servidor. Verifique los datos o el código RFID único.");
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '30px', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
      <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#10b981', marginBottom: '20px' }}>
        <PlusCircle /> Registrar Nuevo Animal / Lote
      </h2>

      {mensajeExito && (
        <div style={{ padding: '12px', marginBottom: '20px', background: '#e6f4ea', color: '#137333', borderRadius: '6px', border: '1px solid #34a853', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={20} /> ¡Animal registrado con éxito y publicado en el catálogo!
        </div>
      )}

      {error && (
        <div style={{ padding: '12px', marginBottom: '20px', background: '#fce8e6', color: '#c5221f', borderRadius: '6px', border: '1px solid #ea4335', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldAlert size={20} /> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '14px' }}>Especie / Título del Lote:</label>
          <input 
            type="text" 
            name="especie" 
            placeholder="Ej. Toro Hereford, Novillos Gordos" 
            value={formData.especie} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '14px' }}>Raza:</label>
            <input 
              type="text" 
              name="raza" 
              placeholder="Ej. Hereford, Angus" 
              value={formData.raza} 
              onChange={handleChange} 
              required 
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '14px' }}>Peso Promedio (kg):</label>
            <input 
              type="number" 
              step="0.01" 
              name="peso" 
              placeholder="Ej. 480" 
              value={formData.peso} 
              onChange={handleChange} 
              required 
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '14px' }}>Edad (Años):</label>
            <input 
              type="number" 
              name="edad" 
              placeholder="Ej. 2" 
              value={formData.edad} 
              onChange={handleChange} 
              required 
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '14px' }}>Código RFID (Único):</label>
            <input 
              type="text" 
              name="codigoRfid" 
              placeholder="Ej. RFID-99823" 
              value={formData.codigoRfid} 
              onChange={handleChange} 
              required 
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '14px' }}>URL de la Imagen:</label>
          <div style={{ position: 'relative' }}>
            <Image style={{ position: 'absolute', left: '10px', top: '12px', color: '#666' }} size={18} />
            <input 
              type="url" 
              name="imagen" 
              placeholder="https://images.unsplash.com/..." 
              value={formData.imagen} 
              onChange={handleChange} 
              style={{ width: '100%', padding: '10px 10px 10px 36px', borderRadius: '6px', border: '1px solid #ccc' }}
            />
          </div>
          <small style={{ color: '#666', fontSize: '12px' }}>Pega el enlace web de una imagen para mostrarla en el catálogo del cliente.</small>
        </div>

        <button 
          type="submit" 
          style={{ 
            marginTop: '10px', 
            background: '#10b981', 
            color: 'white', 
            border: 'none', 
            padding: '12px', 
            borderRadius: '6px', 
            fontWeight: 'bold', 
            fontSize: '16px', 
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(16, 185, 129, 0.2)'
          }}
        >
          Guardar y Publicar Animal
        </button>
      </form>
    </div>
  );
};

export default RegistrarAnimal;