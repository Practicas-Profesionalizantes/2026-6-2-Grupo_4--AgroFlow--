package com.agroflow.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "distribucion")
public class Distribucion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "supervisor_id")
    private Usuario supervisor;

    @Column(name = "conductor_nombre", length = 100)
    private String conductorNombre;

    @Column(name = "conductor_documento", length = 20)
    private String conductorDocumento;

    @Column(name = "patente_camion", length = 15)
    private String patenteCamion;

    @Column(name = "patente_acoplado", length = 15)
    private String patenteAcoplado;

    @Column(name = "ruta_asignada", length = 255)
    private String rutaAsignada;

    @Column(name = "coordenadas_gps", length = 100)
    private String coordenadasGps;

    @Column(name = "estado_envio", length = 50)
    private String estadoEnvio;

    @Column(name = "fecha_arribo")
    private LocalDateTime fechaArribo;

    public Distribucion() {
    }

    public Distribucion(Usuario supervisor, String conductorNombre, String conductorDocumento, String patenteCamion, String patenteAcoplado, String rutaAsignada, String coordenadasGps, String estadoEnvio, LocalDateTime fechaArribo) {
        this.supervisor = supervisor;
        this.conductorNombre = conductorNombre;
        this.conductorDocumento = conductorDocumento;
        this.patenteCamion = patenteCamion;
        this.patenteAcoplado = patenteAcoplado;
        this.rutaAsignada = rutaAsignada;
        this.coordenadasGps = coordenadasGps;
        this.estadoEnvio = estadoEnvio;
        this.fechaArribo = fechaArribo;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Usuario getSupervisor() {
        return supervisor;
    }

    public void setSupervisor(Usuario supervisor) {
        this.supervisor = supervisor;
    }

    public String getConductorNombre() {
        return conductorNombre;
    }

    public void setConductorNombre(String conductorNombre) {
        this.conductorNombre = conductorNombre;
    }

    public String getConductorDocumento() {
        return conductorDocumento;
    }

    public void setConductorDocumento(String conductorDocumento) {
        this.conductorDocumento = conductorDocumento;
    }

    public String getPatenteCamion() {
        return patenteCamion;
    }

    public void setPatenteCamion(String patenteCamion) {
        this.patenteCamion = patenteCamion;
    }

    public String getPatenteAcoplado() {
        return patenteAcoplado;
    }

    public void setPatenteAcoplado(String patenteAcoplado) {
        this.patenteAcoplado = patenteAcoplado;
    }

    public String getRutaAsignada() {
        return rutaAsignada;
    }

    public void setRutaAsignada(String rutaAsignada) {
        this.rutaAsignada = rutaAsignada;
    }

    public String getCoordenadasGps() {
        return coordenadasGps;
    }

    public void setCoordenadasGps(String coordenadasGps) {
        this.coordenadasGps = coordenadasGps;
    }

    public String getEstadoEnvio() {
        return estadoEnvio;
    }

    public void setEstadoEnvio(String estadoEnvio) {
        this.estadoEnvio = estadoEnvio;
    }

    public LocalDateTime getFechaArribo() {
        return fechaArribo;
    }

    public void setFechaArribo(LocalDateTime fechaArribo) {
        this.fechaArribo = fechaArribo;
    }
}
