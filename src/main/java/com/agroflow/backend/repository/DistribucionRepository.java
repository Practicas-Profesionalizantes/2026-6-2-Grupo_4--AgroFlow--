package com.agroflow.backend.repository;

import com.agroflow.backend.model.Distribucion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DistribucionRepository extends JpaRepository<Distribucion, Integer> {
    List<Distribucion> findByEstadoEnvio(String estadoEnvio);
}
