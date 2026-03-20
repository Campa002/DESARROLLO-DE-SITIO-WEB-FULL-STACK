/**
 * Calculadora de IMC (Índice de Masa Corporal)
 * Portfolio Web Full Stack
 * 
 * Calcula el IMC y determina la categoría nutricional
 * SIN usar eval() por razones de seguridad
 */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // Obtener elementos del DOM
    const calculadoraForm = document.getElementById('calculadoraForm');
    const pesoInput = document.getElementById('peso');
    const alturaInput = document.getElementById('altura');
    const limpiarBtn = document.getElementById('limpiarCalc');
    const resultadoDiv = document.getElementById('resultadoIMC');
    const valorIMCSpan = document.getElementById('valorIMC');
    const categoriaDiv = document.getElementById('categoriaIMC');
    
    /**
     * Calcular IMC
     * Fórmula: peso (kg) / (altura (m))²
     * @param {number} peso - Peso en kilogramos
     * @param {number} altura - Altura en centímetros
     * @return {number} IMC calculado
     */
    function calcularIMC(peso, altura) {
        // Convertir altura de cm a metros
        const alturaMetros = altura / 100;
        
        // Calcular IMC
        const imc = peso / (alturaMetros * alturaMetros);
        
        return imc;
    }
    
    /**
     * Determinar categoría según IMC
     * @param {number} imc - Valor del IMC
     * @return {object} Objeto con categoría, clase CSS y mensaje
     */
    function obtenerCategoria(imc) {
        if (imc < 18.5) {
            return {
                categoria: 'Bajo peso',
                clase: 'alert-info',
                mensaje: 'Tu peso está por debajo del rango saludable. Consulta con un profesional de la salud.',
                icono: 'bi-arrow-down-circle'
            };
        } else if (imc >= 18.5 && imc < 25) {
            return {
                categoria: 'Peso normal',
                clase: 'alert-success',
                mensaje: '¡Excelente! Tu peso está en el rango saludable.',
                icono: 'bi-check-circle'
            };
        } else if (imc >= 25 && imc < 30) {
            return {
                categoria: 'Sobrepeso',
                clase: 'alert-warning',
                mensaje: 'Tu peso está por encima del rango saludable. Considera mantener una dieta equilibrada y hacer ejercicio.',
                icono: 'bi-exclamation-circle'
            };
        } else {
            return {
                categoria: 'Obesidad',
                clase: 'alert-danger',
                mensaje: 'Tu peso está significativamente por encima del rango saludable. Es recomendable consultar con un profesional de la salud.',
                icono: 'bi-x-circle'
            };
        }
    }
    
    /**
     * Mostrar resultado del IMC
     * @param {number} imc - Valor del IMC calculado
     */
    function mostrarResultado(imc) {
        // Obtener información de la categoría
        const info = obtenerCategoria(imc);
        
        // Actualizar valor del IMC (con 2 decimales)
        valorIMCSpan.textContent = imc.toFixed(1);
        
        // Actualizar categoría con estilos
        categoriaDiv.className = `alert ${info.clase} mb-0`;
        categoriaDiv.innerHTML = `
            <i class="bi ${info.icono} me-2"></i>
            <strong>${info.categoria}</strong>
            <p class="mb-0 mt-2 small">${info.mensaje}</p>
        `;
        
        // Mostrar el div de resultado con animación
        resultadoDiv.classList.remove('d-none');
        resultadoDiv.style.animation = 'none';
        setTimeout(() => {
            resultadoDiv.style.animation = 'fadeIn 0.5s ease';
        }, 10);
        
        // Log para debugging
        console.log('IMC calculado:', imc.toFixed(2), '- Categoría:', info.categoria);
    }
    
    /**
     * Validar entrada numérica en tiempo real
     * @param {HTMLInputElement} input - Campo de entrada
     */
    function validarInput(input) {
        const valor = parseFloat(input.value);
        const min = parseFloat(input.min);
        const max = parseFloat(input.max);
        
        // Remover clases previas
        input.classList.remove('is-invalid', 'is-valid');
        
        if (input.value === '') {
            return false;
        }
        
        if (isNaN(valor) || valor < min || valor > max) {
            input.classList.add('is-invalid');
            return false;
        } else {
            input.classList.add('is-valid');
            return true;
        }
    }
    
    /**
     * Event listener para el formulario
     */
    calculadoraForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener valores
        const peso = parseFloat(pesoInput.value);
        const altura = parseFloat(alturaInput.value);
        
        // Validar inputs
        const pesoValido = validarInput(pesoInput);
        const alturaValida = validarInput(alturaInput);
        
        if (!pesoValido || !alturaValida) {
            console.warn('Datos inválidos');
            return;
        }
        
        // Calcular IMC
        const imc = calcularIMC(peso, altura);
        
        // Mostrar resultado
        mostrarResultado(imc);
        
        // Scroll suave al resultado
        resultadoDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
    
    /**
     * Validación en tiempo real mientras se escribe
     */
    pesoInput.addEventListener('input', function() {
        validarInput(this);
    });
    
    alturaInput.addEventListener('input', function() {
        validarInput(this);
    });
    
    /**
     * Botón limpiar
     */
    limpiarBtn.addEventListener('click', function() {
        // Limpiar formulario
        calculadoraForm.reset();
        
        // Remover clases de validación
        pesoInput.classList.remove('is-invalid', 'is-valid');
        alturaInput.classList.remove('is-invalid', 'is-valid');
        
        // Ocultar resultado
        resultadoDiv.classList.add('d-none');
        
        // Focus en el primer campo
        pesoInput.focus();
        
        console.log('Formulario limpiado');
    });
    
    /**
     * Prevenir entrada de caracteres no numéricos (excepto punto decimal)
     */
    [pesoInput, alturaInput].forEach(input => {
        input.addEventListener('keypress', function(e) {
            // Permitir: números, punto decimal, backspace, delete, flechas
            const permitidos = ['0','1','2','3','4','5','6','7','8','9','.','Backspace','Delete','ArrowLeft','ArrowRight','Tab'];
            
            if (!permitidos.includes(e.key)) {
                e.preventDefault();
            }
            
            // Prevenir múltiples puntos decimales
            if (e.key === '.' && input.value.includes('.')) {
                e.preventDefault();
            }
        });
    });
    
    /**
     * Auto-focus en el primer campo al cargar
     */
    pesoInput.focus();
    
    console.log('✓ Calculadora IMC inicializada correctamente');
});

/**
 * Función auxiliar para formatear números
 * @param {number} num - Número a formatear
 * @param {number} decimales - Cantidad de decimales
 * @return {string} Número formateado
 */
function formatearNumero(num, decimales = 1) {
    return num.toFixed(decimales);
}
