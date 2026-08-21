import '../styles/FormularioLogin.css';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUsuario, solicitarCodigoRecuperacion, confirmarRecuperacion } from '../services/usuarioService';

function Login() {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Estados para el Modal de Recuperar Contraseña
  const [mostrarModal, setMostrarModal] = useState(false);
  const [pasoModal, setPasoModal] = useState(1); // Paso 1: Pedir email | Paso 2: Pedir código + clave
  const [emailRecuperacion, setEmailRecuperacion] = useState("");
  const [codigoIngresado, setCodigoIngresado] = useState("");
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [mensajeModal, setMensajeModal] = useState({ tipo: '', texto: '' });
  const [cargandoModal, setCargandoModal] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || contrasena === "") {
      setErrorMsg("Todos los campos son obligatorios");
      return;
    }

    setErrorMsg("");

    try {
      const usuarioLogueado = await loginUsuario(email, contrasena);
      localStorage.setItem('usuario', JSON.stringify(usuarioLogueado));

      if (usuarioLogueado.rol === "Administrador") {
        navigate("/admin");
      } else if (usuarioLogueado.rol === "Operario") {
        navigate("/operario");
      } else if (usuarioLogueado.rol === "Supervisor") {
        navigate("/supervisor");
      } else if (usuarioLogueado.rol === "Cliente") {
        navigate("/cliente");
      } else {
        navigate("/");
      }

    } catch (err) {
      if (err.response && err.response.status === 401) {
        setErrorMsg("Credenciales incorrectas: Verifica tu email o contraseña.");
      } else if (err.response && err.response.data && err.response.data.mensaje) {
        setErrorMsg(err.response.data.mensaje);
      } else {
        setErrorMsg("No se pudo conectar con el servidor de AgroFlow.");
      }
    }
  };

  // Solicitar el envío del código por Mail
  const handleEnviarCodigo = async (e) => {
    e.preventDefault();
    if (!emailRecuperacion) {
      setMensajeModal({ tipo: 'error', texto: 'Por favor ingresa tu correo electrónico.' });
      return;
    }

    setCargandoModal(true);
    setMensajeModal({ tipo: '', texto: '' });

    try {
      await solicitarCodigoRecuperacion(emailRecuperacion);
      setMensajeModal({ tipo: 'exito', texto: 'Código enviado a tu correo. Revisa tu bandeja de entrada.' });
      setPasoModal(2);
    } catch (err) {
      const msg = err.response?.data || "Ocurrió un error al enviar el código.";
      setMensajeModal({ tipo: 'error', texto: msg });
    } finally {
      setCargandoModal(false);
    }
  };

  // Confirmar el código y actualizar contraseña
  const handleConfirmarClave = async (e) => {
    e.preventDefault();
    if (!codigoIngresado || !nuevaContrasena) {
      setMensajeModal({ tipo: 'error', texto: 'Todos los campos son obligatorios.' });
      return;
    }

    setCargandoModal(true);
    setMensajeModal({ tipo: '', texto: '' });

    try {
      await confirmarRecuperacion(emailRecuperacion, codigoIngresado, nuevaContrasena);
      setMensajeModal({ tipo: 'exito', texto: '¡Contraseña actualizada con éxito! Redirigiendo...' });
      setTimeout(() => {
        cerrarModal();
      }, 2000);
    } catch (err) {
      const msg = err.response?.data || "Código inválido o error al guardar.";
      setMensajeModal({ tipo: 'error', texto: msg });
    } finally {
      setCargandoModal(false);
    }
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setPasoModal(1);
    setEmailRecuperacion("");
    setCodigoIngresado("");
    setNuevaContrasena("");
    setMensajeModal({ tipo: '', texto: '' });
  };

  return (
    <>
      <section>
        <div className='formulario'>
          <h2>Welcome Back</h2>
          <h3>Sign in to your AgroFlow account</h3>

          {errorMsg && <p className="error-mensaje">{errorMsg}</p>}

          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder='you@company.com'
            />

            <label htmlFor="contrasena" className='password'>
              Password 
              <button 
                type="button" 
                onClick={() => setMostrarModal(true)} 
                className='forgot-password'
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Forgot password?
              </button>
            </label>
            <input
              type="password"
              value={contrasena}
              onChange={e => setContrasena(e.target.value)}
              placeholder='•••••••••'
            />

            <button type="submit">Sign In</button>
            <p>Don’t have an account? <Link to="/register">Create one now</Link></p>
          </form>
        </div>
      </section>

      {/* Modal de Recuperación vía Email */}
      {mostrarModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div className='formulario' style={{ width: '100%', maxWidth: '420px', margin: 0 }}>
            <h3>Reset Password</h3>

            {mensajeModal.texto && (
              <p className={mensajeModal.tipo === 'exito' ? 'exito-mensaje' : 'error-mensaje'}>
                {mensajeModal.texto}
              </p>
            )}

            {pasoModal === 1 ? (
              <form onSubmit={handleEnviarCodigo}>
                <label>Enter your email address</label>
                <input
                  type="email"
                  value={emailRecuperacion}
                  onChange={e => setEmailRecuperacion(e.target.value)}
                  placeholder='you@company.com'
                />

                <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                  <button type="submit" disabled={cargandoModal}>
                    {cargandoModal ? 'Sending...' : 'Send Verification Code'}
                  </button>
                  <button type="button" onClick={cerrarModal} style={{ backgroundColor: '#718096' }}>
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleConfirmarClave}>
                <label>Verification Code (sent to your email)</label>
                <input
                  type="text"
                  value={codigoIngresado}
                  onChange={e => setCodigoIngresado(e.target.value)}
                  placeholder='123456'
                />

                <label>New Password</label>
                <input
                  type="password"
                  value={nuevaContrasena}
                  onChange={e => setNuevaContrasena(e.target.value)}
                  placeholder='•••••••••'
                />

                <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                  <button type="submit" disabled={cargandoModal}>
                    {cargandoModal ? 'Updating...' : 'Update Password'}
                  </button>
                  <button type="button" onClick={cerrarModal} style={{ backgroundColor: '#718096' }}>
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Login;