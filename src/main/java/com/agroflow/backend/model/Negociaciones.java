package com.agroflow.backend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "negociaciones")
public class Negociaciones {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "proponente_id", nullable = false)
    private Usuario proponente;

    @ManyToOne
    @JoinColumn(name = "contraparte_id", nullable = false)
    private Usuario contraparte;

    @Column(name = "fecha_oferta", nullable = false)
    private LocalDateTime fechaOferta;

    @Column(name = "precio_ofertado", precision = 12, scale = 2, nullable = false)
    private BigDecimal precioOfertado;

    @Column(name = "estado_oferta", length = 50)
    private String estadoOferta;

    @ManyToOne
    @JoinColumn(name = "animal_id", nullable = false)
    private Animales animal;

    @PrePersist
    protected void onCreate() {
        this.fechaOferta = LocalDateTime.now();
    }

    public Negociaciones() {
    }

    public Negociaciones(Usuario proponente, Usuario contraparte, BigDecimal precioOfertado, String estadoOferta, Animales animal) {
        this.proponente = proponente;
        this.contraparte = contraparte;
        this.precioOfertado = precioOfertado;
        this.estadoOferta = estadoOferta;
        this.animal = animal;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Usuario getProponente() {
        return proponente;
    }

    public void setProponente(Usuario proponente) {
        this.proponente = proponente;
    }

    public Usuario getContraparte() {
        return contraparte;
    }

    public void setContraparte(Usuario contraparte) {
        this.contraparte = contraparte;
    }

    public LocalDateTime getFechaOferta() {
        return fechaOferta;
    }

    public void setFechaOferta(LocalDateTime fechaOferta) {
        this.fechaOferta = fechaOferta;
    }

    public BigDecimal getPrecioOfertado() {
        return precioOfertado;
    }

    public void setPrecioOfertado(BigDecimal precioOfertado) {
        this.precioOfertado = precioOfertado;
    }

    public String getEstadoOferta() {
        return estadoOferta;
    }

    public void setEstadoOferta(String estadoOferta) {
        this.estadoOferta = estadoOferta;
    }

    public Animales getAnimal() {
        return animal;
    }

    public void setAnimal(Animales animal) {
        this.animal = animal;
    }
}
