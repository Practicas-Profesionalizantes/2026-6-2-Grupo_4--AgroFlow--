package com.agroflow.backend.service;

import com.agroflow.backend.model.Stock;
import com.agroflow.backend.model.Usuario;
import com.agroflow.backend.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class StockService {

    @Autowired
    private StockRepository stockRepository;

    @Autowired
    private ActividadesService actividadesService;

    public List<Stock> obtenerInventarioCompleto(Usuario usuario) {
        if (usuario == null || (!"Supervisor".equalsIgnoreCase(usuario.getRol()) && 
                                !"Administrador".equalsIgnoreCase(usuario.getRol()) && 
                                !"Operario".equalsIgnoreCase(usuario.getRol()))) {
            throw new RuntimeException("Acceso denegado: No tienes permisos para visualizar el inventario.");
        }
        return stockRepository.findAll();
    }

    public Stock realizarRecuentoStock(Usuario supervisor, Integer idInsumo, BigDecimal nuevaCantidad) {
        if (supervisor == null || (!"Supervisor".equalsIgnoreCase(supervisor.getRol()) && !"Administrador".equalsIgnoreCase(supervisor.getRol()))) {
            throw new RuntimeException("Acceso denegado: Solo el Supervisor o Administrador pueden realizar recuentos oficiales.");
        }

        Stock insumo = stockRepository.findById(idInsumo)
                .orElseThrow(() -> new RuntimeException("No se encontró el insumo en el inventario."));

        BigDecimal cantidadAnterior = insumo.getCantidadTotal();
        insumo.setCantidadTotal(nuevaCantidad);
        Stock guardado = stockRepository.save(insumo);

        actividadesService.registrarAccion(supervisor, "Realizó recuento de stock en '" + insumo.getNombre() + 
                "'. Cantidad anterior: " + cantidadAnterior + " " + insumo.getUnidadMinima() + 
                ", Nueva cantidad: " + nuevaCantidad + " " + insumo.getUnidadMinima());

        return guardado;
    }

    public Stock registrarIngresoInsumo(Usuario usuario, Stock nuevoInsumo) {
        if (usuario == null || (!"Supervisor".equalsIgnoreCase(usuario.getRol()) && !"Administrador".equalsIgnoreCase(usuario.getRol()))) {
            throw new RuntimeException("Acceso denegado: No tienes permisos para registrar nuevos insumos al stock.");
        }
        
        Stock guardado = stockRepository.save(nuevoInsumo);
        actividadesService.registrarAccion(usuario, "Registró un nuevo insumo en stock: " + nuevoInsumo.getNombre() + " (" + nuevoInsumo.getCantidadTotal() + " " + nuevoInsumo.getUnidadMinima() + ")");
        return guardado;
    }

    public boolean verificarAlertaMinima(Integer idInsumo) {
        Stock insumo = stockRepository.findById(idInsumo)
                .orElseThrow(() -> new RuntimeException("Insumo no encontrado."));
        
        return insumo.getCantidadTotal().compareTo(insumo.getAlertaMinima()) <= 0;
    }
}
