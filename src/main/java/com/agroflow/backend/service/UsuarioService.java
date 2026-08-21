package com.agroflow.backend.service;

import com.agroflow.backend.model.Usuario;
import com.agroflow.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private JavaMailSender mailSender;

    // Almacenamiento en memoria para los códigos de verificación (Email -> Código)
    private final Map<String, String> codigosRecuperacion = new HashMap<>();

    public List<Usuario> obtenerTodos() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> obtenerPorId(Integer id) {
        return usuarioRepository.findById(id);
    }

    public Usuario crearOActualizarUsuario(Usuario admin, Usuario usuarioAEditar) {
        if (admin == null || !"Administrador".equalsIgnoreCase(admin.getRol())) {
            throw new RuntimeException("Acceso denegado: Solo el Administrador puede gestionar usuarios.");
        }
        return usuarioRepository.save(usuarioAEditar);
    }

    public void eliminarUsuario(Usuario admin, Integer idUsuarioEliminar) {
        if (admin == null || !"Administrador".equalsIgnoreCase(admin.getRol())) {
            throw new RuntimeException("Acceso denegado: Solo el Administrador puede eliminar usuarios.");
        }
        usuarioRepository.deleteById(idUsuarioEliminar);
    }

    public Optional<Usuario> obtenerPorEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }
    
    public Usuario login(String email, String contrasenaPlana) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Credenciales incorrectas: El email no existe."));

        if (!contrasenaPlana.equals(usuario.getContrasena())) {
            throw new RuntimeException("Credenciales incorrectas: Contraseña inválida.");
        }

        return usuario;
    }

    // --- MÉTODOS DE RECUPERACIÓN POR EMAIL ---

    public void enviarCodigoRecuperacion(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("No se encontró ninguna cuenta asociada a este correo."));

        // Generar un código aleatorio de 6 dígitos
        String codigo = String.valueOf((int) (Math.random() * 900000) + 100000);
        codigosRecuperacion.put(email, codigo);

        // Crear el mensaje de correo
        SimpleMailMessage mensaje = new SimpleMailMessage();
        mensaje.setTo(email);
        mensaje.setSubject("AgroFlow - Código de Recuperación de Contraseña");
        mensaje.setText("Hola " + usuario.getNombre() + ",\n\n"
                + "Tu código de verificación para restablecer la contraseña es: " + codigo + "\n\n"
                + "Si no solicitaste este cambio, ignora este mensaje.\n\n"
                + "Saludos,\nEl equipo de AgroFlow");

        mailSender.send(mensaje);
    }

    public void cambiarContrasenaConCodigo(String email, String codigo, String nuevaContrasena) {
        String codigoGuardado = codigosRecuperacion.get(email);

        if (codigoGuardado == null || !codigoGuardado.equals(codigo)) {
            throw new RuntimeException("El código de verificación es incorrecto o ha expirado.");
        }

        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado."));

        usuario.setContrasena(nuevaContrasena);
        usuarioRepository.save(usuario);

        // Limpiar el código usado
        codigosRecuperacion.remove(email);
    }
}