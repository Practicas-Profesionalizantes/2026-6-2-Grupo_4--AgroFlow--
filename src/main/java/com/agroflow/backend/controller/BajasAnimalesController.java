package com.agroflow.backend.controller;

import com.agroflow.backend.model.BajasAnimales;
import com.agroflow.backend.model.Animales;
import com.agroflow.backend.model.Usuario;
import com.agroflow.backend.service.BajasAnimalesService;
import com.agroflow.backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bajas")
@CrossOrigin(origins = "*")
public class BajasAnimalesController {

    @Autowired
    private BajasAnimalesService bajasAnimalesService;

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/registrar")
    public ResponseEntity<BajasAnimales> registrarBaja(@RequestParam Integer operarioId,
                                                       @RequestParam String motivo,
                                                       @RequestParam String detalles,
                                                       @RequestBody Animales animal) {
        Usuario operario = usuarioService.obtenerPorId(operarioId)
                .orElseThrow(() -> new RuntimeException("Operario no encontrado"));
        return ResponseEntity.ok(bajasAnimalesService.registrarBaja(operario, animal, motivo, detalles));
    }
}
