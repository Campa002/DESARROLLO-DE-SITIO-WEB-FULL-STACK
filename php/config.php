<?php
/**
 * Archivo de Configuración de Base de Datos
 * Portfolio Web Full Stack
 * 
 * Este archivo contiene la configuración para conectarse a MySQL
 * Utiliza MySQLi con manejo de errores
 */

// Configuración de la base de datos
define('DB_HOST', 'localhost');
define('DB_USER', 'root');          // Cambiar según tu configuración
define('DB_PASS', '');              // Cambiar según tu configuración
define('DB_NAME', 'portfolio_db');

// Establecer la zona horaria
date_default_timezone_set('America/Argentina/Buenos_Aires');

/**
 * Función para conectar a la base de datos
 * @return mysqli Objeto de conexión o false en caso de error
 */
function conectarDB() {
    // Crear conexión
    $conexion = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    
    // Verificar conexión
    if ($conexion->connect_error) {
        error_log("Error de conexión a la base de datos: " . $conexion->connect_error);
        return false;
    }
    
    // Establecer charset UTF-8
    $conexion->set_charset("utf8mb4");
    
    return $conexion;
}

/**
 * Función para sanitizar datos de entrada
 * @param string $data Datos a sanitizar
 * @return string Datos sanitizados
 */
function sanitizarInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

/**
 * Función para validar email
 * @param string $email Email a validar
 * @return bool True si es válido, false si no
 */
function validarEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}
?>
