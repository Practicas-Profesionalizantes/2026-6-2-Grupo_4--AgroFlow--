package com.agroflow.backend.service;

import com.agroflow.backend.model.Distribucion;
import com.agroflow.backend.model.Usuario;
import com.agroflow.backend.repository.DistribucionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class DistribucionService {

    @Autowired
    private DistribucionRepository distribucionRepository;

    @Autowired
    private ActividadesService actividadesService;

    public Distribucion registrarCargaYDespacho(Usuario operario, Usuario supervisor, String conductor, 
                                                String documento, String patenteCamion, String patenteAcoplado, 
                                                String ruta, String coordenadasGps) {
                                                    
        if (operario == null || (!"Operario".equalsIgnoreCase(operario.getRol()) && !"Administrador".equalsIgnoreCase(operario.getRol()))) {
            throw new RuntimeException("Acceso denegado: Solo el Operario o el Administrador pueden registrar la carga y despacho.");
        }

        if (supervisor == null || !"Supervisor".equalsIgnoreCase(supervisor.getRol())) {
            throw new RuntimeException("Error: Debe asignar un Supervisor válido para autorizar el viaje legalmente.");
        }

        Distribucion viaje = new Distribucion();
        viaje.setSupervisor(supervisor);
        viaje.setConductorNombre(conductor);
        viaje.setConductorDocumento(documento);
        viaje.setPatenteCamion(patenteCamion);
        viaje.setPatenteAcoplado(patenteAcoplado);
        viaje.setRutaAsignada(ruta);
        viaje.setCoordenadasGps(coordenadasGps);
        viaje.setEstadoEnvio("Pendiente");

        Distribucion guardado = distribucionRepository.save(viaje);

        actividadesService.registrarAccion(operario, "Despachó transporte de carga ID: " + guardado.getId() + 
                " con destino ruta '" + ruta + "'. Conductor: " + conductor + ". Supervisor a cargo: " + supervisor.getNombre());
                
        return guardado;
    }

    public Distribucion actualizarTrackingGps(Usuario conductorOEmpleado, Integer idDistribucion, String nuevasCoordenadas, String nuevoEstado) {
        Distribucion viaje = distribucionRepository.findById(idDistribucion)
                .orElseThrow(() -> new RuntimeException("No se encontró el viaje especificado."));

        if (nuevasCoordenadas != null && !nuevasCoordenadas.trim().isEmpty()) {
            viaje.setCoordenadasGps(nuevasCoordenadas);
        }

        if (nuevoEstado != null && !nuevoEstado.trim().isEmpty()) {
            viaje.setEstadoEnvio(nuevoEstado);
            if ("Entregado".equalsIgnoreCase(nuevoEstado)) {
                viaje.setFechaArribo(LocalDateTime.now());
            }
        }

        Distribucion actualizado = distribucionRepository.save(viaje);
        actividadesService.registrarAccion(conductorOEmpleado, "Actualizó ubicación/estado del viaje ID: " + idDistribucion + " a estado: " + nuevoEstado);
        
        return actualizado;
    }

    public List<Distribucion> listarViajesPorEstado(String estado) {
        return distribucionRepository.findByEstadoEnvio(estado);
    }
}
