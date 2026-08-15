import logoAgro from '../assets/Agroflow logo.png' 
import Boton from './Boton' 
import './Header.css'
import { useNavigate } from 'react-router-dom'

function Header() {
    const navigate = useNavigate();

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
                <div onClick={() => navigate("/login")}>
                    <Boton texto="sign in" />
                </div>
            </div>
        </header>
    )
}

export default Header
