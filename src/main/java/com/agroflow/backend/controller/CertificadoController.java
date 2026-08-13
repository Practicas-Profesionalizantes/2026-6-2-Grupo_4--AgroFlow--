package com.agroflow.backend.controller;

import com.agroflow.backend.model.Certificado;
import com.agroflow.backend.model.Animales;
import com.agroflow.backend.model.Usuario;
import com.agroflow.backend.service.CertificadoService;
import com.agroflow.backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/certificados")
@CrossOrigin(origins = "*")
public class CertificadoController {

    @Autowired
    private CertificadoService certificadoService;

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/emitir")
    public ResponseEntity<Certificado> emitirCertificado(@RequestParam Integer supervisorId,
                                                         @RequestParam String imgRuta,
                                                         @RequestParam String fechaVencimiento,
                                                         @RequestParam String tipoCertificado,
                                                         @RequestParam String numeroEntidadReguladora,
                                                         @RequestBody Animales animal) {
        Usuario supervisor = usuarioService.obtenerPorId(supervisorId)
                .orElseThrow(() -> new RuntimeException("Supervisor no encontrado"));
        LocalDate vto = LocalDate.parse(fechaVencimiento);
        
        return ResponseEntity.ok(certificadoService.emitirCertificadoOficial(supervisor, animal, imgRuta, vto, tipoCertificado, numeroEntidadReguladora));
    }

    @GetMapping("/animal/{animalId}")
    public ResponseEntity<List<Certificado>> obtenerPorAnimal(@RequestParam Integer usuarioConsultaId, @PathVariable Integer animalId) {
        Usuario usuario = usuarioService.obtenerPorId(usuarioConsultaId)
                .orElseThrow(() -> new RuntimeException("Usuario consultor no encontrado"));
        return ResponseEntity.ok(certificadoService.obtenerCertificadosPorAnimal(usuario, animalId));
    }

    @PutMapping("/{id}/estado")
    public ResponseEntity<Certificado> cambiarEstado(@PathVariable Integer id,
                                                     @RequestParam Integer supervisorId,
                                                     @RequestParam String nuevoEstado) {
        Usuario supervisor = usuarioService.obtenerPorId(supervisorId)
                .orElseThrow(() -> new RuntimeException("Supervisor no encontrado"));
        return ResponseEntity.ok(certificadoService.cambiarEstadoAprobacion(supervisor, id, nuevoEstado));
    }
}
