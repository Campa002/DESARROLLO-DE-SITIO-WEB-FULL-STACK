# Portfolio Web Full Stack

**Proyecto de Desarrollo Web Dinámico**  
Materia: Proyecto, Diseño e Implementación de Sitios Web Dinámicos  
Fecha: Marzo 2026

---

## Descripción del Proyecto

Portfolio personal desarrollado con tecnologías frontend y backend modernas. El sitio integra HTML5, CSS3, Bootstrap 5, JavaScript, PHP y MySQL para crear una experiencia web completa, dinámica y responsiva.

### Características Principales

- Diseño responsivo (móvil, tablet, escritorio)
- Interfaz moderna con tema oscuro personalizado
- Galería interactiva de proyectos con modal/lightbox
- Sección de videos embebidos
- Calculadora de IMC (Índice de Masa Corporal)
- Formulario de contacto dinámico con validación en tiempo real
- Base de datos MySQL para almacenar mensajes
- Seguridad implementada (sanitización, prepared statements)

---

## Tecnologías Utilizadas

### Frontend
- **HTML5**: Estructura semántica
- **CSS3**: Estilos personalizados
- **Bootstrap 5.3**: Framework CSS responsivo
- **JavaScript (ES6+)**: Interactividad del lado del cliente

### Backend
- **PHP 7.4+**: Lógica del servidor
- **MySQL 8.0+**: Base de datos relacional

### Herramientas de Desarrollo
- **Git**: Control de versiones
- **GitHub**: Repositorio remoto
- **VS Code**: Editor de código
- **Live Share**: Colaboración en tiempo real

---

## Estructura del Proyecto

```
mi-portfolio-web/
│
├── index.html              # Página principal
├── README.md               # Documentación
│
├── css/
│   └── styles.css          # Estilos personalizados
│
├── js/
│   ├── calculadora.js      # Lógica de la calculadora IMC
│   ├── galeria.js          # Funcionalidad de la galería
│   └── formulario.js       # Validación y envío del formulario
│
├── php/
│   ├── config.php          # Configuración de base de datos
│   └── procesar_contacto.php  # Procesamiento del formulario
│
├── sql/
│   └── database.sql        # Script de creación de BD
│
├── img/
│   └── proyectos/          # Imágenes de la galería
│
└── videos/                 # Videos del sitio
```

---

## Instalación y Configuración

### Requisitos Previos

- Servidor web (Apache)
- PHP 7.4 o superior
- MySQL 8.0 o superior
- Navegador web moderno

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/mi-portfolio-web.git
   cd mi-portfolio-web
   ```

2. **Configurar la base de datos**
   ```bash
   # Acceder a MySQL
   mysql -u root -p
   
   # Ejecutar el script SQL
   source sql/database.sql
   ```

3. **Configurar conexión a base de datos**
   
   Editar el archivo `php/config.php` con tus credenciales:
   ```php
   define('DB_HOST', 'localhost');
   define('DB_USER', 'tu_usuario');
   define('DB_PASS', 'tu_contraseña');
   define('DB_NAME', 'portfolio_db');
   ```

4. **Agregar imágenes**
   
   Colocar tus imágenes en `img/proyectos/` con los nombres:
   - proyecto1.jpg hasta proyecto6.jpg
   - Tamaño recomendado: 800x600px

5. **Iniciar servidor local**
   
   Con PHP integrado:
   ```bash
   php -S localhost:8000
   ```
   
   O con XAMPP/WAMP: colocar en `htdocs/` o `www/`

6. **Abrir en el navegador**
   ```
   http://localhost:8000
   ```

---

## Base de Datos

### Diagrama de la Tabla `mensajes`

```
┌─────────────────────────────────┐
│          MENSAJES               │
├─────────────────────────────────┤
│ PK  id (INT, AUTO_INCREMENT)    │
│     nombre (VARCHAR 100)        │
│     email (VARCHAR 150)         │
│     asunto (VARCHAR 200)        │
│     mensaje (TEXT)              │
│     fecha_envio (TIMESTAMP)     │
└─────────────────────────────────┘
```

### Script de Creación

El script completo se encuentra en `sql/database.sql` e incluye:
- Creación de base de datos `portfolio_db`
- Tabla `mensajes` con índices optimizados
- Charset UTF-8 para soporte internacional
- Motor InnoDB para transacciones

---

## Funcionalidades Implementadas

### 1. Galería Dinámica

- Visualización de 6+ imágenes en grid responsivo
- Modal/lightbox al hacer clic en las imágenes
- Animación de entrada con Intersection Observer
- Efecto hover con overlay
- Precarga de imágenes para mejor rendimiento

**Código clave (galeria.js):**
```javascript
galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        const imgSrc = this.getAttribute('data-img');
        const title = this.getAttribute('data-title');
        modalImage.src = imgSrc;
        modalTitle.textContent = title;
    });
});
```

### 2. Calculadora de IMC

- Cálculo del Índice de Masa Corporal
- Validación de datos en tiempo real
- Categorización automática (Bajo peso, Normal, Sobrepeso, Obesidad)
- Interfaz clara con feedback visual
- **NO usa `eval()`** por seguridad

**Fórmula:** IMC = peso (kg) / (altura (m))²

**Categorías según OMS:**
| IMC | Categoría |
|-----|-----------|
| < 18.5 | Bajo peso |
| 18.5 - 24.9 | Normal |
| 25.0 - 29.9 | Sobrepeso |
| ≥ 30.0 | Obesidad |

### 3. Formulario de Contacto Interactivo

**Frontend (JavaScript):**
- Validación en tiempo real mientras el usuario escribe
- Feedback visual inmediato (campos válidos/inválidos)
- Envío mediante AJAX (fetch) sin recargar la página
- Mensajes de éxito/error dinámicos

**Backend (PHP + MySQL):**
- Sanitización de datos con `htmlspecialchars()`
- Validación del lado del servidor
- Consultas preparadas (prepared statements) para prevenir SQL injection
- Respuestas en formato JSON

**Flujo de datos:**
```
Usuario → JavaScript valida → fetch() envía → PHP sanitiza → 
MySQL guarda → PHP responde JSON → JavaScript muestra mensaje
```

---

## Seguridad Implementada

1. **Sanitización de Inputs**
   ```php
   function sanitizarInput($data) {
       $data = trim($data);
       $data = stripslashes($data);
       $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
       return $data;
   }
   ```

2. **Prepared Statements**
   ```php
   $sql = "INSERT INTO mensajes (nombre, email, asunto, mensaje) VALUES (?, ?, ?, ?)";
   $stmt = $conexion->prepare($sql);
   $stmt->bind_param("ssss", $nombre, $email, $asunto, $mensaje);
   ```

3. **Validación Doble**
   - Frontend: JavaScript (experiencia de usuario)
   - Backend: PHP (seguridad real)

---

## Diseño y UI/UX

### Paleta de Colores

```css
:root {
    --color-primary: #007bff;    /* Azul principal */
    --color-accent: #00d4ff;     /* Azul claro acento */
    --color-dark: #0a0e27;       /* Fondo oscuro principal */
    --color-text: #e8e9ed;       /* Texto principal */
}
```

### Características de Diseño

- Tema oscuro con contrastes adecuados
- Tipografía moderna (Segoe UI)
- Animaciones suaves con CSS transitions
- Scrollbar personalizado
- Hover effects en elementos interactivos
- Grid responsivo con Bootstrap

---

## Responsividad

El sitio se adapta a diferentes tamaños de pantalla:

- **Móvil** (< 768px): Navegación hamburguesa, layout 1 columna
- **Tablet** (768px - 991px): Layout 2 columnas
- **Desktop** (> 992px): Layout completo 3 columnas

```css
@media (max-width: 768px) {
    .hero-section h1 {
        font-size: 2.5rem;
    }
    .gallery-item img {
        height: 200px;
    }
}
```

---

## Problemas Resueltos

### 1. CORS al enviar formulario
**Problema:** El navegador bloqueaba peticiones AJAX  
**Solución:** Configurar headers correctos y ejecutar desde servidor local

### 2. Prepared Statements
**Problema:** Errores de binding de parámetros  
**Solución:** Verificar número de placeholders y tipos de datos

### 3. Videos de YouTube
**Problema:** Videos no se reproducían  
**Solución:** Usar URLs de embed o videos MP4 locales

---

## Mejoras Futuras

**Corto plazo:**
- Sistema de login y registro de usuarios
- Panel administrativo para gestionar mensajes
- Envío automático de emails de confirmación
- Paginación para mostrar más proyectos

**Mediano plazo:**
- Sistema de comentarios en proyectos
- Blog o sección de noticias
- Alternancia entre modo claro y oscuro

**Largo plazo:**
- Aplicación web progresiva (PWA)
- Soporte multiidioma (español/inglés)
- Optimización para motores de búsqueda
- Migración a React o Vue.js


---

## Autor

Luciano Campanelli
Estudiante 
Tecnica 1 de Vte. Lopez

### Contacto

- Email: luchocampanelli1@gmail.com
- GitHub: github.com/Campa002
- LinkedIn: linkedin.com/in/luciano-campanelli-9b5975316/

---

