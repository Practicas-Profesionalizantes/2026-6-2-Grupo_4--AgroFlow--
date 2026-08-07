package com.agroflow.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "agrupamiento")
public class Agrupamiento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nombre_lote", length = 100)
    private String nombreLote;

    @Column(length = 50)
    private String lote;

    @Column(unique = true, length = 50)
    private String caravana;

    public Agrupamiento() {
    }

    public Agrupamiento(String nombreLote, String lote, String caravana) {
        this.nombreLote = nombreLote;
        this.lote = lote;
        this.caravana = caravana;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNombreLote() {
        return nombreLote;
    }

    public void setNombreLote(String nombreLote) {
        this.nombreLote = nombreLote;
    }

    public String getLote() {
        return lote;
    }

    public void setLote(String lote) {
        this.lote = lote;
    }

    public String getCaravana() {
        return caravana;
    }

    public void setCaravana(String caravana) {
        this.caravana = caravana;
    }
}
