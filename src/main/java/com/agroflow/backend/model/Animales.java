package com.agroflow.backend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "animales")
public class Animales {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(precision = 10, scale = 2)
    private BigDecimal peso;

    @Column(length = 50)
    private String especie;

    private Integer edad;

    @Column(length = 50)
    private String raza;

    @Column(name = "codigo_rfid", unique = true, length = 50)
    private String codigoRfid;

    @Column(length = 50)
    private String estado;

    @ManyToOne
    @JoinColumn(name = "agrupamiento_id")
    private Agrupamiento agrupamiento;

    public Animales() {
    }

    public Animales(BigDecimal peso, String especie, Integer edad, String raza, String codigoRfid, String estado, Agrupamiento agrupamiento) {
        this.peso = peso;
        this.especie = especie;
        this.edad = edad;
        this.raza = raza;
        this.codigoRfid = codigoRfid;
        this.estado = estado;
        this.agrupamiento = agrupamiento;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public BigDecimal getPeso() {
        return peso;
    }

    public void setPeso(BigDecimal peso) {
        this.peso = peso;
    }

    public String getEspecie() {
        return especie;
    }

    public void setEspecie(String especie) {
        this.especie = especie;
    }

    public Integer getEdad() {
        return edad;
    }

    public void setEdad(Integer edad) {
        this.edad = edad;
    }

    public String getRaza() {
        return raza;
    }

    public void setRaza(String raza) {
        this.raza = raza;
    }

    public String getCodigoRfid() {
        return codigoRfid;
    }

    public void setCodigoRfid(String codigoRfid) {
        this.codigoRfid = codigoRfid;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Agrupamiento getAgrupamiento() {
        return agrupamiento;
    }

    public void setAgrupamiento(Agrupamiento agrupamiento) {
        this.agrupamiento = agrupamiento;
    }
}
