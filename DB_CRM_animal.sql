DROP DATABASE IF EXISTS crm_animal;
CREATE DATABASE IF NOT EXISTS crm_animal;
USE crm_animal;

CREATE TABLE Usuario (
    id_usuario INT PRIMARY KEY UUID,
	username VARCHAR(50),
	email VARCHAR(100) UNIQUE,
    contrasena VARCHAR(255),
	rol ENUM('Administrador', 'Operario', 'Supervisor', 'Cliente'),
    nombre VARCHAR(50),
    apellido VARCHAR(50),
	telefono VARCHAR(255),
	direccion VARCHAR(255),
	localidad VARCHAR(100),
	fecha_nacimiento DATE,
    dni VARCHAR(20) UNIQUE
);

CREATE TABLE Actividades(
	id_actividad INT PRIMARY KEY UUID,
	accion VARCHAR(255),
	fecha DATE,
	id_usuario INT,
	FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

CREATE TABLE Inventario (
    id_insumo INT PRIMARY KEY UUID,
    nombre VARCHAR(100),
    tipo ENUM('Medicamento', 'Alimento', 'Otro'),
    cantidad_total DECIMAL(10,2),
    unidad_medida VARCHAR(20),
    fecha_vencimiento DATE,
	fecha_carga DATE
);

CREATE TABLE Animal (
    id_animal INT PRIMARY KEY UUID,
    especie VARCHAR(50),
    raza VARCHAR(50),
    edad INT,
    peso DECIMAL(10,2)
);

CREATE TABLE Salud (
    id_salud INT PRIMARY KEY AUTO_INCREMENT,
    id_animal INT,
    id_insumo INT,
	tipo_control VARCHAR(255),
    evento VARCHAR(100),
    fecha DATE,
    FOREIGN KEY (id_animal) REFERENCES Animal(id_animal),
    FOREIGN KEY (id_insumo) REFERENCES Inventario(id_insumo)
);

CREATE TABLE Alimentacion (
    id_alimentacion INT PRIMARY KEY UUID,
    id_animal INT,
    id_insumo INT,
	tipo_alimento VARCHAR(255),
    cantidad_kg DECIMAL(10,2),
    fecha DATETIME,
    FOREIGN KEY (id_animal) REFERENCES Animal(id_animal),
    FOREIGN KEY (id_insumo) REFERENCES Inventario(id_insumo)
);

CREATE TABLE Agrupacion (
    id_agrupacion INT PRIMARY KEY UUID,
    id_animal INT,
    caravana VARCHAR(50) UNIQUE,
    lote VARCHAR(50),
    FOREIGN KEY (id_animal) REFERENCES Animal(id_animal)
);

CREATE TABLE Distribucion (
    id_distribucion INT PRIMARY KEY UUID,
    id_agrupacion INT,
    id_tercero INT,
    fecha_carga DATETIME,
    fecha_caducidad DATETIME,
    estado ENUM('Pendiente', 'En Viaje', 'Recibido', 'Expirado') DEFAULT 'Pendiente',
	destino VARCHAR(255),
	titular_destino VARCHAR(255),
	origen VARCHAR(255),
	titular_origen(255),
    FOREIGN KEY (id_agrupacion) REFERENCES Agrupacion(id_agrupacion),
    FOREIGN KEY (id_tercero) REFERENCES Tercero(id_tercero)
);

CREATE TABLE Tercero (
    id_tercero INT PRIMARY KEY UUID,
    nombre VARCHAR(150),
	razon_social VARCHAR(255),
    cuit VARCHAR(20) UNIQUE,
    tipo ENUM('Consignatario', 'Usuario Faena')
);

CREATE TABLE Certificacion(
	id_certificacion INT PRIMARY KEY UUID,
	id_distribucion INT,
	nro_tri VARCHAR(50),
	entidad_emisora VARCHAR(255),
	tipo VARCHAR(255),
	fecha_emision DATETIME,
	fecha_vencimiento DATE,
	nro_certificado VARCHAR(255),
	FOREIGN KEY (id_distribucion) REFERENCES Distribucion(id_distribucion)
);

-- =============================================
-- TRANSACCIONES INTEGRADAS CON LOGS DE ACTIVIDAD
-- =============================================

-- 1. TRANSACCIÓN: REGISTRO DE ALIMENTACIÓN + DESCUENTO DE STOCK + LOG
-- Se dispara cuando un operario alimenta a un animal.
DELIMITER //
CREATE PROCEDURE transaccion_alimentar_animal(
    IN p_id_usuario INT,
    IN p_id_animal INT,
    IN p_id_insumo INT,
    IN p_cantidad DECIMAL(10,2),
    IN p_tipo VARCHAR(255)
)
BEGIN
    -- Si algo falla, deshacemos todo
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;

    START TRANSACTION;
        -- A. Insertamos el registro de alimentación
        INSERT INTO Alimentacion (id_animal, id_insumo, tipo_alimento, cantidad_kg, fecha) 
        VALUES (p_id_animal, p_id_insumo, p_tipo, p_cantidad, NOW());

        -- B. Restamos la cantidad del inventario
        UPDATE Inventario 
        SET cantidad_total = cantidad_total - p_cantidad 
        WHERE id_insumo = p_id_insumo;

        -- C. Registramos la actividad en el Log
        INSERT INTO Actividades (accion, fecha, id_usuario) 
        VALUES (CONCAT('Alimentación: ', p_cantidad, 'kg de ', p_tipo, ' al animal ', p_id_animal), CURDATE(), p_id_usuario);
    COMMIT;
END //
DELIMITER ;


-- 2. TRANSACCIÓN: SALUD / CONTROL SANITARIO + STOCK + LOG
-- Se usa al aplicar vacunas o medicamentos.
DELIMITER //
CREATE PROCEDURE transaccion_control_salud(
    IN p_id_usuario INT,
    IN p_id_animal INT,
    IN p_id_insumo INT,
    IN p_tipo_control VARCHAR(255),
    IN p_evento VARCHAR(100)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;

    START TRANSACTION;
        -- A. Registramos el evento sanitario
        INSERT INTO Salud (id_animal, id_insumo, tipo_control, evento, fecha)
        VALUES (p_id_animal, p_id_insumo, p_tipo_control, p_evento, CURDATE());

        -- B. Descontamos 1 unidad del stock (si es medicamento)
        UPDATE Inventario 
        SET cantidad_total = cantidad_total - 1 
        WHERE id_insumo = p_id_insumo;

        -- C. Log de actividad
        INSERT INTO Actividades (accion, fecha, id_usuario) 
        VALUES (CONCAT('Salud: ', p_evento, ' aplicada al animal ', p_id_animal), CURDATE(), p_id_usuario);
    COMMIT;
END //
DELIMITER ;


-- 3. TRANSACCIÓN: DESPACHO LOGÍSTICO COMPLETO (DISTRIBUCIÓN + CERTIFICADO)
-- Esta es la más compleja: crea el viaje y el certificado legal al mismo tiempo.
DELIMITER //
CREATE PROCEDURE transaccion_despachar_transporte(
    IN p_id_usuario INT,
    IN p_id_agrupacion INT,
    IN p_id_tercero INT,
    IN p_nro_tri VARCHAR(50),
    IN p_nro_cert VARCHAR(255),
    IN p_destino VARCHAR(255),
    IN p_origen VARCHAR(255)
)
BEGIN
    DECLARE v_id_dist INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;

    START TRANSACTION;
        -- A. Creamos la distribución
        INSERT INTO Distribucion (id_agrupacion, id_tercero, fecha_carga, fecha_caducidad, estado, destino, origen)
        VALUES (p_id_agrupacion, p_id_tercero, NOW(), DATE_ADD(NOW(), INTERVAL 72 HOUR), 'En Viaje', p_destino, p_origen);
        
        -- Obtenemos el ID de la distribución recién creada
        SET v_id_dist = LAST_INSERT_ID();

        -- B. Creamos la certificación asociada
        INSERT INTO Certificacion (id_distribucion, nro_tri, entidad_emisora, tipo, fecha_emision, nro_certificado)
        VALUES (v_id_dist, p_nro_tri, 'SENASA', 'Guía de Tránsito', NOW(), p_nro_cert);

        -- C. Log de actividad
        INSERT INTO Actividades (accion, fecha, id_usuario) 
        VALUES (CONCAT('Logística: Despachada distribución ID ', v_id_dist, ' con TRI ', p_nro_tri), CURDATE(), p_id_usuario);
    COMMIT;
END //
DELIMITER ;