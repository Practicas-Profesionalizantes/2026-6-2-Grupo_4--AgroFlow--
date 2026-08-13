package com.agroflow.backend.service;

import com.agroflow.backend.model.HistorialPesaje;
import com.agroflow.backend.model.Animales;
import com.agroflow.backend.model.Usuario;
import com.agroflow.backend.repository.HistorialPesajeRepository;
import com.agroflow.backend.repository.AnimalesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class HistorialPesajeService {

    @Autowired
    private HistorialPesajeRepository historialPesajeRepository;

    @Autowired
    private AnimalesRepository animalesRepository;

    @Autowired
    private ActividadesService actividadesService;

    @Transactional
    public HistorialPesaje registrarPesaje(Usuario operario, Animales animal, BigDecimal nuevoPeso) {
        if (operario == null || (!"Operario".equalsIgnoreCase(operario.getRol()) && !"Administrador".equalsIgnoreCase(operario.getRol()))) {
            throw new RuntimeException("Acceso denegado: Solo el Operario o el Administrador pueden registrar pesajes.");
        }

        if (animal == null || nuevoPeso == null || nuevoPeso.compareTo(BigDecimal.ZERO) <= 0) {
            throw new RuntimeException("Error: Debe especificar un animal válido y un peso mayor a cero.");
        }

        BigDecimal pesoAnterior = animal.getPeso();
        
        List<HistorialPesaje> historiales = historialPesajeRepository.findByAnimalIdOrderByFechaPesajeDesc(animal.getId());
        String infoClimaticaAlert = "";
        
        if (!historiales.isEmpty()) {
            HistorialPesaje ultimoPesaje = historiales.get(0);
            long diasTranscurridos = ChronoUnit.DAYS.between(ultimoPesaje.getFechaPesaje(), LocalDate.now());
            
            if (nuevoPeso.compareTo(pesoAnterior) < 0) {
                infoClimaticaAlert = " [ALERTA: Pérdida de peso detectada en " + diasTranscurridos + " días. Evaluar estrés climático/sanitario]";
            }
        }

        animal.setPeso(nuevoPeso);
        animalesRepository.save(animal);

        HistorialPesaje nuevoPesaje = new HistorialPesaje(operario, animal, LocalDate.now(), nuevoPeso);
        HistorialPesaje guardado = historialPesajeRepository.save(nuevoPesaje);

        actividadesService.registrarAccion(operario, 
            "Registró pesaje del animal ID: " + animal.getId() + 
            ". Peso anterior: " + (pesoAnterior != null ? pesoAnterior : "0") + " kg, Nuevo peso: " + nuevoPeso + " kg." + infoClimaticaAlert
        );

        return guardado;
    }

    public List<HistorialPesaje> obtenerHistorialPorAnimal(Integer animalId) {
        return historialPesajeRepository.findByAnimalIdOrderByFechaPesajeDesc(animalId);
    }
}
