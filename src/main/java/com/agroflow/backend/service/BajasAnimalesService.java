package com.agroflow.backend.service;

import com.agroflow.backend.model.BajasAnimales;
import com.agroflow.backend.model.Animales;
import com.agroflow.backend.model.Usuario;
import com.agroflow.backend.repository.BajasAnimalesRepository;
import com.agroflow.backend.repository.AnimalesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import java.time.LocalDate;

@Service
public class BajasAnimalesService {

    @Autowired
    private BajasAnimalesRepository bajasAnimalesRepository;

    @Autowired
    private AnimalesRepository animalesRepository;

    @Autowired
    private ActividadesService actividadesService;

    @Transactional
    public BajasAnimales registrarBaja(Usuario operario, Animales animal, String motivo, String detalles) {
        if (operario == null || (!"Operario".equalsIgnoreCase(operario.getRol()) && !"Administrador".equalsIgnoreCase(operario.getRol()))) {
            throw new RuntimeException("Acceso denegado: Solo el Operario o el Administrador pueden registrar bajas de animales.");
        }

        if (animal == null) {
            throw new RuntimeException("Error: Debe especificar un animal válido para procesar la baja.");
        }

        if ("En Viaje".equalsIgnoreCase(animal.getEstado()) || "Enviado".equalsIgnoreCase(animal.getEstado())) {
            throw new RuntimeException("Error: No se puede dar de baja de forma manual a un animal que se encuentra actualmente en estado de envío.");
        }

        String nuevoEstadoAnimal = "Baja";
        if ("Muerte".equalsIgnoreCase(motivo) || "Muerto".equalsIgnoreCase(motivo)) {
            nuevoEstadoAnimal = "Muerto";
        } else if ("Venta".equalsIgnoreCase(motivo) || "Vendido".equalsIgnoreCase(motivo)) {
            nuevoEstadoAnimal = "Vendido";
        }

        animal.setEstado(nuevoEstadoAnimal);
        animalesRepository.save(animal);

        BajasAnimales baja = new BajasAnimales(animal, LocalDate.now(), motivo, detalles);
        BajasAnimales guardada = bajasAnimalesRepository.save(baja);

        actividadesService.registrarAccion(operario, "Registró la baja del animal ID: " + animal.getId() + ". Motivo: " + motivo + ". Estado del animal actualizado a: " + nuevoEstadoAnimal);

        return guardada;
    }
}
