package com.agroflow.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "bajas_animales")
public class BajasAnimales {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "animal_id", nullable = false)
    private Animales animal;

    @Column(nullable = false)
    private LocalDate fecha;

    @Column(length = 100)
    private String motivo;

    @Column(columnDefinition = "TEXT")
    private String detalles;

    @PrePersist
    protected void onCreate() {
        if (this.fecha == null) {
            this.fecha = LocalDate.now();
        }
    }

    public BajasAnimales() {
    }

    public BajasAnimales(Animales animal, LocalDate fecha, String motivo, String detalles) {
        this.animal = animal;
        this.fecha = fecha;
        this.motivo = motivo;
        this.detalles = detalles;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Animales getAnimal() {
        return animal;
    }

    public void setAnimal(Animales animal) {
        this.animal = animal;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public String getMotivo() {
        return motivo;
    }

    public void setMotivo(String motivo) {
        this.motivo = motivo;
    }

    public String getDetalles() {
        return detalles;
    }

    public void setDetalles(String detalles) {
        this.detalles = detalles;
    }
}
