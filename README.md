# Portfolio Web Full Stack

**Proyecto de Desarrollo Web Dinámico**  
*Materia: Proyecto, Diseño e Implementación de Sitios Web Dinámicos*  
*Fecha: Marzo 2026*

---

## 📋 Descripción del Proyecto

Portfolio personal y multitemático desarrollado con tecnologías frontend y backend modernas. El sitio integra HTML5, CSS3 (Bootstrap 5), JavaScript, PHP y MySQL para crear una experiencia web completa, dinámica y responsiva.

### Características Principales

- ✨ Diseño responsivo (móvil, tablet, escritorio)
- 🎨 Interfaz moderna con tema oscuro
- 🖼️ Galería interactiva de proyectos con modal/lightbox
- 📹 Sección de videos embebidos
- 🧮 Calculadora de IMC (Índice de Masa Corporal)
- 📧 Formulario de contacto dinámico con validación en tiempo real
- 🗄️ Base de datos MySQL para almacenar mensajes
- 🔒 Seguridad implementada (sanitización, prepared statements)

---

## 🛠️ Tecnologías Utilizadas

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

## 📁 Estructura del Proyecto

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
└── img/
    └── proyectos/          # Imágenes de la galería
        ├── proyecto1.jpg
        ├── proyecto2.jpg
        ├── proyecto3.jpg
        ├── proyecto4.jpg
        ├── proyecto5.jpg
        └── proyecto6.jpg
```

---

## 🚀 Instalación y Configuración

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
   
   Colocar tus imágenes en la carpeta `img/proyectos/` con los nombres:
   - proyecto1.jpg hasta proyecto6.jpg
   - Tamaño recomendado: 800x600px

5. **Iniciar servidor local**
   
   Opción A - Con PHP integrado:
   ```bash
   php -S localhost:8000
   ```
   
   Opción B - Con XAMPP/WAMP:
   - Colocar el proyecto en `htdocs/` o `www/`
   - Acceder a `http://localhost/mi-portfolio-web/`

6. **Abrir en el navegador**
   ```
   http://localhost:8000
   ```

---

## 📊 Base de Datos

### Diagrama de la Tabla `mensajes`

```
+---------------+---------------+------+-----+-------------------+
| Campo         | Tipo          | Null | Key | Default           |
+---------------+---------------+------+-----+-------------------+
| id            | INT           | NO   | PRI | AUTO_INCREMENT    |
| nombre        | VARCHAR(100)  | NO   |     | NULL              |
| email         | VARCHAR(150)  | NO   |     | NULL              |
| asunto        | VARCHAR(200)  | NO   |     | NULL              |
| mensaje       | TEXT          | NO   |     | NULL              |
| fecha_envio   | TIMESTAMP     | NO   |     | CURRENT_TIMESTAMP |
+---------------+---------------+------+-----+-------------------+
```

### Script de Creación

El script completo se encuentra en `sql/database.sql`

---

## 💡 Funcionalidades Implementadas

### 1. Galería Dinámica (galeria.js)

- Visualización de 6+ imágenes en grid responsivo
- Modal/lightbox al hacer clic en las imágenes
- Animación de entrada con Intersection Observer
- Efecto hover con overlay
- Precarga de imágenes para mejor rendimiento

### 2. Calculadora de IMC (calculadora.js)

- Cálculo del Índice de Masa Corporal
- Validación de datos en tiempo real
- Categorización automática (Bajo peso, Normal, Sobrepeso, Obesidad)
- Interfaz clara con feedback visual
- **NO usa `eval()`** por seguridad

### 3. Formulario de Contacto (formulario.js + procesar_contacto.php)

**Frontend:**
- Validación en tiempo real (mientras el usuario escribe)
- Feedback visual inmediato (campos válidos/inválidos)
- Envío mediante AJAX (fetch) sin recargar la página
- Mensajes de éxito/error dinámicos

**Backend:**
- Sanitización de datos con `htmlspecialchars()`
- Validación del lado del servidor
- Consultas preparadas (prepared statements) para prevenir SQL injection
- Respuestas en formato JSON
- Logging de errores

---

## 🔒 Seguridad Implementada

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

4. **Headers de Seguridad**
   ```php
   header('Content-Type: application/json; charset=utf-8');
   ```

---

## 🎨 Diseño y UI/UX

### Paleta de Colores

```css
:root {
    --color-primary: #007bff;    /* Azul principal */
    --color-accent: #00d4ff;     /* Azul claro acento */
    --color-dark: #0a0e27;       /* Fondo oscuro principal */
    --color-dark-alt: #1a1f3a;   /* Fondo oscuro alternativo */
    --color-card: #151930;       /* Tarjetas */
    --color-text: #e8e9ed;       /* Texto principal */
}
```

### Características de Diseño

- **Tema oscuro** con contrastes adecuados
- **Tipografía moderna** (Segoe UI)
- **Animaciones suaves** con CSS transitions
- **Scrollbar personalizado**
- **Hover effects** en todos los elementos interactivos
- **Grid responsivo** con Bootstrap

---

## 📱 Responsividad

El sitio se adapta a diferentes tamaños de pantalla:

- **Móvil** (< 768px): Navegación tipo hamburguesa, layout de 1 columna
- **Tablet** (768px - 991px): Layout de 2 columnas
- **Desktop** (> 992px): Layout completo de 3 columnas

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

## 🧪 Pruebas Realizadas

### Validaciones del Formulario

- ✅ Nombre: mínimo 3 caracteres, máximo 100
- ✅ Email: formato válido, máximo 150 caracteres
- ✅ Asunto: mínimo 5 caracteres, máximo 200
- ✅ Mensaje: mínimo 10 caracteres, máximo 5000

### Calculadora IMC

- ✅ Peso: 1-500 kg
- ✅ Altura: 50-300 cm
- ✅ Cálculo preciso con 1 decimal
- ✅ Categorización correcta según estándares OMS

### Navegadores Probados

- ✅ Google Chrome 120+
- ✅ Mozilla Firefox 121+
- ✅ Microsoft Edge 120+
- ✅ Safari 17+ (macOS/iOS)

---

## 🐛 Problemas Encontrados y Soluciones

### Problema 1: Conexión a Base de Datos

**Error:** `Access denied for user 'root'@'localhost'`

**Solución:** Verificar credenciales en `config.php` y permisos en MySQL
```sql
GRANT ALL PRIVILEGES ON portfolio_db.* TO 'usuario'@'localhost';
FLUSH PRIVILEGES;
```

### Problema 2: CORS al enviar formulario

**Error:** Blocked by CORS policy

**Solución:** Configurar headers correctos en PHP
```php
header('Content-Type: application/json; charset=utf-8');
```

### Problema 3: Imágenes no se cargan

**Error:** 404 Not Found en imágenes

**Solución:** Verificar rutas relativas y nombres de archivos exactos

---

## 📚 Recursos Utilizados

- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.3/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [PHP Manual](https://www.php.net/manual/es/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)

---

## 🔮 Mejoras Futuras

- [ ] Implementar sistema de autenticación de usuarios
- [ ] Agregar panel de administración para ver mensajes
- [ ] Implementar paginación en la galería
- [ ] Añadir modo claro/oscuro conmutable
- [ ] Integrar envío de emails reales (PHPMailer)
- [ ] Implementar lazy loading en imágenes
- [ ] Agregar animaciones más complejas con GSAP
- [ ] Crear versión PWA (Progressive Web App)
- [ ] Implementar sistema de comentarios
- [ ] Añadir blog con CMS

---

## 👨‍💻 Autor

**Tu Nombre**  
Estudiante de Desarrollo Web Full Stack  
Institución Educativa  

### Contacto

- 📧 Email: tu@email.com
- 💼 LinkedIn: [linkedin.com/in/tu-perfil](https://linkedin.com)
- 🐙 GitHub: [github.com/tu-usuario](https://github.com)

---

## 📄 Licencia

Este proyecto fue desarrollado con fines educativos como parte del curso de *Proyecto, Diseño e Implementación de Sitios Web Dinámicos*.

---

## 🙏 Agradecimientos

- Prof. Jorge Fabián Siles Guzmán por la guía y enseñanza
- Compañeros de clase por el apoyo y colaboración
- Comunidad de desarrollo web por los recursos compartidos

---

## 📸 Capturas de Pantalla

*(Agregar capturas de pantalla del sitio aquí)*

### Página Principal
![Homepage](#)

### Galería de Proyectos
![Galería](#)

### Calculadora IMC
![Calculadora](#)

### Formulario de Contacto
![Formulario](#)

---

**Fecha de última actualización:** Marzo 2026  
**Versión:** 1.0.0

---

*"El código limpio no se escribe siguiendo un conjunto de reglas. No te conviertes en un artesano del software al aprender una lista de heurísticas. El profesionalismo y la artesanía provienen de valores que impulsan las disciplinas."* - Robert C. Martin
