package com.agroflow.backend.repository;

import com.agroflow.backend.model.Negociaciones;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface NegociacionesRepository extends JpaRepository<Negociaciones, Integer> {
    List<Negociaciones> findByAnimalId(Integer animalId);
}
