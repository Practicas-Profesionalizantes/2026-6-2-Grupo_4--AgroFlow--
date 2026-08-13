package com.agroflow.backend.service;

import com.agroflow.backend.model.Salud;
import com.agroflow.backend.model.Animales;
import com.agroflow.backend.model.Stock;
import com.agroflow.backend.model.Usuario;
import com.agroflow.backend.repository.SaludRepository;
import com.agroflow.backend.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import java.math.BigDecimal;
import java.util.List;

@Service
public class SaludService {

    @Autowired
    private SaludRepository saludRepository;

    @Autowired
    private StockRepository stockRepository;

    @Autowired
    private ActividadesService actividadesService;

    @Transactional
    public Salud registrarControlSanitario(Usuario operario, Animales animal, Stock medicamento, 
                                          BigDecimal cantidadUsada, String tipoControl, 
                                          String descripcion, Integer diasCarencia) {
                                              
        if (operario == null || (!"Operario".equalsIgnoreCase(operario.getRol()) && !"Administrador".equalsIgnoreCase(operario.getRol()))) {
            throw new RuntimeException("Acceso denegado: Solo el Operario o el Administrador pueden registrar eventos de salud.");
        }

        if (animal == null) {
            throw new RuntimeException("Error: Debe especificar un animal válido para el control.");
        }

        if (medicamento != null && cantidadUsada != null && cantidadUsada.compareTo(BigDecimal.ZERO) > 0) {
            if (medicamento.getCantidadTotal().compareTo(cantidadUsada) < 0) {
                throw new RuntimeException("Error: No hay suficiente stock de " + medicamento.getNombre() + " disponible.");
            }
            medicamento.setCantidadTotal(medicamento.getCantidadTotal().subtract(cantidadUsada));
            stockRepository.save(medicamento);
        }

        Salud registroSalud = new Salud();
        registroSalud.setAnimal(animal);
        registroSalud.setInsumo(medicamento);
        registroSalud.setTipoControl(tipoControl);
        registroSalud.setDescripcion(descripcion);
        registroSalud.setDiasCarenciaMedicamentos(diasCarencia != null ? diasCarencia : 0);
        
        Salud guardado = saludRepository.save(registroSalud);

        String logMsg = "Registró control de salud (" + tipoControl + ") para el animal ID: " + animal.getId();
        if (medicamento != null) {
            logMsg += ". Se aplicó: " + cantidadUsada + " de " + medicamento.getNombre();
            if (medicamento.getCantidadTotal().compareTo(medicamento.getAlertaMinima()) <= 0) {
                logMsg += " ¡ALERTA DE STOCK MINIMO EN MEDICAMENTO! Quedan: " + medicamento.getCantidadTotal();
            }
        }

        actividadesService.registrarAccion(operario, logMsg);
        return guardado;
    }

    public List<Salud> obtenerHistorialClinicoAnimal(Integer animalId) {
        return saludRepository.findByAnimalId(animalId);
    }
}
