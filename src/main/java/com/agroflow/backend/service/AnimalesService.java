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

    // !!! TE FALTA AGREGAR ESTA INYECCIÓN DE ACÁ !!!
    @Autowired
    private ActividadesService actividadesService;

    public List<Animales> listarTodos() {
        return animalesRepository.findAll();
    }

    public Animales crearAnimal(Usuario admin, Animales animal) {
        if (admin == null || (!"Administrador".equalsIgnoreCase(admin.getRol()) && !"Supervisor".equalsIgnoreCase(admin.getRol()))) {
            throw new RuntimeException("Acceso denegado: Solo el Administrador o Supervisor pueden registrar animales.");
        }
        Animales guardado = animalesRepository.save(animal);
        actividadesService.registrarAccion(admin, "Registró un nuevo animal/lote ID: " + guardado.getId());
        return guardado;
    }

    public Animales asignarLote(Usuario empleado, Animales animal, Agrupamiento lote) {
        if (empleado == null || (!"Operario".equalsIgnoreCase(empleado.getRol()) && !"Administrador".equalsIgnoreCase(empleado.getRol()))) {
            throw new RuntimeException("Acceso denegado: Rol no autorizado para agrupar animales.");
        }
        animal.setAgrupamiento(lote);
        actividadesService.registrarAccion(empleado, "Asignó el animal RFID: " + animal.getCodigoRfid() + " al lote ID: " + lote.getId());
        return animalesRepository.save(animal);
    }

    public Animales obtenerPorRfid(String rfid) {
        return animalesRepository.findByCodigoRfid(rfid);
    }
}
