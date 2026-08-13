package com.agroflow.backend.service;

import com.agroflow.backend.model.Alimentacion;
import com.agroflow.backend.model.Agrupamiento;
import com.agroflow.backend.model.Stock;
import com.agroflow.backend.model.Usuario;
import com.agroflow.backend.repository.AlimentacionRepository;
import com.agroflow.backend.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import java.math.BigDecimal;
import java.util.List;

@Service
public class AlimentacionService {

    @Autowired
    private AlimentacionRepository alimentacionRepository;

    @Autowired
    private StockRepository stockRepository;

    @Autowired
    private ActividadesService actividadesService;

    @Transactional
    public Alimentacion registrarAlimentacion(Usuario operario, Agrupamiento lote, Stock insumo, BigDecimal cantidadKg) {
        if (operario == null || (!"Operario".equalsIgnoreCase(operario.getRol()) && !"Administrador".equalsIgnoreCase(operario.getRol()))) {
            throw new RuntimeException("Acceso denegado: Solo el Operario o el Administrador pueden registrar la alimentación.");
        }

        if (insumo == null || cantidadKg == null || cantidadKg.compareTo(BigDecimal.ZERO) <= 0) {
            throw new RuntimeException("Error: Debe especificar un insumo válido y una cantidad mayor a cero.");
        }

        if (insumo.getCantidadTotal().compareTo(cantidadKg) < 0) {
            throw new RuntimeException("Error: No hay suficiente stock de " + insumo.getNombre() + " disponible.");
        }

        insumo.setCantidadTotal(insumo.getCantidadTotal().subtract(cantidadKg));
        stockRepository.save(insumo);

        Alimentacion alimentacion = new Alimentacion(lote, insumo, insumo.getNombre(), cantidadKg);
        Alimentacion guardada = alimentacionRepository.save(alimentacion);

        String logMsg = "Registró alimentación para el lote '" + lote.getNombreLote() + 
                        "'. Consumo: " + cantidadKg + " kg de " + insumo.getNombre();
        
        if (insumo.getCantidadTotal().compareTo(insumo.getAlertaMinima()) <= 0) {
            logMsg += " ¡ALERTA: Stock mínimo alcanzado! Quedan: " + insumo.getCantidadTotal() + " " + insumo.getUnidadMinima();
        }

        actividadesService.registrarAccion(operario, logMsg);
        return guardada;
    }

    public List<Alimentacion> obtenerHistorialPorLote(Integer agrupamientoId) {
        return alimentacionRepository.findByAgrupamientoId(agrupamientoId);
    }
}
