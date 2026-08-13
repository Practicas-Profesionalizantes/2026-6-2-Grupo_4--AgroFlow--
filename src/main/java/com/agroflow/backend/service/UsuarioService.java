package com.agroflow.backend.service;

import com.agroflow.backend.model.Usuario;
import com.agroflow.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

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
        
        // Encriptamos la contraseña antes de guardar en la base de datos
        if (usuarioAEditar.getContrasena() != null && !usuarioAEditar.getContrasena().startsWith("$2a$")) {
            String contrasenaEncriptada = passwordEncoder.encode(usuarioAEditar.getContrasena());
            usuarioAEditar.setContrasena(contrasenaEncriptada);
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

        // BCrypt compara el texto plano directamente contra el hash guardado
        if (!passwordEncoder.matches(contrasenaPlana, usuario.getContrasena())) {
            throw new RuntimeException("Credenciales incorrectas: Contraseña inválida.");
        }

        return usuario;
    }
}
