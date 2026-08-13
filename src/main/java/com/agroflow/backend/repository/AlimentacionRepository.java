package com.agroflow.backend.repository;

import com.agroflow.backend.model.Alimentacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AlimentacionRepository extends JpaRepository<Alimentacion, Integer> {
    List<Alimentacion> findByAgrupamientoId(Integer agrupamientoId);
}
