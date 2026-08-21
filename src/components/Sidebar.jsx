import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, Settings, LogOut } from 'lucide-react';
import { logoutUsuario } from "../services/usuarioService";
import logoAgro from '../assets/Agroflow logo.png';
import '../styles/Sidebar.css';

function Sidebar({ opcionesMenu = [] }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [colapsado, setColapsado] = useState(true);

    const manejarMouseEnter = () => {
        if (window.innerWidth > 768) setColapsado(false);
    };

    const manejarMouseLeave = () => {
        if (window.innerWidth > 768) setColapsado(true);
    };

    const cerrarSesion = () => {
        logoutUsuario(); 
        navigate("/", { replace: true }); 
    };

    return (
        <>
            {colapsado && (
                <button className="btn-toggle-sidebar" onClick={() => setColapsado(false)}>
                    <Menu size={24} />
                </button>
            )}

            {!colapsado && window.innerWidth <= 768 && (
                <div className="sidebar-overlay" onClick={() => setColapsado(true)} />
            )}

            <aside 
                className={`sidebar-container ${colapsado ? 'colapsado' : ''} ${!colapsado ? 'menu-movil-abierto' : ''}`}
                onMouseEnter={manejarMouseEnter}
                onMouseLeave={manejarMouseLeave}
            >
                <div className="sidebar-marca">
                    <div className="sidebar-info-logo">
                        <img src={logoAgro} alt="AgroFlow Logo" className="sidebar-logo" />
                        <h1 className="sidebar-titulo">AGROFLOW</h1>
                    </div>
                </div>

                <nav className="sidebar-menu">
                    {opcionesMenu.map((opcion, index) => (
                        <div
                            key={index}
                            className={`sidebar-item ${location.pathname === opcion.ruta ? 'activo' : ''}`}
                            onClick={() => {
                                navigate(opcion.ruta);
                                if (window.innerWidth <= 768) setColapsado(true);
                            }}
                        >
                            <span className="item-icono">{opcion.icono}</span>
                            <span className="item-texto">{opcion.texto}</span>
                        </div>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <div 
                        className={`sidebar-item ${location.pathname === "/settings" ? 'activo' : ''}`}
                        onClick={() => {
                            navigate("/settings");
                            if (window.innerWidth <= 768) setColapsado(true);
                        }}
                    >
                        <span className="item-icono"><Settings size={20} /></span>
                        <span className="item-texto">Settings</span>
                    </div>
                    
                    <div className="sidebar-item" onClick={cerrarSesion} style={{ color: '#E53E3E', cursor: 'pointer' }}>
                        <span className="item-icono"><LogOut size={20} /></span>
                        <span className="item-texto">Sign out</span>
                    </div>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;