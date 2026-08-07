package com.agroflow.backend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "historial_pesaje")
public class HistorialPesaje {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "operario_id", nullable = false)
    private Usuario operario;

    @ManyToOne
    @JoinColumn(name = "animal_id", nullable = false)
    private Animales animal;

    @Column(name = "fecha_pesaje", nullable = false)
    private LocalDate fechaPesaje;

    @Column(name = "peso_kg", precision = 10, scale = 2, nullable = false)
    private BigDecimal pesoKg;

    @PrePersist
    protected void onCreate() {
        if (this.fechaPesaje == null) {
            this.fechaPesaje = LocalDate.now();
        }
    }

    public HistorialPesaje() {
    }

    public HistorialPesaje(Usuario operario, Animales animal, LocalDate fechaPesaje, BigDecimal pesoKg) {
        this.operario = operario;
        this.animal = animal;
        this.fechaPesaje = fechaPesaje;
        this.pesoKg = pesoKg;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Usuario getOperario() {
        return operario;
    }

    public void setOperario(Usuario operario) {
        this.operario = operario;
    }

    public Animales getAnimal() {
        return animal;
    }

    public void setAnimal(Animales animal) {
        this.animal = animal;
    }

    public LocalDate getFechaPesaje() {
        return fechaPesaje;
    }

    public void setFechaPesaje(LocalDate fechaPesaje) {
        this.fechaPesaje = fechaPesaje;
    }

    public BigDecimal getPesoKg() {
        return pesoKg;
    }

    public void setPesoKg(BigDecimal pesoKg) {
        this.pesoKg = pesoKg;
    }
}
