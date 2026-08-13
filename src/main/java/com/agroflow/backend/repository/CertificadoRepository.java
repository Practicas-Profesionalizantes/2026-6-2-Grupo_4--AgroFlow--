package com.agroflow.backend.repository;

import com.agroflow.backend.model.Certificado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CertificadoRepository extends JpaRepository<Certificado, Integer> {
    List<Certificado> findByAnimalId(Integer animalId);
}
