import logoAgro from '../assets/Agroflow logo.png' 
import Boton from './Boton' 
import './Header.css'

function Header() {
    return (
        <header className="navbar-header">
            {/* Bloque Izquierdo: Logo y Título */}
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

            {/* Bloque Derecho: Solo tus botones agrupados */}
            <div className="navbar-derecha">
                <Boton texto="sign in" />
                <Boton texto="register" />
            </div>
        </header>
    )
}

export default Header
