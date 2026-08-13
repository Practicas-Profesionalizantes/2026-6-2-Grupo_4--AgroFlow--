package com.agroflow.backend.service;

import com.agroflow.backend.model.Agrupamiento;
import com.agroflow.backend.model.Usuario;
import com.agroflow.backend.repository.AgrupamientoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AgrupamientoService {

    @Autowired
    private AgrupamientoRepository agrupamientoRepository;

    @Autowired
    private ActividadesService actividadesService;

    public Agrupamiento crearLoteOAgrupamiento(Usuario operario, String nombreLote, String lote, String caravana) {
        if (operario == null || (!"Operario".equalsIgnoreCase(operario.getRol()) && !"Administrador".equalsIgnoreCase(operario.getRol()))) {
            throw new RuntimeException("Acceso denegado: Solo el Operario o el Administrador pueden crear agrupamientos.");
        }

        Agrupamiento nuevoAgrupamiento = new Agrupamiento(nombreLote, lote, caravana);
        Agrupamiento guardado = agrupamientoRepository.save(nuevoAgrupamiento);

        actividadesService.registrarAccion(operario, "Creó el lote/agrupamiento: " + nombreLote + " (Código Lote: " + lote + ", Caravana ID: " + caravana + ")");
        return guardado;
    }

    public List<Agrupamiento> listarTodos(Usuario usuario) {
        if (usuario == null) {
            throw new RuntimeException("Acceso denegado: Usuario no autenticado.");
        }
        return agrupamientoRepository.findAll();
    }

    public void eliminarAgrupamiento(Usuario admin, Integer idAgrupamiento) {
        if (admin == null || !"Administrador".equalsIgnoreCase(admin.getRol())) {
            throw new RuntimeException("Acceso denegado: Solo el Administrador puede disolver o eliminar agrupamientos físicamente.");
        }
        agrupamientoRepository.deleteById(idAgrupamiento);
        actividadesService.registrarAccion(admin, "Eliminó/Disolvió el agrupamiento ID: " + idAgrupamiento);
    }
}
