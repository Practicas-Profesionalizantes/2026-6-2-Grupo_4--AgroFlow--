package com.agroflow.backend.repository;

import com.agroflow.backend.model.HistorialPesaje;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface HistorialPesajeRepository extends JpaRepository<HistorialPesaje, Integer> {
    List<HistorialPesaje> findByAnimalIdOrderByFechaPesajeDesc(Integer animalId);
}
