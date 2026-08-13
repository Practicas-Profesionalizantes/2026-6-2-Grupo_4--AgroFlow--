package com.agroflow.backend.controller;

import com.agroflow.backend.model.Animales;
import com.agroflow.backend.model.Agrupamiento;
import com.agroflow.backend.model.Usuario;
import com.agroflow.backend.service.AnimalesService;
import com.agroflow.backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/animales")
@CrossOrigin(origins = "*")
public class AnimalesController {

    @Autowired
    private AnimalesService animalesService;

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public ResponseEntity<List<Animales>> listarTodos() {
        return ResponseEntity.ok(animalesService.listarTodos());
    }

    @PutMapping("/{id}/asignar-lote")
    public ResponseEntity<Animales> asignarLote(@PathVariable Integer id, 
                                                @RequestParam Integer empleadoId, 
                                                @RequestBody Agrupamiento lote) {
        Usuario empleado = usuarioService.obtenerPorId(empleadoId)
                .orElseThrow(() -> new RuntimeException("Empleado no encontrado"));
        Animales animal = animalesService.listarTodos().stream()
                .filter(a -> a.getId().equals(id)).findFirst()
                .orElseThrow(() -> new RuntimeException("Animal no encontrado"));
                
        return ResponseEntity.ok(animalesService.asignarLote(empleado, animal, lote));
    }

    @GetMapping("/rfid/{rfid}")
    public ResponseEntity<Animales> obtenerPorRfid(@PathVariable String rfid) {
        Animales animal = animalesService.obtenerPorRfid(rfid);
        return animal != null ? ResponseEntity.ok(animal) : ResponseEntity.notFound().build();
    }
}
