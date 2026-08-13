package com.agroflow.backend.controller;

import com.agroflow.backend.model.DocumentosTransportes;
import com.agroflow.backend.model.Distribucion;
import com.agroflow.backend.model.Usuario;
import com.agroflow.backend.service.DocumentosTransportesService;
import com.agroflow.backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/documentos-transporte")
@CrossOrigin(origins = "*")
public class DocumentosTransportesController {

    @Autowired
    private DocumentosTransportesService documentosTransportesService;

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/registrar")
    public ResponseEntity<DocumentosTransportes> registrarDocumento(@RequestParam Integer operarioId,
                                                                    @RequestParam String imgRuta,
                                                                    @RequestParam String nroGuia,
                                                                    @RequestBody Distribucion viaje) {
        Usuario operario = usuarioService.obtenerPorId(operarioId)
                .orElseThrow(() -> new RuntimeException("Operario no encontrado"));
        return ResponseEntity.ok(documentosTransportesService.registrarDocumentoViaje(operario, viaje, imgRuta, nroGuia));
    }

    @PutMapping("/{id}/verificar")
    public ResponseEntity<DocumentosTransportes> verificarDocumento(@PathVariable Integer id,
                                                                    @RequestParam Integer supervisorId,
                                                                    @RequestParam Boolean verificado) {
        Usuario supervisor = usuarioService.obtenerPorId(supervisorId)
                .orElseThrow(() -> new RuntimeException("Supervisor no encontrado"));
        return ResponseEntity.ok(documentosTransportesService.verificarDocumentoLey(supervisor, id, verificado));
    }

    @GetMapping("/viaje/{viajeId}")
    public ResponseEntity<List<DocumentosTransportes>> obtenerPorViaje(@PathVariable Integer viajeId) {
        return ResponseEntity.ok(documentosTransportesService.obtenerDocumentosPorViaje(viajeId));
    }
}
