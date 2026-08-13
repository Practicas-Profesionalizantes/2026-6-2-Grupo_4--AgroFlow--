package com.agroflow.backend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "alimentacion")
public class Alimentacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "agrupamiento_id", nullable = false)
    private Agrupamiento agrupamiento;

    @ManyToOne
    @JoinColumn(name = "insumo_id")
    private Stock insumo;

    @Column(nullable = false)
    private LocalDateTime fecha;

    @Column(name = "tipo_alimento", length = 100)
    private String tipoAlimento;

    @Column(name = "cantidad_kg", precision = 10, scale = 2, nullable = false)
    private BigDecimal cantidadKg;

    @PrePersist
    protected void onCreate() {
        this.fecha = LocalDateTime.now();
    }

    public Alimentacion() {
    }

    public Alimentacion(Agrupamiento agrupamiento, Stock insumo, String tipoAlimento, BigDecimal cantidadKg) {
        this.agrupamiento = agrupamiento;
        this.insumo = insumo;
        this.tipoAlimento = tipoAlimento;
        this.cantidadKg = cantidadKg;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Agrupamiento getAgrupamiento() {
        return agrupamiento;
    }

    public void setAgrupamiento(Agrupamiento agrupamiento) {
        this.agrupamiento = agrupamiento;
    }

    public Stock getInsumo() {
        return insumo;
    }

    public void setInsumo(Stock insumo) {
        this.insumo = insumo;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }

    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }

    public String getTipoAlimento() {
        return tipoAlimento;
    }

    public void setTipoAlimento(String tipoAlimento) {
        this.tipoAlimento = tipoAlimento;
    }

    public BigDecimal getCantidadKg() {
        return cantidadKg;
    }

    public void setCantidadKg(BigDecimal cantidadKg) {
        this.cantidadKg = cantidadKg;
    }
}
