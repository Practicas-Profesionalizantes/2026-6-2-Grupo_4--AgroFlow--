package com.agroflow.backend.repository;

import com.agroflow.backend.model.BajasAnimales;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BajasAnimalesRepository extends JpaRepository<BajasAnimales, Integer> {
}

