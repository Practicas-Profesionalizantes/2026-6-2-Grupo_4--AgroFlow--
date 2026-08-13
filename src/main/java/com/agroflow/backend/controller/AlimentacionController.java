package com.agroflow.backend.controller;

import com.agroflow.backend.model.Alimentacion;
import com.agroflow.backend.model.Agrupamiento;
import com.agroflow.backend.model.Stock;
import com.agroflow.backend.model.Usuario;
import com.agroflow.backend.service.AlimentacionService;
import com.agroflow.backend.service.UsuarioService;
import com.agroflow.backend.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/alimentacion")
@CrossOrigin(origins = "*")
public class AlimentacionController {

    @Autowired
    private AlimentacionService alimentacionService;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private StockService stockService;

    @PostMapping("/registrar")
    public ResponseEntity<Alimentacion> registrarAlimentacion(@RequestParam Integer operarioId, 
                                                              @RequestParam Integer insumoId, 
                                                              @RequestParam BigDecimal cantidadKg, 
                                                              @RequestBody Agrupamiento lote) {
        Usuario operario = usuarioService.obtenerPorId(operarioId)
                .orElseThrow(() -> new RuntimeException("Operario no encontrado"));
        Stock insumo = stockService.obtenerInventarioCompleto(operario).stream()
                .filter(s -> s.getId().equals(insumoId)).findFirst()
                .orElseThrow(() -> new RuntimeException("Insumo no encontrado"));

        return ResponseEntity.ok(alimentacionService.registrarAlimentacion(operario, lote, insumo, cantidadKg));
    }

    @GetMapping("/lote/{loteId}")
    public ResponseEntity<List<Alimentacion>> obtenerPorLote(@PathVariable Integer loteId) {
        return ResponseEntity.ok(alimentacionService.obtenerHistorialPorLote(loteId));
    }
}
