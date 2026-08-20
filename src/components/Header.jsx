import logoAgro from '../assets/Agroflow logo.png' 
import Boton from '../components/Boton' 
import '../styles/Header.css';
import { useNavigate, useLocation } from 'react-router-dom'

function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <header className="navbar-header">
            <div className="navbar-izquierda">
                <div className="navbar-marca">
                    <img
                        src={logoAgro} 
                        alt="AgroFlow Logo"
                        className="navbar-logo"
                    />
                </div>
                <h1 className="navbar-titulo">AGROFLOW</h1>
            </div>

            <div className="navbar-derecha">
                
                {(location.pathname === "/register" || location.pathname === "/") && (
                    <div onClick={() => navigate("/login")}>
                        <Boton texto="sign in" />
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header
