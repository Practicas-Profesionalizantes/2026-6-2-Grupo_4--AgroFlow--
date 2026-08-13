package com.agroflow.backend.repository;

import com.agroflow.backend.model.Actividades;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ActividadesRepository extends JpaRepository<Actividades, Integer> {
    List<Actividades> findByUsuarioId(Integer usuarioId);
}
