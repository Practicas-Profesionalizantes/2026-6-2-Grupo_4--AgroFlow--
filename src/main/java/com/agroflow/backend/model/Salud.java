package com.agroflow.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "salud")
public class Salud {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private LocalDate fecha;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @Column(name = "dias_carencia_medicamentos")
    private Integer diasCarenciaMedicamentos = 0;

    @Column(name = "tipo_control", length = 100)
    private String tipoControl;

    @ManyToOne
    @JoinColumn(name = "insumo_id")
    private Stock insumo;

    @ManyToOne
    @JoinColumn(name = "animal_id", nullable = false)
    private Animales animal;

    @PrePersist
    protected void onCreate() {
        if (this.fecha == null) {
            this.fecha = LocalDate.now();
        }
    }

    public Salud() {
    }

    public Salud(LocalDate fecha, String descripcion, Integer diasCarenciaMedicamentos, String tipoControl, Stock insumo, Animales animal) {
        this.fecha = fecha;
        this.descripcion = descripcion;
        this.diasCarenciaMedicamentos = diasCarenciaMedicamentos;
        this.tipoControl = tipoControl;
        this.insumo = insumo;
        this.animal = animal;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Integer getDiasCarenciaMedicamentos() {
        return diasCarenciaMedicamentos;
    }

    public void setDiasCarenciaMedicamentos(Integer diasCarenciaMedicamentos) {
        this.diasCarenciaMedicamentos = diasCarenciaMedicamentos;
    }

    public String getTipoControl() {
        return tipoControl;
    }

    public void setTipoControl(String tipoControl) {
        this.tipoControl = tipoControl;
    }

    public Stock getInsumo() {
        return insumo;
    }

    public void setInsumo(Stock insumo) {
        this.insumo = insumo;
    }

    public Animales getAnimal() {
        return animal;
    }

    public void setAnimal(Animales animal) {
        this.animal = animal;
    }
}
