import '../styles/Home.css';
import { Link } from 'react-router-dom';
import imgRutas from '../assets/Flechitas.png';
import imgRoles from '../assets/Roles.png'; 
import imgSalud from '../assets/Salud.png';

function Home() {
    return (
        <div className="home-container">
            <section className="hero-section">
                <h2 className="hero-titulo">
                    AgroFlow tu Servicio <br />
                    de Distribucion y logistica de confianza
                </h2>
            </section>

            <h3 className="section-title">Features</h3>

            <section className="features-container">
                <div className="feature-item item-izquierda">
                    <div className="feature-imagen-wrapper">
                        <img src={imgRutas} alt="Optimización de rutas" className="feature-img-circle" />
                    </div>
                    <div className="feature-texto">
                        <h4>Optimización de rutas y transporte</h4>
                        <p>
                            Implemente un sistema de planificación eficiente para el traslado de animales 
                            mediante software avanzado. Reduzca los tiempos de viaje, mitigue el estrés animal 
                            y evite pérdidas económicas coordinando entregas de manera inteligente con 
                            monitoreo GPS en tiempo real.
                        </p>
                    </div>
                </div>

                <div className="feature-item item-derecha">
                    <div className="feature-texto text-align-right">
                        <h4>Roles del Sistema</h4>
                        <p>
                            Optimice la organización interna mediante una interfaz tripartita con paneles 
                            diferenciados para Administradores, Supervisores y Operarios. Controle los accesos a 
                            información sensible, asigne tareas específicas y visualice dashboards en tiempo real.
                        </p>
                    </div>
                    <div className="feature-imagen-wrapper">
                        <img src={imgRoles} alt="Roles del Sistema" className="feature-img-circle" />
                    </div>
                </div>

                <div className="feature-item item-izquierda">
                    <div className="feature-imagen-wrapper">
                        <img src={imgSalud} alt="Trazabilidad" className="feature-img-circle" />
                    </div>
                    <div className="feature-texto">
                        <h4>Trazabilidad y control sanitario</h4>
                        <p>
                            Digitalice historiales clínicos y automatice el control de ciclos sanitarios, vacunas e 
                            insumos. Mantenga un registro exacto del stock disponible y reciba alertas 
                            tempranas ante incidencias para asegurar que los lotes estén en condiciones 
                            óptimas.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
