package com.agroflow.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "documentos_transportes")
public class DocumentosTransportes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "distribucion_id", nullable = false)
    private Distribucion distribucion;

    @Column(name = "img_archivo", length = 255)
    private String imgArchivo;

    @Column(name = "verificado_legalmente")
    private Boolean verificadoLegalmente = false;

    @Column(name = "numero_guia_transito", length = 50)
    private String numeroGuiaTransito;

    @Column(name = "fecha_emision")
    private LocalDate fechaEmision;

    public DocumentosTransportes() {
    }

    public DocumentosTransportes(Distribucion distribucion, String imgArchivo, Boolean verificadoLegalmente, String numeroGuiaTransito, LocalDate fechaEmision) {
        this.distribucion = distribucion;
        this.imgArchivo = imgArchivo;
        this.verificadoLegalmente = verificadoLegalmente;
        this.numeroGuiaTransito = numeroGuiaTransito;
        this.fechaEmision = fechaEmision;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Distribucion getDistribucion() {
        return distribucion;
    }

    public void setDistribucion(Distribucion distribucion) {
        this.distribucion = distribucion;
    }

    public String getImgArchivo() {
        return imgArchivo;
    }

    public void setImgArchivo(String imgArchivo) {
        this.imgArchivo = imgArchivo;
    }

    public Boolean getVerificadoLegalmente() {
        return verificadoLegalmente;
    }

    public void setVerificadoLegalmente(Boolean verificadoLegalmente) {
        this.verificadoLegalmente = verificadoLegalmente;
    }

    public String getNumeroGuiaTransito() {
        return numeroGuiaTransito;
    }

    public void setNumeroGuiaTransito(String numeroGuiaTransito) {
        this.numeroGuiaTransito = numeroGuiaTransito;
    }

    public LocalDate getFechaEmision() {
        return fechaEmision;
    }

    public void setFechaEmision(LocalDate fechaEmision) {
        this.fechaEmision = fechaEmision;
    }
}
