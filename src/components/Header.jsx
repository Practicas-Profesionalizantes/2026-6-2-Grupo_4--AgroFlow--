import logoAgro from '../assets/Agroflow logo.png' 
import './Header.css'

function Header() {
    return (
        <>
            <header className="navbar-header">
                <div className="navbar-marca">
                    <img
                        src={logoAgro} 
                        alt="AgroFlow Logo"
                        className="navbar-logo"
                    />
                </div>
                <h1 className="navbar-titulo">AGROFLOW</h1>
            </header>
        </>
    )
}

export default Header