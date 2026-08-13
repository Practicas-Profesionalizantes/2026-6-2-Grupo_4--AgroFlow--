package com.agroflow.backend.service;

import com.agroflow.backend.model.Certificado;
import com.agroflow.backend.model.Animales;
import com.agroflow.backend.model.Usuario;
import com.agroflow.backend.repository.CertificadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class CertificadoService {

    @Autowired
    private CertificadoRepository certificadoRepository;

    @Autowired
    private ActividadesService actividadesService;

    public Certificado emitirCertificadoOficial(Usuario supervisor, Animales animal, String imgRuta, 
                                               LocalDate vto, String tipo, String nroReguladora) {
                                                   
        if (supervisor == null || (!"Supervisor".equalsIgnoreCase(supervisor.getRol()) && !"Administrador".equalsIgnoreCase(supervisor.getRol()))) {
            throw new RuntimeException("Acceso denegado: Solo el Supervisor o el Administrador pueden emitir certificados legales.");
        }

        if (animal == null) {
            throw new RuntimeException("Error: Debe asociar un animal válido al certificado.");
        }

        Certificado certificado = new Certificado();
        certificado.setAnimal(animal);
        certificado.setSupervisor(supervisor);
        certificado.setImgDocumento(imgRuta);
        certificado.setFechaEmision(LocalDate.now());
        certificado.setFechaVencimiento(vto);
        certificado.setEstadoAprobacion("Aprobado");
        certificado.setTipoCertificado(tipo);
        certificado.setNumeroEntidadReguladora(nroReguladora);

        Certificado guardado = certificadoRepository.save(certificado);

        actividadesService.registrarAccion(supervisor, "Emitió certificado legal '" + tipo + "' (Nro: " + nroReguladora + ") para el animal ID: " + animal.getId());
        return guardado;
    }

    public List<Certificado> obtenerCertificadosPorAnimal(Usuario usuarioConsulta, Integer animalId) {
        if (usuarioConsulta == null) {
            throw new RuntimeException("Acceso denegado: Usuario no autenticado.");
        }
        return certificadoRepository.findByAnimalId(animalId);
    }

    public Certificado cambiarEstadoAprobacion(Usuario supervisor, Integer idCertificado, String nuevoEstado) {
        if (supervisor == null || (!"Supervisor".equalsIgnoreCase(supervisor.getRol()) && !"Administrador".equalsIgnoreCase(supervisor.getRol()))) {
            throw new RuntimeException("Acceso denegado: No tienes permisos para alterar el estado de validación legal.");
        }

        Certificado certificado = certificadoRepository.findById(idCertificado)
                .orElseThrow(() -> new RuntimeException("No se encontró el certificado especificado."));

        certificado.setEstadoAprobacion(nuevoEstado);
        Certificado actualizado = certificadoRepository.save(certificado);

        actividadesService.registrarAccion(supervisor, "Modificó estado de aprobación del certificado ID: " + idCertificado + " a: " + nuevoEstado);
        return actualizado;
    }
}
