/**
 * Galería Dinámica
 * Portfolio Web Full Stack
 * 
 * Maneja la funcionalidad de la galería de imágenes
 * con modal/lightbox para visualización ampliada
 */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // Obtener el modal y sus elementos
    const galeriaModal = document.getElementById('galeriaModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('galeriaModalLabel');
    const modalDescription = document.getElementById('modalDescription');
    
    // Obtener todos los items de la galería
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    /**
     * Configurar event listeners para cada item de la galería
     */
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Obtener datos del item clickeado
            const imgSrc = this.getAttribute('data-img');
            const title = this.getAttribute('data-title');
            const description = this.getAttribute('data-desc');
            
            // Actualizar contenido del modal
            modalImage.src = imgSrc;
            modalImage.alt = title;
            modalTitle.textContent = title;
            modalDescription.textContent = description;
            
            // Log para debugging
            console.log('Imagen abierta:', title);
        });
    });
    
    /**
     * Añadir efecto de carga a las imágenes
     */
    galleryItems.forEach(item => {
        const img = item.querySelector('img');
        
        // Añadir clase cuando la imagen se carga
        img.addEventListener('load', function() {
            item.classList.add('loaded');
        });
        
        // Si la imagen ya está cargada (caché)
        if (img.complete) {
            item.classList.add('loaded');
        }
    });
    
    /**
     * Navegación con teclado (opcional - mejora UX)
     * Cerrar modal con tecla ESC
     */
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && galeriaModal.classList.contains('show')) {
            const bsModal = bootstrap.Modal.getInstance(galeriaModal);
            if (bsModal) {
                bsModal.hide();
            }
        }
    });
    
    /**
     * Animación de entrada para items de galería
     * Efecto de aparición gradual al hacer scroll
     */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, entry.target.dataset.delay || 0);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Aplicar observer a cada item con delay escalonado
    galleryItems.forEach((item, index) => {
        item.dataset.delay = index * 100; // 100ms de delay entre cada item
        observer.observe(item);
    });
    
    /**
     * Precargar imagen del modal al hacer hover
     * Mejora la experiencia al abrir el modal
     */
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const imgSrc = this.getAttribute('data-img');
            const preloadImg = new Image();
            preloadImg.src = imgSrc;
        });
    });
    
    console.log('✓ Galería inicializada correctamente');
});

/**
 * Función auxiliar para manejar errores de carga de imágenes
 */
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        console.error('Error al cargar imagen:', e.target.src);
        // Opcional: Mostrar imagen placeholder
        // e.target.src = 'img/placeholder.jpg';
    }
}, true);
