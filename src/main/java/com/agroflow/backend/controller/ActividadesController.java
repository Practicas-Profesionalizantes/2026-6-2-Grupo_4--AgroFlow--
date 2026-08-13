package com.agroflow.backend.controller;

import com.agroflow.backend.model.Actividades;
import com.agroflow.backend.model.Usuario;
import com.agroflow.backend.service.ActividadesService;
import com.agroflow.backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/actividades")
@CrossOrigin(origins = "*")
public class ActividadesController {

    @Autowired
    private ActividadesService actividadesService;

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/auditoria")
    public ResponseEntity<List<Actividades>> obtenerAuditoriaGeneral(@RequestParam Integer usuarioConsultaId) {
        Usuario usuario = usuarioService.obtenerPorId(usuarioConsultaId)
                .orElseThrow(() -> new RuntimeException("Usuario consultor no encontrado"));
        return ResponseEntity.ok(actividadesService.obtenerLogsParaSupervisorOAdmin(usuario));
    }

    @GetMapping("/usuario/{id}")
    public ResponseEntity<List<Actividades>> obtenerAuditoriaDeUsuario(@RequestParam Integer adminId, @PathVariable Integer id) {
        Usuario admin = usuarioService.obtenerPorId(adminId)
                .orElseThrow(() -> new RuntimeException("Administrador no encontrado"));
        return ResponseEntity.ok(actividadesService.obtenerLogsDeUnUsuario(admin, id));
    }
}
