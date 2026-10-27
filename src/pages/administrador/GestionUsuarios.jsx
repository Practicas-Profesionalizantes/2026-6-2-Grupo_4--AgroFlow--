import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  UserPlus, 
  Edit2, 
  Trash2, 
  Shield, 
  User, 
  X 
} from 'lucide-react';
import '../../styles/GestionUsuarios.css';

const GestionUsuarios = () => {
  const [busqueda, setBusqueda] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  
  // Estado del formulario para Crear / Editar
  const [usuarioActual, setUsuarioActual] = useState({
    id: null,
    nombre: '',
    email: '',
    rol: 'Operario',
    estado: 'Activo'
  });

  // Datos simulados de usuarios basados en tu sistema
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: 'Ignacio Alvarez', email: 'admin@agroflow.com', rol: 'Administrador', estado: 'Activo' },
    { id: 2, nombre: 'Martín Rivas', email: 'mrivas@agroflow.com', rol: 'Operario', estado: 'Activo' },
    { id: 3, nombre: 'Juan Pérez', email: 'jperez@agroflow.com', rol: 'Operario', estado: 'Activo' },
    { id: 4, nombre: 'Carlos Supervisor', email: 'csupervisor@agroflow.com', rol: 'Supervisor', estado: 'Activo' },
  ]);

  const usuariosFiltrados = usuarios.filter(u => 
    u.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    u.email.toLowerCase().includes(busqueda.toLowerCase()) ||
    u.rol.toLowerCase().includes(busqueda.toLowerCase())
  );

  const abrirModalCrear = () => {
    setModoEdicion(false);
    setUsuarioActual({ id: null, nombre: '', email: '', rol: 'Operario', estado: 'Activo' });
    setModalAbierto(true);
  };

  const abrirModalEditar = (user) => {
    setModoEdicion(true);
    setUsuarioActual(user);
    setModalAbierto(true);
  };

  const eliminarUsuario = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      setUsuarios(usuarios.filter(u => u.id !== id));
    }
  };

  const guardarUsuario = (e) => {
    e.preventDefault();
    if (modoEdicion) {
      setUsuarios(usuarios.map(u => u.id === usuarioActual.id ? usuarioActual : u));
    } else {
      const nuevo = { ...usuarioActual, id: usuarios.length + 1 };
      setUsuarios([...usuarios, nuevo]);
    }
    setModalAbierto(false);
  };

  return (
    <div className="gu-container">
      <div className="gu-wrapper">
        
        {/* ENCABEZADO */}
        <div className="gu-header">
          <div>
            <h2 className="gu-title">Gestión de Usuarios</h2>
            <h3 className="gu-subtitle">Administración de cuentas, roles y permisos de acceso al sistema</h3>
          </div>
          <button className="gu-btn-primary" onClick={abrirModalCrear}>
            <UserPlus className="gu-icon-sm" /> Nuevo Usuario
          </button>
        </div>

        {/* BARRA DE BÚSQUEDA */}
        <div className="gu-toolbar">
          <div className="gu-search-container">
            <Search className="gu-search-icon" />
            <input 
              type="text" 
              placeholder="Buscar por nombre, correo o rol..." 
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="gu-search-input"
            />
          </div>
        </div>

        {/* TABLA DE USUARIOS */}
        <div className="gu-card">
          <div className="gu-table-responsive">
            <table className="gu-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre y Apellido</th>
                  <th>Correo Electrónico</th>
                  <th>Rol Asignado</th>
                  <th>Estado</th>
                  <th className="text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuariosFiltrados.map((user) => (
                  <tr key={user.id}>
                    <td className="gu-td-id">#USR-{user.id}</td>
                    <td><strong>{user.nombre}</strong></td>
                    <td className="gu-td-muted">{user.email}</td>
                    <td>
                      <span className={`gu-role-pill ${user.rol.toLowerCase()}`}>
                        {user.rol === 'Administrador' && <Shield className="gu-icon-xs" />}
                        {user.rol !== 'Administrador' && <User className="gu-icon-xs" />}
                        {user.rol}
                      </span>
                    </td>
                    <td>
                      <span className="gu-status-pill active">{user.estado}</span>
                    </td>
                    <td className="text-right gu-actions-cell">
                      <button className="gu-btn-action edit" onClick={() => abrirModalEditar(user)}>
                        <Edit2 className="gu-icon-xs" /> Editar
                      </button>
                      <button className="gu-btn-action delete" onClick={() => eliminarUsuario(user.id)}>
                        <Trash2 className="gu-icon-xs" /> Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* MODAL PARA CREAR / EDITAR */}
      {modalAbierto && (
        <div className="gu-modal-overlay" onClick={() => setModalAbierto(false)}>
          <div className="gu-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="gu-modal-close" onClick={() => setModalAbierto(false)}>
              <X className="gu-icon-sm" />
            </button>
            <h3 className="gu-modal-title">
              {modoEdicion ? 'Editar Usuario' : 'Registrar Nuevo Usuario'}
            </h3>

            <form onSubmit={guardarUsuario} className="gu-form">
              <div className="gu-form-group">
                <label>Nombre Completo</label>
                <input 
                  type="text" 
                  required 
                  value={usuarioActual.nombre} 
                  onChange={(e) => setUsuarioActual({...usuarioActual, nombre: e.target.value})}
                  placeholder="Ej. Juan Pérez"
                  className="gu-input"
                />
              </div>

              <div className="gu-form-group">
                <label>Correo Electrónico</label>
                <input 
                  type="email" 
                  required 
                  value={usuarioActual.email} 
                  onChange={(e) => setUsuarioActual({...usuarioActual, email: e.target.value})}
                  placeholder="usuario@agroflow.com"
                  className="gu-input"
                />
              </div>

              <div className="gu-form-group">
                <label>Rol en el Sistema</label>
                <select 
                  value={usuarioActual.rol} 
                  onChange={(e) => setUsuarioActual({...usuarioActual, rol: e.target.value})}
                  className="gu-input"
                >
                  <option value="Operario">Operario</option>
                  <option value="Supervisor">Supervisor</option>
                  <option value="Administrador">Administrador</option>
                </select>
              </div>

              <div className="gu-modal-buttons">
                <button type="button" className="gu-btn-secondary" onClick={() => setModalAbierto(false)}>
                  Cancelar
                </button>
                <button type="submit" className="gu-btn-primary">
                  {modoEdicion ? 'Guardar Cambios' : 'Crear Usuario'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionUsuarios;