package com.agroflow.backend.repository;

import com.agroflow.backend.model.Salud;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SaludRepository extends JpaRepository<Salud, Integer> {
    List<Salud> findByAnimalId(Integer animalId);
}
