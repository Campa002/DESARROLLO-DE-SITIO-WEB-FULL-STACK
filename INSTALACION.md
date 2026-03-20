# 🚀 GUÍA RÁPIDA DE INSTALACIÓN

## Pasos para poner en marcha tu proyecto

### 1️⃣ Configurar Base de Datos

**Opción A - Desde línea de comandos:**
```bash
mysql -u root -p
```
Luego ejecutar:
```sql
source sql/database.sql
```

**Opción B - Desde phpMyAdmin:**
1. Abre phpMyAdmin (http://localhost/phpmyadmin)
2. Crea una nueva base de datos llamada `portfolio_db`
3. Importa el archivo `sql/database.sql`

### 2️⃣ Configurar Credenciales

Edita el archivo `php/config.php` y actualiza estas líneas:

```php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');          // ← Cambia esto si usas otro usuario
define('DB_PASS', '');              // ← Cambia esto si tienes contraseña
define('DB_NAME', 'portfolio_db');
```

### 3️⃣ Agregar tus Imágenes

Coloca 6 imágenes en la carpeta `img/proyectos/` con estos nombres:
- proyecto1.jpg
- proyecto2.jpg
- proyecto3.jpg
- proyecto4.jpg
- proyecto5.jpg
- proyecto6.jpg

**Si no tienes imágenes aún, descarga placeholders:**
```bash
cd img/proyectos/

# Con curl (Linux/Mac):
curl -o proyecto1.jpg https://picsum.photos/800/600?random=1
curl -o proyecto2.jpg https://picsum.photos/800/600?random=2
curl -o proyecto3.jpg https://picsum.photos/800/600?random=3
curl -o proyecto4.jpg https://picsum.photos/800/600?random=4
curl -o proyecto5.jpg https://picsum.photos/800/600?random=5
curl -o proyecto6.jpg https://picsum.photos/800/600?random=6
```

### 4️⃣ Iniciar el Servidor

**Opción A - Con XAMPP:**
1. Inicia Apache y MySQL desde el panel de control de XAMPP
2. Copia la carpeta del proyecto a `C:\xampp\htdocs\`
3. Abre: http://localhost/mi-portfolio-web/

**Opción B - Con servidor PHP integrado:**
```bash
php -S localhost:8000
```
Abre: http://localhost:8000

**Opción C - Con WAMP:**
1. Inicia WAMP
2. Copia la carpeta del proyecto a `C:\wamp64\www\`
3. Abre: http://localhost/mi-portfolio-web/

### 5️⃣ Verificar que Todo Funciona

✅ **Checklist:**
- [ ] La página carga sin errores
- [ ] La navegación funciona (los enlaces del menú funcionan)
- [ ] Las imágenes se ven en la galería
- [ ] Al hacer clic en una imagen se abre el modal
- [ ] Los videos se reproducen
- [ ] La calculadora IMC calcula correctamente
- [ ] El formulario de contacto envía datos (revisa phpMyAdmin)

### 6️⃣ Personalizar tu Sitio

**Cambiar textos:**
- Edita `index.html` y busca textos como "Tu Nombre", "contacto@portfolio.com", etc.

**Cambiar colores:**
- Edita `css/styles.css` y modifica las variables CSS en `:root`

**Cambiar videos:**
- En `index.html`, busca las etiquetas `<iframe>` y cambia los URLs de YouTube

### 🐛 Solución de Problemas Comunes

**Error: "Access denied for user 'root'@'localhost'"**
- Verifica las credenciales en `php/config.php`
- Asegúrate de que MySQL esté corriendo

**Error: "No se puede conectar a MySQL"**
- Verifica que MySQL/MariaDB esté iniciado
- En XAMPP: inicia el módulo MySQL

**Las imágenes no cargan:**
- Verifica que las imágenes estén en `img/proyectos/`
- Verifica que los nombres sean exactos (proyecto1.jpg, etc.)

**El formulario no envía:**
- Verifica la configuración de base de datos
- Abre la consola del navegador (F12) para ver errores
- Revisa los logs de PHP

### 📧 Probar el Formulario de Contacto

1. Llena el formulario en http://localhost:8000/#contacto
2. Verifica en phpMyAdmin que el mensaje se guardó en la tabla `mensajes`

```sql
SELECT * FROM mensajes ORDER BY fecha_envio DESC;
```

### 🎉 ¡Listo!

Tu sitio debería estar funcionando. Ahora puedes:
- Personalizar el diseño
- Agregar más funcionalidades
- Preparar tu repositorio de GitHub
- Documentar tu proceso

---

**¿Necesitas ayuda?** Revisa el README.md completo para más información.
