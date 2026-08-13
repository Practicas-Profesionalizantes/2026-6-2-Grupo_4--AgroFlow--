package com.agroflow.backend.controller;

import com.agroflow.backend.model.HistorialPesaje;
import com.agroflow.backend.model.Animales;
import com.agroflow.backend.model.Usuario;
import com.agroflow.backend.service.HistorialPesajeService;
import com.agroflow.backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;


@RestController
@RequestMapping("/api/pesajes")
@CrossOrigin(origins = "*")
public class HistorialPesajeController {

    @Autowired
    private HistorialPesajeService historialPesajeService;

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/registrar")
    public ResponseEntity<HistorialPesaje> registrarPesaje(@RequestParam Integer operarioId,
                                                           @RequestParam BigDecimal nuevoPeso,
                                                           @RequestBody Animales animal) {
        Usuario operario = usuarioService.obtenerPorId(operarioId)
                .orElseThrow(() -> new RuntimeException("Operario no encontrado"));
        return ResponseEntity.ok(historialPesajeService.registrarPesaje(operario, animal, nuevoPeso));
    }

    @GetMapping("/animal/{animalId}")
    public ResponseEntity<List<HistorialPesaje>> obtenerHistorial(@PathVariable Integer animalId) {
        return ResponseEntity.ok(historialPesajeService.obtenerHistorialPorAnimal(animalId));
    }

}
