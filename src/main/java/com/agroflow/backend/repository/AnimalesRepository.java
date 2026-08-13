package com.agroflow.backend.repository;

import com.agroflow.backend.model.Animales;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AnimalesRepository extends JpaRepository<Animales, Integer> {
    
    Animales findByCodigoRfid(String codigoRfid);
    
    // Este método te servirá para listar animales de un mismo lote
    List<Animales> findByAgrupamientoId(Integer agrupamientoId);
}
