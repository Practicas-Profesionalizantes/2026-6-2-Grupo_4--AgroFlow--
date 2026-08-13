package com.agroflow.backend.controller;

import com.agroflow.backend.model.Distribucion;
import com.agroflow.backend.model.Usuario;
import com.agroflow.backend.service.DistribucionService;
import com.agroflow.backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/distribucion")
@CrossOrigin(origins = "*")
public class DistribucionController {

    @Autowired
    private DistribucionService distribucionService;

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/despachar")
    public ResponseEntity<Distribucion> despachar(@RequestParam Integer operarioId,
                                                  @RequestParam Integer supervisorId,
                                                  @RequestParam String conductor,
                                                  @RequestParam String documento,
                                                  @RequestParam String patenteCamion,
                                                  @RequestParam String patenteAcoplado,
                                                  @RequestParam String ruta,
                                                  @RequestParam String coordenadasGps) {
        Usuario operario = usuarioService.obtenerPorId(operarioId)
                .orElseThrow(() -> new RuntimeException("Operario no encontrado"));
        Usuario supervisor = usuarioService.obtenerPorId(supervisorId)
                .orElseThrow(() -> new RuntimeException("Supervisor no encontrado"));

        return ResponseEntity.ok(distribucionService.registrarCargaYDespacho(operario, supervisor, conductor, documento, patenteCamion, patenteAcoplado, ruta, coordenadasGps));
    }

    @PutMapping("/{id}/tracking")
    public ResponseEntity<Distribucion> actualizarTracking(@PathVariable Integer id,
                                                           @RequestParam Integer usuarioId,
                                                           @RequestParam(required = false) String nuevasCoordenadas,
                                                           @RequestParam(required = false) String nuevoEstado) {
        Usuario usuario = usuarioService.obtenerPorId(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return ResponseEntity.ok(distribucionService.actualizarTrackingGps(usuario, id, nuevasCoordenadas, nuevoEstado));
    }

    @GetMapping("/estado")
    public ResponseEntity<List<Distribucion>> listarPorEstado(@RequestParam String estado) {
        return ResponseEntity.ok(distribucionService.listarViajesPorEstado(estado));
    }
}
