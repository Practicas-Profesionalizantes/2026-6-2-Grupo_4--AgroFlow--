package com.agroflow.backend.dto;

import java.time.LocalDateTime;

public class ErrorResponse {
    private LocalDateTime fecha;
    private String mensaje;
    private int estado;

    public ErrorResponse(String mensaje, int estado) {
        this.fecha = LocalDateTime.now();
        this.mensaje = mensaje;
        this.estado = estado;
    }

    public LocalDateTime getFecha() { return fecha; }
    public String getMensaje() { return mensaje; }
    public int getEstado() { return estado; }
}
