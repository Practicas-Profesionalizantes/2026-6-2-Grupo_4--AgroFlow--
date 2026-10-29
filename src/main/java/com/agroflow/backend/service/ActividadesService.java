package com.agroflow.backend.service;

import com.agroflow.backend.model.Actividades;
import com.agroflow.backend.model.Usuario;
import com.agroflow.backend.repository.ActividadesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ActividadesService {

    @Autowired
    private ActividadesRepository actividadesRepository;

    public void registrarAccion(Usuario usuario, String accionDescription) {
        if (usuario != null) {
            Actividades nuevaActividad = new Actividades(usuario, accionDescription);
            actividadesRepository.save(nuevaActividad);
        }
    }

    public List<Actividades> obtenerLogsParaSupervisorOAdmin(Usuario usuarioConsulta) {
        if (usuarioConsulta == null || 
            (!"Supervisor".equalsIgnoreCase(usuarioConsulta.getRol()) && 
             !"Administrador".equalsIgnoreCase(usuarioConsulta.getRol()))) {
            throw new RuntimeException("Acceso denegado: No tienes permisos para ver el historial de auditoría.");
        }
        return actividadesRepository.findAll();
    }

        public List<Actividades> obtenerLogsDeUnUsuario(Usuario usuarioConsulta, Integer idUsuario) {
        if (usuarioConsulta == null) {
            throw new RuntimeException("Acceso denegado: Usuario no autenticado.");
        }

        boolean esAdmin = "Administrador".equalsIgnoreCase(usuarioConsulta.getRol());
        boolean esElMismoUsuario = usuarioConsulta.getId().equals(idUsuario);

        if (!esAdmin && !esElMismoUsuario) {
            throw new RuntimeException("Acceso denegado: No tienes permisos para auditar a este empleado.");
        }

        return actividadesRepository.findByUsuarioId(idUsuario);
    }

}
