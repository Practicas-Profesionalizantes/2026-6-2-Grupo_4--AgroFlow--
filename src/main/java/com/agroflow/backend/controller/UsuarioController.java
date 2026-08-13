package com.agroflow.backend.controller;

import com.agroflow.backend.model.Usuario;
import com.agroflow.backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public ResponseEntity<List<Usuario>> obtenerTodos() {
        return ResponseEntity.ok(usuarioService.obtenerTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> obtenerPorId(@PathVariable Integer id) {
        return usuarioService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/gestionar")
    public ResponseEntity<Usuario> crearOActualizar(@RequestBody Usuario usuarioAEditar, @RequestParam Integer adminId) {
        Usuario admin = usuarioService.obtenerPorId(adminId)
                .orElseThrow(() -> new RuntimeException("Administrador no encontrado"));
        return ResponseEntity.ok(usuarioService.crearOActualizarUsuario(admin, usuarioAEditar));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id, @RequestParam Integer adminId) {
        Usuario admin = usuarioService.obtenerPorId(adminId)
                .orElseThrow(() -> new RuntimeException("Administrador no encontrado"));
        usuarioService.eliminarUsuario(admin, id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/login")
    public ResponseEntity<?> iniciarSesion(@RequestBody com.agroflow.backend.model.LoginRequest loginRequest) {
        try {
            Usuario usuarioLogueado = usuarioService.login(loginRequest.getEmail(), loginRequest.getContrasena());
            return ResponseEntity.ok(usuarioLogueado);
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

}
