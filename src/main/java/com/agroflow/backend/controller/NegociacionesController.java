package com.agroflow.backend.controller;

import com.agroflow.backend.model.Negociaciones;
import com.agroflow.backend.model.Usuario;
import com.agroflow.backend.model.Animales;
import com.agroflow.backend.service.NegociacionesService;
import com.agroflow.backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/negociaciones")
@CrossOrigin(origins = "*")
public class NegociacionesController {

    @Autowired
    private NegociacionesService negociacionesService;

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/ofertar")
    public ResponseEntity<Negociaciones> crearOferta(@RequestParam Integer clienteId, 
                                                     @RequestParam BigDecimal precioDeslizador,
                                                     @RequestBody Animales animal) {
        Usuario cliente = usuarioService.obtenerPorId(clienteId)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
        return ResponseEntity.ok(negociacionesService.crearOfertaCliente(cliente, animal, precioDeslizador));
    }

    @PutMapping("/responder/{id}")
    public ResponseEntity<Negociaciones> responderOferta(@PathVariable Integer id, 
                                                         @RequestParam Integer empleadoId, 
                                                         @RequestParam String nuevoEstado) {
        Usuario empleado = usuarioService.obtenerPorId(empleadoId)
                .orElseThrow(() -> new RuntimeException("Empleado no encontrado"));
        return ResponseEntity.ok(negociacionesService.responderOferta(empleado, id, nuevoEstado));
    }

    @PostMapping("/contraofertar/{id}")
    public ResponseEntity<Negociaciones> contraofertar(@PathVariable Integer id, 
                                                       @RequestParam Integer empleadoId, 
                                                       @RequestParam BigDecimal precioContraoferta) {
        Usuario empleado = usuarioService.obtenerPorId(empleadoId)
                .orElseThrow(() -> new RuntimeException("Empleado no encontrado"));
        return ResponseEntity.ok(negociacionesService.crearContraofertaEmpleado(empleado, id, precioContraoferta));
    }

    @GetMapping("/animal/{animalId}")
    public ResponseEntity<List<Negociaciones>> obtenerHistorialPorAnimal(@PathVariable Integer animalId) {
        return ResponseEntity.ok(negociacionesService.obtenerHistorialPorAnimal(animalId));
    }
}
