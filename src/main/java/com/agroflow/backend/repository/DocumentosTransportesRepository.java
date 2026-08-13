package com.agroflow.backend.repository;

import com.agroflow.backend.model.DocumentosTransportes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DocumentosTransportesRepository extends JpaRepository<DocumentosTransportes, Integer> {
    List<DocumentosTransportes> findByDistribucionId(Integer distribucionId);
}
