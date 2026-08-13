package com.agroflow.backend.repository;

import com.agroflow.backend.model.Chats;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ChatsRepository extends JpaRepository<Chats, Integer> {
    List<Chats> findByDestinatarioIdOrRemitenteIdOrderByFechaAsc(Integer destinatarioId, Integer remitenteId);
}
