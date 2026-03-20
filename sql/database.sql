-- =====================================================
-- Base de Datos: Portfolio Web Full Stack
-- Autor: Proyecto Full Stack
-- Fecha: 18/03/2026
-- =====================================================

-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE portfolio_db;

-- =====================================================
-- Tabla: mensajes
-- Descripción: Almacena los mensajes del formulario de contacto
-- =====================================================
CREATE TABLE IF NOT EXISTS mensajes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    asunto VARCHAR(200) NOT NULL,
    mensaje TEXT NOT NULL,
    fecha_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_fecha (fecha_envio),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Datos de ejemplo (opcional - para pruebas)
-- =====================================================
INSERT INTO mensajes (nombre, email, asunto, mensaje) VALUES
('Juan Pérez', 'juan@example.com', 'Consulta sobre proyecto', 'Me interesa conocer más sobre tus proyectos de desarrollo web.'),
('María González', 'maria@example.com', 'Colaboración', '¿Estarías disponible para un proyecto freelance?');

-- =====================================================
-- Verificación de la estructura
-- =====================================================
DESCRIBE mensajes;

-- =====================================================
-- Consulta para ver todos los mensajes
-- =====================================================
-- SELECT * FROM mensajes ORDER BY fecha_envio DESC;
