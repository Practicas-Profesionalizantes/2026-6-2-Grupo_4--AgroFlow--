package com.agroflow.backend.service;

import com.agroflow.backend.model.DocumentosTransportes;
import com.agroflow.backend.model.Distribucion;
import com.agroflow.backend.model.Usuario;
import com.agroflow.backend.repository.DocumentosTransportesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class DocumentosTransportesService {

    @Autowired
    private DocumentosTransportesRepository documentosTransportesRepository;

    @Autowired
    private ActividadesService actividadesService;

    public DocumentosTransportes registrarDocumentoViaje(Usuario operario, Distribucion viaje, String imgRuta, String nroGuia) {
        if (operario == null || (!"Operario".equalsIgnoreCase(operario.getRol()) && !"Administrador".equalsIgnoreCase(operario.getRol()))) {
            throw new RuntimeException("Acceso denegado: Solo el Operario o el Administrador pueden registrar documentos de transporte.");
        }

        if (viaje == null) {
            throw new RuntimeException("Error: Debe asociar un viaje de distribución válido.");
        }

        DocumentosTransportes documento = new DocumentosTransportes();
        documento.setDistribucion(viaje);
        documento.setImgArchivo(imgRuta);
        documento.setNumeroGuiaTransito(nroGuia);
        documento.setFechaEmision(LocalDate.now());
        documento.setVerificadoLegalmente(false);

        DocumentosTransportes guardado = documentosTransportesRepository.save(documento);

        actividadesService.registrarAccion(operario, "Adjuntó guía de tránsito Nro: " + nroGuia + " al viaje de distribución ID: " + viaje.getId());
        return guardado;
    }

    public DocumentosTransportes verificarDocumentoLey(Usuario supervisor, Integer idDocumento, Boolean verificado) {
        if (supervisor == null || (!"Supervisor".equalsIgnoreCase(supervisor.getRol()) && !"Administrador".equalsIgnoreCase(supervisor.getRol()))) {
            throw new RuntimeException("Acceso denegado: Solo el Supervisor o el Administrador pueden realizar verificaciones legales.");
        }

        DocumentosTransportes documento = documentosTransportesRepository.findById(idDocumento)
                .orElseThrow(() -> new RuntimeException("No se encontró el documento de transporte especificado."));

        documento.setVerificadoLegalmente(verificado);
        DocumentosTransportes actualizado = documentosTransportesRepository.save(documento);

        String estadoText = verificado ? "APROBADO LEGALMENTE" : "RECHAZADO/PENDIENTE";
        actividadesService.registrarAccion(supervisor, "Verificó la guía Nro: " + documento.getNumeroGuiaTransito() + ". Estado: " + estadoText);
        
        return actualizado;
    }

    public List<DocumentosTransportes> obtenerDocumentosPorViaje(Integer idDistribucion) {
        return documentosTransportesRepository.findByDistribucionId(idDistribucion);
    }
}
