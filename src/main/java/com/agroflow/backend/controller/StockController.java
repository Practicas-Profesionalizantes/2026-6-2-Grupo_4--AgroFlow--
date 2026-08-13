package com.agroflow.backend.controller;

import com.agroflow.backend.model.Stock;
import com.agroflow.backend.model.Usuario;
import com.agroflow.backend.service.StockService;
import com.agroflow.backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/stock")
@CrossOrigin(origins = "*")
public class StockController {

    @Autowired
    private StockService stockService;

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public ResponseEntity<List<Stock>> obtenerInventario(@RequestParam Integer usuarioId) {
        Usuario usuario = usuarioService.obtenerPorId(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return ResponseEntity.ok(stockService.obtenerInventarioCompleto(usuario));
    }

    @PutMapping("/{id}/recuento")
    public ResponseEntity<Stock> recuentoStock(@PathVariable Integer id, 
                                               @RequestParam Integer supervisorId, 
                                               @RequestParam BigDecimal nuevaCantidad) {
        Usuario supervisor = usuarioService.obtenerPorId(supervisorId)
                .orElseThrow(() -> new RuntimeException("Supervisor no encontrado"));
        return ResponseEntity.ok(stockService.realizarRecuentoStock(supervisor, id, nuevaCantidad));
    }

    @PostMapping("/ingreso")
    public ResponseEntity<Stock> registrarIngreso(@RequestParam Integer usuarioId, @RequestBody Stock nuevoInsumo) {
        Usuario usuario = usuarioService.obtenerPorId(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return ResponseEntity.ok(stockService.registrarIngresoInsumo(usuario, nuevoInsumo));
    }

    @GetMapping("/{id}/alerta")
    public ResponseEntity<Boolean> verificarAlerta(@PathVariable Integer id) {
        return ResponseEntity.ok(stockService.verificarAlertaMinima(id));
    }

}
