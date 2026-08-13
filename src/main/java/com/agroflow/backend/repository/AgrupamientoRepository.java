package com.agroflow.backend.repository;

import com.agroflow.backend.model.Agrupamiento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AgrupamientoRepository extends JpaRepository<Agrupamiento, Integer> {
}
