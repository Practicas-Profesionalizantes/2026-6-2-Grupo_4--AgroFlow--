package com.agroflow.backend.service;

import com.agroflow.backend.model.Animales;
import com.agroflow.backend.model.Agrupamiento;
import com.agroflow.backend.model.Usuario;
import com.agroflow.backend.repository.AnimalesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AnimalesService {

    @Autowired
    private AnimalesRepository animalesRepository;

    public List<Animales> listarTodos() {
        return animalesRepository.findAll();
    }

    public Animales asignarLote(Usuario empleado, Animales animal, Agrupamiento lote) {
        if (empleado == null || (!"Operario".equalsIgnoreCase(empleado.getRol()) && !"Administrador".equalsIgnoreCase(empleado.getRol()))) {
            throw new RuntimeException("Acceso denegado: Rol no autorizado para agrupar animales.");
        }
        animal.setAgrupamiento(lote);
        return animalesRepository.save(animal);
    }

    public Animales obtenerPorRfid(String rfid) {
        return animalesRepository.findByCodigoRfid(rfid);
    }
}
