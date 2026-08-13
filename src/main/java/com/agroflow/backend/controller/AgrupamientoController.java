package com.agroflow.backend.controller;

import com.agroflow.backend.model.Agrupamiento;
import com.agroflow.backend.model.Usuario;
import com.agroflow.backend.service.AgrupamientoService;
import com.agroflow.backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/agrupamientos")
@CrossOrigin(origins = "*")
public class AgrupamientoController {

    @Autowired
    private AgrupamientoService agrupamientoService;

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/crear")
    public ResponseEntity<Agrupamiento> crearLote(@RequestParam Integer operarioId,
                                                  @RequestParam String nombreLote,
                                                  @RequestParam String lote,
                                                  @RequestParam String caravana) {
        Usuario operario = usuarioService.obtenerPorId(operarioId)
                .orElseThrow(() -> new RuntimeException("Operario no encontrado"));
        return ResponseEntity.ok(agrupamientoService.crearLoteOAgrupamiento(operario, nombreLote, lote, caravana));
    }

    @GetMapping
    public ResponseEntity<List<Agrupamiento>> listarTodos(@RequestParam Integer usuarioId) {
        Usuario usuario = usuarioService.obtenerPorId(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return ResponseEntity.ok(agrupamientoService.listarTodos(usuario));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id, @RequestParam Integer adminId) {
        Usuario admin = usuarioService.obtenerPorId(adminId)
                .orElseThrow(() -> new RuntimeException("Administrador no encontrado"));
        agrupamientoService.eliminarAgrupamiento(admin, id);
        return ResponseEntity.noContent().build();
    }
}
