import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logoAgro from '../assets/Agroflow logo.png';
import '../styles/Sidebar.css';

function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [colapsado, setColapsado] = useState(true);

    const opcionesMenu = [
        { texto: "Home", ruta: "/dashboard", icono: <span style={{ fontSize: '24px', fontWeight: 'bold', lineHeight: '1' }}>⌂</span> },
        { texto: "medical history", ruta: "/historial-medico", icono: "📋" },
        { texto: "Inventory", ruta: "/inventario", icono: "🏬" },
        { texto: "Distribution", ruta: "/distribucion", icono: "🚚" },
        { texto: "orders", ruta: "/ordenes", icono: "🗑️" }
    ];


    
    const manejarMouseEnter = () => {
        if (window.innerWidth > 768) {
            setColapsado(false);
        }
    };

    const manejarMouseLeave = () => {
        if (window.innerWidth > 768) {
            setColapsado(true);
        }
    };

    const cerrarSesion = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <>
            {colapsado && (
                <button className="btn-toggle-sidebar" onClick={() => setColapsado(false)}>
                    <span style={{ fontSize: '24px', fontWeight: 'bold', lineHeight: '1' }}>&#9776;</span>
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
                        <span className="item-icono">⚙️</span>
                        <span className="item-texto">Settings</span>
                    </div>
                    
                    <div className="sidebar-item" onClick={cerrarSesion} style={{ color: '#E53E3E' }}>
                        <span className="item-icono">🚪</span>
                        <span className="item-texto">sing out</span>
                    </div>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;
