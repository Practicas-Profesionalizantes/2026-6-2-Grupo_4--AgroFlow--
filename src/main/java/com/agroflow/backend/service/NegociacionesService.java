package com.agroflow.backend.service;

import com.agroflow.backend.model.Negociaciones;
import com.agroflow.backend.model.Usuario;
import com.agroflow.backend.model.Animales;
import com.agroflow.backend.repository.NegociacionesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.List;

@Service
public class NegociacionesService {

    @Autowired
    private NegociacionesRepository negociacionesRepository;

    @Autowired
    private ActividadesService actividadesService;

    public Negociaciones crearOfertaCliente(Usuario cliente, Animales animal, BigDecimal precioDeslizador) {
        if (cliente == null || !"Cliente".equalsIgnoreCase(cliente.getRol())) {
            throw new RuntimeException("Acceso denegado: Solo los clientes pueden iniciar ofertas por animales.");
        }
        
        Negociaciones nuevaOferta = new Negociaciones(cliente, null, precioDeslizador, "Pendiente", animal);
        Negociaciones guardada = negociacionesRepository.save(nuevaOferta);
        
        actividadesService.registrarAccion(cliente, "Creó una oferta de $" + precioDeslizador + " por el animal ID: " + animal.getId());
        return guardada;
    }

    public Negociaciones responderOferta(Usuario empleado, Integer idNegociacion, String nuevoEstado) {
        if (empleado == null || (!"Supervisor".equalsIgnoreCase(empleado.getRol()) && !"Administrador".equalsIgnoreCase(empleado.getRol()))) {
            throw new RuntimeException("Acceso denegado: No tienes permisos para responder ofertas comerciales.");
        }

        Negociaciones negociacion = negociacionesRepository.findById(idNegociacion)
                .orElseThrow(() -> new RuntimeException("No se encontró la negociación especificada."));

        negociacion.setContraparte(empleado);
        negociacion.setEstadoOferta(nuevoEstado);

        actividadesService.registrarAccion(empleado, "Cambió el estado de la negociación ID: " + idNegociacion + " a: " + nuevoEstado);
        return negociacionesRepository.save(negociacion);
    }

    public Negociaciones crearContraofertaEmpleado(Usuario empleado, Integer idNegociacion, BigDecimal precioContraoferta) {
        if (empleado == null || (!"Supervisor".equalsIgnoreCase(empleado.getRol()) && !"Administrador".equalsIgnoreCase(empleado.getRol()))) {
            throw new RuntimeException("Acceso denegado: No tienes permisos para realizar contraofertas.");
        }

        Negociaciones negociacionOriginal = negociacionesRepository.findById(idNegociacion)
                .orElseThrow(() -> new RuntimeException("No se encontró la negociación especificada."));

        Usuario clienteOriginal = negociacionOriginal.getProponente();

        Negociaciones contraoferta = new Negociaciones(empleado, clienteOriginal, precioContraoferta, "Contraoferta", negociacionOriginal.getAnimal());
        Negociaciones guardada = negociacionesRepository.save(contraoferta);

        actividadesService.registrarAccion(empleado, "Realizó una contraoferta de $" + precioContraoferta + " al cliente: " + clienteOriginal.getNombre());
        return guardada;
    }

    public List<Negociaciones> obtenerHistorialPorAnimal(Integer animalId) {
        return negociacionesRepository.findByAnimalId(animalId);
    }
}
