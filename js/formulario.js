/**
 * Formulario de Contacto Interactivo
 * Portfolio Web Full Stack
 * 
 * Maneja validación en tiempo real y envío mediante AJAX (fetch)
 * Sin recargar la página
 */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // Obtener elementos del DOM
    const contactoForm = document.getElementById('contactoForm');
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const asuntoInput = document.getElementById('asunto');
    const mensajeTextarea = document.getElementById('mensaje');
    const btnEnviar = document.getElementById('btnEnviar');
    const mensajeRespuesta = document.getElementById('mensajeRespuesta');
    
    /**
     * Validar campo de nombre
     * @param {string} nombre - Nombre a validar
     * @return {object} Objeto con isValid y mensaje de error
     */
    function validarNombre(nombre) {
        if (nombre.trim() === '') {
            return { isValid: false, mensaje: 'El nombre es obligatorio' };
        }
        if (nombre.trim().length < 3) {
            return { isValid: false, mensaje: 'El nombre debe tener al menos 3 caracteres' };
        }
        if (nombre.trim().length > 100) {
            return { isValid: false, mensaje: 'El nombre no puede exceder 100 caracteres' };
        }
        return { isValid: true, mensaje: '' };
    }
    
    /**
     * Validar campo de email
     * @param {string} email - Email a validar
     * @return {object} Objeto con isValid y mensaje de error
     */
    function validarEmail(email) {
        if (email.trim() === '') {
            return { isValid: false, mensaje: 'El email es obligatorio' };
        }
        
        // Expresión regular para validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            return { isValid: false, mensaje: 'El formato del email no es válido' };
        }
        
        if (email.length > 150) {
            return { isValid: false, mensaje: 'El email no puede exceder 150 caracteres' };
        }
        
        return { isValid: true, mensaje: '' };
    }
    
    /**
     * Validar campo de asunto
     * @param {string} asunto - Asunto a validar
     * @return {object} Objeto con isValid y mensaje de error
     */
    function validarAsunto(asunto) {
        if (asunto.trim() === '') {
            return { isValid: false, mensaje: 'El asunto es obligatorio' };
        }
        if (asunto.trim().length < 5) {
            return { isValid: false, mensaje: 'El asunto debe tener al menos 5 caracteres' };
        }
        if (asunto.trim().length > 200) {
            return { isValid: false, mensaje: 'El asunto no puede exceder 200 caracteres' };
        }
        return { isValid: true, mensaje: '' };
    }
    
    /**
     * Validar campo de mensaje
     * @param {string} mensaje - Mensaje a validar
     * @return {object} Objeto con isValid y mensaje de error
     */
    function validarMensaje(mensaje) {
        if (mensaje.trim() === '') {
            return { isValid: false, mensaje: 'El mensaje es obligatorio' };
        }
        if (mensaje.trim().length < 10) {
            return { isValid: false, mensaje: 'El mensaje debe tener al menos 10 caracteres' };
        }
        if (mensaje.trim().length > 5000) {
            return { isValid: false, mensaje: 'El mensaje no puede exceder 5000 caracteres' };
        }
        return { isValid: true, mensaje: '' };
    }
    
    /**
     * Mostrar error en un campo
     * @param {HTMLInputElement} input - Campo de entrada
     * @param {string} mensaje - Mensaje de error
     */
    function mostrarError(input, mensaje) {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        
        const feedbackDiv = input.parentElement.querySelector('.invalid-feedback');
        if (feedbackDiv) {
            feedbackDiv.textContent = mensaje;
        }
    }
    
    /**
     * Mostrar campo válido
     * @param {HTMLInputElement} input - Campo de entrada
     */
    function mostrarValido(input) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    }
    
    /**
     * Limpiar estado de validación
     * @param {HTMLInputElement} input - Campo de entrada
     */
    function limpiarEstado(input) {
        input.classList.remove('is-invalid', 'is-valid');
    }
    
    /**
     * Validación en tiempo real para nombre
     */
    nombreInput.addEventListener('blur', function() {
        const validacion = validarNombre(this.value);
        if (!validacion.isValid) {
            mostrarError(this, validacion.mensaje);
        } else {
            mostrarValido(this);
        }
    });
    
    nombreInput.addEventListener('input', function() {
        if (this.classList.contains('is-invalid')) {
            const validacion = validarNombre(this.value);
            if (validacion.isValid) {
                mostrarValido(this);
            }
        }
    });
    
    /**
     * Validación en tiempo real para email
     */
    emailInput.addEventListener('blur', function() {
        const validacion = validarEmail(this.value);
        if (!validacion.isValid) {
            mostrarError(this, validacion.mensaje);
        } else {
            mostrarValido(this);
        }
    });
    
    emailInput.addEventListener('input', function() {
        if (this.classList.contains('is-invalid')) {
            const validacion = validarEmail(this.value);
            if (validacion.isValid) {
                mostrarValido(this);
            }
        }
    });
    
    /**
     * Validación en tiempo real para asunto
     */
    asuntoInput.addEventListener('blur', function() {
        const validacion = validarAsunto(this.value);
        if (!validacion.isValid) {
            mostrarError(this, validacion.mensaje);
        } else {
            mostrarValido(this);
        }
    });
    
    asuntoInput.addEventListener('input', function() {
        if (this.classList.contains('is-invalid')) {
            const validacion = validarAsunto(this.value);
            if (validacion.isValid) {
                mostrarValido(this);
            }
        }
    });
    
    /**
     * Validación en tiempo real para mensaje
     */
    mensajeTextarea.addEventListener('blur', function() {
        const validacion = validarMensaje(this.value);
        if (!validacion.isValid) {
            mostrarError(this, validacion.mensaje);
        } else {
            mostrarValido(this);
        }
    });
    
    mensajeTextarea.addEventListener('input', function() {
        if (this.classList.contains('is-invalid')) {
            const validacion = validarMensaje(this.value);
            if (validacion.isValid) {
                mostrarValido(this);
            }
        }
    });
    
    /**
     * Mostrar mensaje de respuesta
     * @param {string} tipo - 'exito' o 'error'
     * @param {string} mensaje - Mensaje a mostrar
     */
    function mostrarMensajeRespuesta(tipo, mensaje) {
        mensajeRespuesta.classList.remove('d-none', 'alert-success', 'alert-danger');
        
        if (tipo === 'exito') {
            mensajeRespuesta.classList.add('alert', 'alert-success');
            mensajeRespuesta.innerHTML = `
                <i class="bi bi-check-circle-fill me-2"></i>
                <strong>¡Éxito!</strong> ${mensaje}
            `;
        } else {
            mensajeRespuesta.classList.add('alert', 'alert-danger');
            mensajeRespuesta.innerHTML = `
                <i class="bi bi-exclamation-triangle-fill me-2"></i>
                <strong>Error:</strong> ${mensaje}
            `;
        }
        
        // Scroll al mensaje
        mensajeRespuesta.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Ocultar después de 5 segundos
        setTimeout(() => {
            mensajeRespuesta.classList.add('d-none');
        }, 5000);
    }
    
    /**
     * Enviar formulario mediante AJAX
     */
    contactoForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validar todos los campos
        const validaciones = {
            nombre: validarNombre(nombreInput.value),
            email: validarEmail(emailInput.value),
            asunto: validarAsunto(asuntoInput.value),
            mensaje: validarMensaje(mensajeTextarea.value)
        };
        
        // Verificar si hay errores
        let hayErrores = false;
        
        Object.keys(validaciones).forEach(campo => {
            const input = document.getElementById(campo);
            if (!validaciones[campo].isValid) {
                mostrarError(input, validaciones[campo].mensaje);
                hayErrores = true;
            } else {
                mostrarValido(input);
            }
        });
        
        if (hayErrores) {
            mostrarMensajeRespuesta('error', 'Por favor, corrige los errores en el formulario.');
            return;
        }
        
        // Deshabilitar botón y mostrar loading
        btnEnviar.disabled = true;
        btnEnviar.classList.add('btn-loading');
        const textoOriginal = btnEnviar.innerHTML;
        btnEnviar.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Enviando...';
        
        // Preparar datos para enviar
        const datos = {
            nombre: nombreInput.value.trim(),
            email: emailInput.value.trim(),
            asunto: asuntoInput.value.trim(),
            mensaje: mensajeTextarea.value.trim()
        };
        
        try {
            // Enviar datos mediante fetch
            const respuesta = await fetch('php/procesar_contacto.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            });
            
            // Verificar si la respuesta es OK
            if (!respuesta.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            
            // Parsear respuesta JSON
            const resultado = await respuesta.json();
            
            console.log('Respuesta del servidor:', resultado);
            
            // Mostrar mensaje según el resultado
            if (resultado.estado === 'exito') {
                mostrarMensajeRespuesta('exito', resultado.mensaje);
                
                // Limpiar formulario
                contactoForm.reset();
                
                // Limpiar estados de validación
                [nombreInput, emailInput, asuntoInput, mensajeTextarea].forEach(input => {
                    limpiarEstado(input);
                });
            } else {
                // Error de validación del servidor
                let mensajeError = resultado.mensaje;
                
                if (resultado.errores && Array.isArray(resultado.errores)) {
                    mensajeError += '<br><ul class="mb-0 mt-2">';
                    resultado.errores.forEach(error => {
                        mensajeError += `<li>${error}</li>`;
                    });
                    mensajeError += '</ul>';
                }
                
                mostrarMensajeRespuesta('error', mensajeError);
            }
            
        } catch (error) {
            console.error('Error al enviar formulario:', error);
            mostrarMensajeRespuesta('error', 'Hubo un problema al enviar el mensaje. Por favor, intenta nuevamente.');
        } finally {
            // Rehabilitar botón
            btnEnviar.disabled = false;
            btnEnviar.classList.remove('btn-loading');
            btnEnviar.innerHTML = textoOriginal;
        }
    });
    
    console.log('✓ Formulario de contacto inicializado correctamente');
});
