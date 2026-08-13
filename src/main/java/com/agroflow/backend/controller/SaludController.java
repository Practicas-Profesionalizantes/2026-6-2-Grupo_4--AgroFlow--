package com.agroflow.backend.controller;

import com.agroflow.backend.model.Salud;
import com.agroflow.backend.model.Animales;
import com.agroflow.backend.model.Stock;
import com.agroflow.backend.model.Usuario;
import com.agroflow.backend.service.SaludService;
import com.agroflow.backend.service.UsuarioService;
import com.agroflow.backend.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/salud")
@CrossOrigin(origins = "*")
public class SaludController {

    @Autowired
    private SaludService saludService;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private StockService stockService;

    @PostMapping("/control")
    public ResponseEntity<Salud> registrarControl(@RequestParam Integer operarioId,
                                                  @RequestParam(required = false) Integer insumoId,
                                                  @RequestParam(required = false) BigDecimal cantidadUsada,
                                                  @RequestParam String tipoControl,
                                                  @RequestParam String descripcion,
                                                  @RequestParam(required = false) Integer diasCarencia,
                                                  @RequestBody Animales animal) {
        Usuario operario = usuarioService.obtenerPorId(operarioId)
                .orElseThrow(() -> new RuntimeException("Operario no encontrado"));
        
        Stock medicamento = null;
        if (insumoId != null) {
            medicamento = stockService.obtenerInventarioCompleto(operario).stream()
                    .filter(s -> s.getId().equals(insumoId)).findFirst()
                    .orElseThrow(() -> new RuntimeException("Medicamento no encontrado"));
        }

        return ResponseEntity.ok(saludService.registrarControlSanitario(operario, animal, medicamento, cantidadUsada, tipoControl, descripcion, diasCarencia));
    }

    @GetMapping("/animal/{animalId}")
    public ResponseEntity<List<Salud>> obtenerHistorialClinico(@PathVariable Integer animalId) {
        return ResponseEntity.ok(saludService.obtenerHistorialClinicoAnimal(animalId));
    }
}
