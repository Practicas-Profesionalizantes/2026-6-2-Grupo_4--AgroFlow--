import './FormularioLogin.css'
import { useState } from 'react'

function FormularioLogin() {
  const [email, setEmail] = useState("")
  const [contrasena, setContrasena] = useState("")
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    // Si el emaul y contraseña estan vacios el error es true
    if (email == "" || contrasena == "") {
      setError(true)
      return
    }
    setError(false)

  }

  return (
    <>
      <section>
        <div className='formulario'>
          <h2>Welcome Back</h2>
          <h3>Sign in to your AgroFlow account</h3>
          {error && <p className="error-mensaje">Todos los campos son obligatorios</p>}
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email Address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder='you@company.com' />

            <label htmlFor="email" className='password'>Password <a href="#" className='forgot-password'>Forgot password?</a> </label>
            <input type="password" value={contrasena} onChange={e => setContrasena(e.target.value)} placeholder='•••••••••' />

            <button>Sing In</button>
            <p>Don’t have an account? <a href="#">Create one now</a></p>
          </form>
        </div>
      </section>
    </>
  )
}

export default FormularioLogin
