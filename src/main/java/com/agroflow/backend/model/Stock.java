package com.agroflow.backend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "stock")
public class Stock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(name = "cantidad_total", precision = 10, scale = 2)
    private BigDecimal cantidadTotal = BigDecimal.ZERO;

    @Column(name = "punto_reposicion", precision = 10, scale = 2)
    private BigDecimal puntoReposicion;

    @Column(name = "alerta_minima", precision = 10, scale = 2)
    private BigDecimal alertaMinima = BigDecimal.ZERO;

    @Column(name = "unidad_minima", length = 20)
    private String unidadMinima;

    public Stock() {
    }

    public Stock(String nombre, BigDecimal cantidadTotal, BigDecimal puntoReposicion, BigDecimal alertaMinima, String unidadMinima) {
        this.nombre = nombre;
        this.cantidadTotal = cantidadTotal;
        this.puntoReposicion = puntoReposicion;
        this.alertaMinima = alertaMinima;
        this.unidadMinima = unidadMinima;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public BigDecimal getCantidadTotal() {
        return cantidadTotal;
    }

    public void setCantidadTotal(BigDecimal cantidadTotal) {
        this.cantidadTotal = cantidadTotal;
    }

    public BigDecimal getPuntoReposicion() {
        return puntoReposicion;
    }

    public void setPuntoReposicion(BigDecimal puntoReposicion) {
        this.puntoReposicion = puntoReposicion;
    }

    public BigDecimal getAlertaMinima() {
        return alertaMinima;
    }

    public void setAlertaMinima(BigDecimal alertaMinima) {
        this.alertaMinima = alertaMinima;
    }

    public String getUnidadMinima() {
        return unidadMinima;
    }

    public void setUnidadMinima(String unidadMinima) {
        this.unidadMinima = unidadMinima;
    }
}
