package com.agroflow.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "certificado")
public class Certificado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "animal_id", nullable = false)
    private Animales animal;

    @ManyToOne
    @JoinColumn(name = "supervisor_id")
    private Usuario supervisor;

    @Column(name = "img_documento", length = 255)
    private String imgDocumento;

    @Column(name = "fecha_emision")
    private LocalDate fechaEmision;

    @Column(name = "fecha_vencimiento")
    private LocalDate fechaVencimiento;

    @Column(name = "estado_aprobacion", length = 50)
    private String estadoAprobacion;

    @Column(name = "tipo_certificado", length = 100)
    private String tipoCertificado;

    @Column(name = "numero_entidad_reguladora", length = 50)
    private String numeroEntidadReguladora;

    public Certificado() {
    }

    public Certificado(Animales animal, Usuario supervisor, String imgDocumento, LocalDate fechaEmision, LocalDate fechaVencimiento, String estadoAprobacion, String tipoCertificado, String numeroEntidadReguladora) {
        this.animal = animal;
        this.supervisor = supervisor;
        this.imgDocumento = imgDocumento;
        this.fechaEmision = fechaEmision;
        this.fechaVencimiento = fechaVencimiento;
        this.estadoAprobacion = estadoAprobacion;
        this.tipoCertificado = tipoCertificado;
        this.numeroEntidadReguladora = numeroEntidadReguladora;
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

    public Usuario getSupervisor() {
        return supervisor;
    }

    public void setSupervisor(Usuario supervisor) {
        this.supervisor = supervisor;
    }

    public String getImgDocumento() {
        return imgDocumento;
    }

    public void setImgDocumento(String imgDocumento) {
        this.imgDocumento = imgDocumento;
    }

    public LocalDate getFechaEmision() {
        return fechaEmision;
    }

    public void setFechaEmision(LocalDate fechaEmision) {
        this.fechaEmision = fechaEmision;
    }

    public LocalDate getFechaVencimiento() {
        return fechaVencimiento;
    }

    public void setFechaVencimiento(LocalDate fechaVencimiento) {
        this.fechaVencimiento = fechaVencimiento;
    }

    public String getEstadoAprobacion() {
        return estadoAprobacion;
    }

    public void setEstadoAprobacion(String estadoAprobacion) {
        this.estadoAprobacion = estadoAprobacion;
    }

    public String getTipoCertificado() {
        return tipoCertificado;
    }

    public void setTipoCertificado(String tipoCertificado) {
        this.tipoCertificado = tipoCertificado;
    }

    public String getNumeroEntidadReguladora() {
        return numeroEntidadReguladora;
    }

    public void setNumeroEntidadReguladora(String numeroEntidadReguladora) {
        this.numeroEntidadReguladora = numeroEntidadReguladora;
    }
}
    