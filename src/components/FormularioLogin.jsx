import './FormularioLogin.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom' 
import { loginUsuario } from '../services/usuarioService'

function FormularioLogin() {
  const [email, setEmail] = useState("")
  const [contrasena, setContrasena] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  
  const navigate = useNavigate() 

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (email === "" || contrasena === "") {
      setErrorMsg("Todos los campos son obligatorios")
      return
    }

    setErrorMsg("")

    try {
      const usuarioLogueado = await loginUsuario(email, contrasena);

      localStorage.setItem('usuario', JSON.stringify(usuarioLogueado));

      navigate("/"); 

    } catch (err) {
      if (err.response && err.response.status === 401) {
        setErrorMsg("Credenciales incorrectas: Verifica tu email o contraseña.");
      } else if (err.response && err.response.data && err.response.data.mensaje) {
        setErrorMsg(err.response.data.mensaje);
      } else {
        setErrorMsg("No se pudo conectar con el servidor de AgroFlow.");
      }
    }
  }

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
              Password <a href="#" className='forgot-password'>Forgot password?</a>
            </label>
            <input
              type="password"
              value={contrasena}
              onChange={e => setContrasena(e.target.value)}
              placeholder='•••••••••'
            />

            <button type="submit">Sign In</button>
            <p>Don’t have an account? <a href="#">Create one now</a></p>
          </form>
        </div>
      </section>
    </>
  )
}

export default FormularioLogin
