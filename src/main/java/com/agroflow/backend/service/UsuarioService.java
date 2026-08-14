package com.agroflow.backend.service;

import com.agroflow.backend.model.Usuario;
import com.agroflow.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

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
}
