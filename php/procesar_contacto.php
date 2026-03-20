<?php
/**
 * Procesador del Formulario de Contacto
 * Portfolio Web Full Stack
 * 
 * Este script recibe los datos del formulario mediante AJAX (fetch)
 * Valida, sanitiza y almacena los datos en la base de datos MySQL
 * Devuelve respuestas en formato JSON
 */

// Incluir archivo de configuración
require_once 'config.php';

// Configurar cabeceras para JSON
header('Content-Type: application/json; charset=utf-8');

// Solo permitir método POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        'estado' => 'error',
        'mensaje' => 'Método no permitido. Use POST.'
    ]);
    exit;
}

// Obtener datos JSON del body
$json_data = file_get_contents('php://input');
$datos = json_decode($json_data, true);

// Verificar que se recibieron datos
if (!$datos) {
    echo json_encode([
        'estado' => 'error',
        'mensaje' => 'No se recibieron datos válidos.'
    ]);
    exit;
}

// Sanitizar datos de entrada
$nombre = isset($datos['nombre']) ? sanitizarInput($datos['nombre']) : '';
$email = isset($datos['email']) ? sanitizarInput($datos['email']) : '';
$asunto = isset($datos['asunto']) ? sanitizarInput($datos['asunto']) : '';
$mensaje = isset($datos['mensaje']) ? sanitizarInput($datos['mensaje']) : '';

// Array para almacenar errores de validación
$errores = [];

// Validar nombre
if (empty($nombre)) {
    $errores[] = 'El nombre es obligatorio.';
} elseif (strlen($nombre) < 3) {
    $errores[] = 'El nombre debe tener al menos 3 caracteres.';
} elseif (strlen($nombre) > 100) {
    $errores[] = 'El nombre no puede exceder 100 caracteres.';
}

// Validar email
if (empty($email)) {
    $errores[] = 'El email es obligatorio.';
} elseif (!validarEmail($email)) {
    $errores[] = 'El formato del email no es válido.';
} elseif (strlen($email) > 150) {
    $errores[] = 'El email no puede exceder 150 caracteres.';
}

// Validar asunto
if (empty($asunto)) {
    $errores[] = 'El asunto es obligatorio.';
} elseif (strlen($asunto) < 5) {
    $errores[] = 'El asunto debe tener al menos 5 caracteres.';
} elseif (strlen($asunto) > 200) {
    $errores[] = 'El asunto no puede exceder 200 caracteres.';
}

// Validar mensaje
if (empty($mensaje)) {
    $errores[] = 'El mensaje es obligatorio.';
} elseif (strlen($mensaje) < 10) {
    $errores[] = 'El mensaje debe tener al menos 10 caracteres.';
} elseif (strlen($mensaje) > 5000) {
    $errores[] = 'El mensaje no puede exceder 5000 caracteres.';
}

// Si hay errores, devolverlos
if (!empty($errores)) {
    echo json_encode([
        'estado' => 'error',
        'mensaje' => 'Errores de validación',
        'errores' => $errores
    ]);
    exit;
}

// Conectar a la base de datos
$conexion = conectarDB();

if (!$conexion) {
    echo json_encode([
        'estado' => 'error',
        'mensaje' => 'Error al conectar con la base de datos. Intente nuevamente.'
    ]);
    exit;
}

// Preparar la consulta SQL (Prevención de inyección SQL)
$sql = "INSERT INTO mensajes (nombre, email, asunto, mensaje) VALUES (?, ?, ?, ?)";

$stmt = $conexion->prepare($sql);

if (!$stmt) {
    error_log("Error al preparar consulta: " . $conexion->error);
    echo json_encode([
        'estado' => 'error',
        'mensaje' => 'Error al procesar la solicitud. Intente nuevamente.'
    ]);
    $conexion->close();
    exit;
}

// Vincular parámetros (s = string)
$stmt->bind_param("ssss", $nombre, $email, $asunto, $mensaje);

// Ejecutar la consulta
if ($stmt->execute()) {
    // Éxito
    echo json_encode([
        'estado' => 'exito',
        'mensaje' => '¡Mensaje enviado correctamente! Te contactaré pronto.',
        'id' => $stmt->insert_id
    ]);
    
    // Log de éxito (opcional)
    error_log("Nuevo mensaje guardado - ID: " . $stmt->insert_id . " - Email: " . $email);
} else {
    // Error al insertar
    error_log("Error al insertar mensaje: " . $stmt->error);
    echo json_encode([
        'estado' => 'error',
        'mensaje' => 'Error al guardar el mensaje. Por favor, intente nuevamente.'
    ]);
}

// Cerrar statement y conexión
$stmt->close();
$conexion->close();
?>
