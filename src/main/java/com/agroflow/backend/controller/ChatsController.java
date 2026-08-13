package com.agroflow.backend.controller;

import com.agroflow.backend.model.Chats;
import com.agroflow.backend.model.Usuario;
import com.agroflow.backend.service.ChatsService;
import com.agroflow.backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chats")
@CrossOrigin(origins = "*")
public class ChatsController {

    @Autowired
    private ChatsService chatsService;

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/enviar")
    public ResponseEntity<Chats> enviarMensaje(@RequestParam Integer remitenteId, 
                                               @RequestParam Integer destinatarioId, 
                                               @RequestBody String mensaje) {
        Usuario remitente = usuarioService.obtenerPorId(remitenteId)
                .orElseThrow(() -> new RuntimeException("Remitente no encontrado"));
        Usuario destinatario = usuarioService.obtenerPorId(destinatarioId)
                .orElseThrow(() -> new RuntimeException("Destinatario no encontrado"));
        
        return ResponseEntity.ok(chatsService.enviarMensaje(remitente, destinatario, mensaje));
    }

    @GetMapping("/conversacion")
    public ResponseEntity<List<Chats>> obtenerConversacion(@RequestParam Integer usuarioConsultaId, 
                                                           @RequestParam Integer otroUsuarioId) {
        Usuario usuarioConsulta = usuarioService.obtenerPorId(usuarioConsultaId)
                .orElseThrow(() -> new RuntimeException("Usuario en consulta no encontrado"));
                
        return ResponseEntity.ok(chatsService.obtenerConversacionEntreUsuarios(usuarioConsulta, otroUsuarioId));
    }
}
