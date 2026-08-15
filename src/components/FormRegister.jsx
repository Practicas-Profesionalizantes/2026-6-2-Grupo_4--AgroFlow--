    import './FormularioLogin.css'
    import { useState } from 'react'
    import { useNavigate } from 'react-router-dom'
    import { registrarUsuario } from '../services/usuarioService'

    function FormRegister() {
        const navigate = useNavigate()
        const [nombre, setNombre] = useState("")
        const [apellido, setApellido] = useState("")
        const [email, setEmail] = useState("")
        const [contrasena, setContrasena] = useState("")
        const [direccion, setDireccion] = useState("")
        const [localidad, setLocalidad] = useState("")
        const [fechaNacimiento, setFechaNacimiento] = useState("")
        const [telefono, setTelefono] = useState("")
        const [errorMsg, setErrorMsg] = useState("")

        const handleSubmit = async (e) => {
            e.preventDefault()

            if (!nombre || !apellido || !email || !contrasena) {
                setErrorMsg("Los campos principales son obligatorios")
                return
            }

            setErrorMsg("")

            const nuevoUsuario = {
                nombre,
                apellido,
                email,
                contrasena,
                direccion,
                localidad,
                fechaNacimiento,
                telefono,
                rol: "Cliente"
            }

            try {
                await registrarUsuario(nuevoUsuario, 1);
                alert("¡Cuenta creada con éxito! Ya puedes iniciar sesión.");
                navigate("/login");
            } catch (err) {
                setErrorMsg("Error al registrar la cuenta. Inténtelo de nuevo.");
            }
        }

        return (
            <>
                <section>
                    <h2 style={{ fontSize: '42px', textAlign: 'center', marginTop: '20px' }} >Create Account</h2>
                    <div className='formulario'>
                        {errorMsg && <p className="error-mensaje">{errorMsg}</p>}
                        <form onSubmit={handleSubmit}>
                            <div className='row-inputs'>
                                <div className='input-group'>
                                    <label htmlFor="firstName">First Name</label>
                                    <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} placeholder='Benjamin' required />
                                </div>
                                <div className='input-group'>
                                    <label htmlFor="lastName">Last Name</label>
                                    <input type="text" value={apellido} onChange={e => setApellido(e.target.value)} placeholder='Korstanje' required />
                                </div>
                            </div>

                            <label htmlFor="email">Email</label>
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder='you@company.com' required />

                            <label htmlFor="password">Password</label>
                            <input type="password" value={contrasena} onChange={e => setContrasena(e.target.value)} placeholder='•••••••••' required />

                            <label htmlFor="address">Address</label>
                            <input type="text" value={direccion} onChange={e => setDireccion(e.target.value)} placeholder='Calle Falsa 123' />

                            <label htmlFor="locality">Locality</label>
                            <input type="text" value={localidad} onChange={e => setLocalidad(e.target.value)} placeholder='Buenos Aires' />

                            <label htmlFor="birthday">Birthday</label>
                            <input type="date" value={fechaNacimiento} onChange={e => setFechaNacimiento(e.target.value)} />

                            <label htmlFor="phone">Phone</label>
                            <input type="text" value={telefono} onChange={e => setTelefono(e.target.value)} placeholder='11 61608813' />

                            <button type="submit">Create Account</button>
                        </form>
                    </div>
                </section>
            </>
        )
    }

    export default FormRegister
