package com.agroflow.backend.service;

import com.agroflow.backend.model.Chats;
import com.agroflow.backend.model.Usuario;
import com.agroflow.backend.repository.ChatsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ChatsService {

    @Autowired
    private ChatsRepository chatsRepository;

    @Autowired
    private ActividadesService actividadesService;

    public Chats enviarMensaje(Usuario remitente, Usuario destinatario, String textoMensaje) {
        if (remitente == null || destinatario == null) {
            throw new RuntimeException("Error: El remitente y el destinatario deben ser usuarios válidos.");
        }

        if (textoMensaje == null || textoMensaje.trim().isEmpty()) {
            throw new RuntimeException("Error: El contenido del mensaje no puede estar vacío.");
        }

        Chats nuevoMensaje = new Chats(destinatario, remitente, textoMensaje);
        Chats guardado = chatsRepository.save(nuevoMensaje);

        if ("Cliente".equalsIgnoreCase(remitente.getRol())) {
            actividadesService.registrarAccion(remitente, "Envió un mensaje de soporte al usuario ID: " + destinatario.getId());
        } else {
            actividadesService.registrarAccion(remitente, "Respondió un mensaje de soporte al usuario ID: " + destinatario.getId());
        }

        return guardado;
    }

    public List<Chats> obtenerConversacionEntreUsuarios(Usuario usuarioConsulta, Integer idOtroUsuario) {
        if (usuarioConsulta == null) {
            throw new RuntimeException("Acceso denegado: Usuario no autenticado.");
        }

        return chatsRepository.findByDestinatarioIdOrRemitenteIdOrderByFechaAsc(usuarioConsulta.getId(), idOtroUsuario);
    }
}
